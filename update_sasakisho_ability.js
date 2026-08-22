const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING SHO SASAKI (p351) ABILITY ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetStr = "{ name: '流れを切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・パスカットUP' }";
const replaceStr = "{ name: '走り切るロングパサー', rank: '銀', description: '発動条件：途中出場t/　ロングパス・スタミナUP' }".replace('\t', '');

// Clean exact replacement
const oldAbi = "name: '流れを切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・パスカットUP'";
const newAbi = "name: '走り切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・スタミナUP'";

if (mockCode.includes(oldAbi)) {
  mockCode = mockCode.replace(oldAbi, newAbi);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js updated.');
} else {
  console.log('oldAbi not found in mockData.js');
}

const addScriptPath = path.join(__dirname, 'add_sasakisho2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  if (scriptCode.includes(oldAbi)) {
    scriptCode = scriptCode.replace(oldAbi, newAbi);
    fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
    console.log('2. add_sasakisho2026.js updated.');
  }
}

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p351 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p351');
console.log('3. Verification for 佐々木翔 abilities:');
console.log(JSON.stringify(p351 ? p351.abilities : null, null, 2));

console.log('=== SHO SASAKI ABILITY UPDATED SUCCESSFULLY! ===');
