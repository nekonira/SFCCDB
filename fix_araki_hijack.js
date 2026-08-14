const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING ARAKI NAME HIJACK IN APP.JS & APP.JSX ===');

// 1. Fix src/app.js
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

appJsCode = appJsCode.replace(
  "if (player.id === 'p149' || player.name && player.name.includes('2026') && player.name.includes('荒木')) {",
  "if (player.id === 'p149' || (player.name && player.name.includes('2026') && player.name.includes('荒木隼人'))) {"
);

fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('1. Fixed src/app.js');

// 2. Fix src/app.jsx
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

appJsxCode = appJsxCode.replace(
  "if (player.id === 'p149' || (player.name && player.name.includes('2026') && player.name.includes('荒木'))) {",
  "if (player.id === 'p149' || (player.name && player.name.includes('2026') && player.name.includes('荒木隼人'))) {"
);

fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('2. Fixed src/app.jsx');

// 3. Verification in Node VM
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p199 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p199');
const p149 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p149');

let getAvatarCode = appJsCode.substring(
  appJsCode.indexOf('function getPlayerAvatarUrl('),
  appJsCode.indexOf('function generateDefaultAvatar(')
);

getAvatarCode = getAvatarCode.replace('function getPlayerAvatarUrl(', 'window.getPlayerAvatarUrl = function(');

sandbox.window.ARAKI_2026_IMAGE = 'ARAKI_HAYATO_IMAGE_URL';
sandbox.window.ARAKI_RYOTARO_2026_IMAGE = 'ARAKI_RYOTARO_IMAGE_URL';

vm.runInContext(getAvatarCode, sandbox);

const p199Avatar = sandbox.window.getPlayerAvatarUrl(p199);
const p149Avatar = sandbox.window.getPlayerAvatarUrl(p149);

console.log('p199 (荒木遼太郎) Avatar URL resolved to:', p199Avatar);
console.log('p149 (荒木隼人) Avatar URL resolved to:', p149Avatar);

if (p199Avatar === 'ARAKI_RYOTARO_IMAGE_URL' && p149Avatar === 'ARAKI_HAYATO_IMAGE_URL') {
  console.log('=== SUCCESS: Both Araki players resolve correctly! ===');
} else {
  console.error('=== FAILURE: Avatar resolution mismatch! ===');
  process.exit(1);
}
