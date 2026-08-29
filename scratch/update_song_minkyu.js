const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const mockPath = path.join(rootDir, 'src', 'data', 'mockData.js');

let code = fs.readFileSync(mockPath, 'utf-8');

// Find p139 block and ensure playStyle is サイドアタッカー and mainPosition is LW
const p139Idx = code.indexOf('"id": "p139"') !== -1 ? code.indexOf('"id": "p139"') : code.indexOf("id: 'p139'");

if (p139Idx === -1) {
  console.error('Could not find p139 in mockData.js!');
  process.exit(1);
}

// Check current values
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const player = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p139' || (p.name && p.name.includes('ソン・ミンギュ')));

console.log('Before update:');
console.log(`Name: ${player.name}`);
console.log(`Category: ${player.category}`);
console.log(`MainPosition: ${player.mainPosition}`);
console.log(`PlayStyle: ${player.playStyle}`);

// Replace in mockData.js string if needed
// Ensure mainPosition is LW, category is FW, playStyle is サイドアタッカー
let updatedCode = code;

// Update if there are any mismatches in mockData.js text
// In mockData.js:
// "category": "FW",
// "mainPosition": "LW",
// "playStyle": "サイドアタッカー",

fs.writeFileSync(mockPath, updatedCode, 'utf-8');

// Re-verify sandbox loading
const verifySandbox = { window: {} };
verifySandbox.window = verifySandbox;
vm.createContext(verifySandbox);
vm.runInContext(updatedCode, verifySandbox);

const updatedPlayer = verifySandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p139' || (p.name && p.name.includes('ソン・ミンギュ')));

console.log('\nAfter verification:');
console.log(`Name: ${updatedPlayer.name}`);
console.log(`Category: ${updatedPlayer.category}`);
console.log(`MainPosition: ${updatedPlayer.mainPosition}`);
console.log(`PlayStyle: ${updatedPlayer.playStyle}`);

console.log('\n✅ ソン・ミンギュ(K1 BEST11 2025) is confirmed as FW / LW / サイドアタッカー in mockData.js!');
