const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING SHU KURATA 2026 IMAGE & FIXING NAME HIJACK ===');

// 1. Image Conversion
const newImagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786030786000.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kurataShu2026Image.js');

const bytes = fs.readFileSync(newImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KURATA_SHU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kurataShu2026Image.js updated. Size:', fs.statSync(imageJsPath).size);

// 2. Refine p29 check in src/app.js and src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

appJsCode = appJsCode.replace(
  "if (player.name && (player.name.includes('倉田') || player.name.includes('Kurata')) || player.id === 'p29') {",
  "if (player.id === 'p29' || (player.name && player.name.includes('歴戦') && (player.name.includes('倉田') || player.name.includes('Kurata')))) {"
);

fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('2. Fixed p29 check in src/app.js');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

appJsxCode = appJsxCode.replace(
  "if ((player.name && (player.name.includes('倉田') || player.name.includes('Kurata'))) || player.id === 'p29') {",
  "if (player.id === 'p29' || (player.name && player.name.includes('歴戦') && (player.name.includes('倉田') || player.name.includes('Kurata')))) {"
);

fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('3. Fixed p29 check in src/app.jsx');

// 4. Ensure script tag in index.html
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

if (!indexHtml.includes('kurataShu2026Image.js')) {
  console.log('Adding kurataShu2026Image.js to index.html...');
  indexHtml = indexHtml.replace('<!-- 1. Player Photos (174 Image Files) -->', '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/kurataShu2026Image.js"></script>');
  fs.writeFileSync(indexPath, indexHtml, 'utf-8');
  console.log('4. index.html updated.');
} else {
  console.log('4. index.html already contains kurataShu2026Image.js.');
}

// 5. Node VM Verification
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {}, React: { useState: () => [], useMemo: () => {}, useEffect: () => {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p207 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p207');
const p29 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p29');

const fnStart = appJsCode.indexOf('const getPlayerAvatarUrl =');
const fnEnd = appJsCode.indexOf('const App =', fnStart);

let getAvatarCode = appJsCode.substring(fnStart, fnEnd > -1 ? fnEnd : appJsCode.length);
getAvatarCode = getAvatarCode.replace('const getPlayerAvatarUrl =', 'window.getPlayerAvatarUrl =');

sandbox.window.KURATA_IMAGE = 'KURATA_OLD_IMAGE_URL';
sandbox.window.KURATA_SHU_2026_IMAGE = 'KURATA_SHU_2026_IMAGE_URL';

vm.runInContext(getAvatarCode, sandbox);

const p207Avatar = sandbox.window.getPlayerAvatarUrl(p207);
const p29Avatar = sandbox.window.getPlayerAvatarUrl(p29);

console.log('p207 (倉田秋 2026) Avatar URL resolved to:', p207Avatar);
console.log('p29 (倉田秋 歴戦) Avatar URL resolved to:', p29Avatar);

if (p207Avatar === 'KURATA_SHU_2026_IMAGE_URL' && p29Avatar === 'KURATA_OLD_IMAGE_URL') {
  console.log('=== SUCCESS: Both Kurata players resolve correctly! ===');
} else {
  console.error('=== FAILURE: Avatar resolution mismatch! ===');
  process.exit(1);
}
