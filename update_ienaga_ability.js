const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING AKIHIRO IENAGA (p359) ABILITY ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetOld = "{ name: '高精度ロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・キック精度UP' }";
const targetNew = "{ name: '高性能ロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・キック精度UP' }";

if (mockCode.includes(targetOld)) {
  mockCode = mockCode.split(targetOld).join(targetNew);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js updated successfully.');
} else {
  console.log('targetOld not found directly in mockData.js');
}

const addScriptPath = path.join(__dirname, 'add_ienagaakihiro2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  if (scriptCode.includes(targetOld)) {
    scriptCode = scriptCode.split(targetOld).join(targetNew);
    fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
    console.log('2. add_ienagaakihiro2026.js updated.');
  }
}

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const verifyCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(verifyCode, sandbox);

const p359 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p359');
console.log('3. Verification for 家長昭博 abilities:');
console.log(JSON.stringify(p359 ? p359.abilities : null, null, 2));

console.log('=== IENAGA ABILITY UPDATED SUCCESSFULLY! ===');
