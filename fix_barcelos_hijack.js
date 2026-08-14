const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING BARCELOS / ROS AVATAR HIJACK ===');

// Fix in src/app.js
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf-8');

appJs = appJs.replace(
  "if (player.id === 'p162' || player.name && (player.name.includes('ロス') || player.name.includes('Ros')))",
  "if (player.id === 'p162' || (player.name && ((player.name.includes('ロス') && !player.name.includes('バルセロス')) || player.name.includes('Ros'))))"
);

fs.writeFileSync(appJsPath, appJs, 'utf-8');
console.log('1. src/app.js updated for p162 (Ros).');

// Fix in src/app.jsx
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');

appJsx = appJsx.replace(
  "if (player.id === 'p162' || (player.name && (player.name.includes('ロス') || player.name.includes('Ros'))))",
  "if (player.id === 'p162' || (player.name && ((player.name.includes('ロス') && !player.name.includes('バルセロス')) || player.name.includes('Ros'))))"
);

fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
console.log('2. src/app.jsx updated for p162 (Ros).');

// Verification with Node VM
const sandbox = {
  window: {},
  console: console,
  React: { useState: () => [false, () => {}], useEffect: () => {} }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const mock = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
const img = fs.readFileSync(path.join(__dirname, 'src', 'data', 'lucasBarcelos2026Image.js'), 'utf-8');
const updatedAppJs = fs.readFileSync(appJsPath, 'utf-8');

vm.runInContext(mock, sandbox);
vm.runInContext(img, sandbox);
vm.runInContext(updatedAppJs, sandbox);

const p233 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p233');
const avatarUrl = sandbox.window.getPlayerAvatarUrl(p233);

console.log('3. Verification for p233 (Lucas Barcelos):');
console.log('   Name:', p233 ? p233.name : 'MISSING');
console.log('   Avatar URL Length:', avatarUrl ? avatarUrl.length : 0);
console.log('   Avatar URL Starts With:', avatarUrl ? avatarUrl.substring(0, 40) + '...' : 'EMPTY');

const p162 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p162');
console.log('4. Verification for p162 (Ros):');
console.log('   Name:', p162 ? p162.name : 'MISSING');
console.log('   Avatar URL:', sandbox.window.getPlayerAvatarUrl(p162));
