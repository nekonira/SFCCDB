const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING BRUNO GUIMARAES HIJACK ===');

// 1. Update src/app.js
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');

appJs = appJs.replace(
  "player.name.includes('ブルーノ')) || player.id === 'p107'",
  "player.name.includes('ブルーノ・ギマランイス')) || player.id === 'p107'"
);

fs.writeFileSync(appJsPath, appJs, 'utf-8');
console.log('1. src/app.js updated for p107.');

// 2. Update src/app.jsx
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');

appJsx = appJsx.replace(
  "player.name.includes('ブルーノ')) || player.id === 'p107'",
  "player.name.includes('ブルーノ・ギマランイス')) || player.id === 'p107'"
);

fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
console.log('2. src/app.jsx updated for p107.');

// 3. Verification with Node VM
const sandbox = {
  window: {},
  console: console,
  React: { useState: () => [false, () => {}], useEffect: () => {} }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const mock = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
const img = fs.readFileSync(path.join(__dirname, 'src', 'data', 'brenoHerculano2026Image.js'), 'utf-8');
const updatedAppJs = fs.readFileSync(appJsPath, 'utf-8');

vm.runInContext(mock, sandbox);
vm.runInContext(img, sandbox);
vm.runInContext(updatedAppJs, sandbox);

const p235 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p235');
const avatarUrl = sandbox.window.getPlayerAvatarUrl(p235);

console.log('3. Verification for p235 (Breno Herculano):');
console.log('   Name:', p235 ? p235.name : 'MISSING');
console.log('   Avatar URL Length:', avatarUrl ? avatarUrl.length : 0);
console.log('   Avatar URL Starts With:', avatarUrl ? avatarUrl.substring(0, 40) + '...' : 'EMPTY');
