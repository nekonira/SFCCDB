const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING 銀「快速のロングパサー」 DESCRIPTION ===');

const newDesc = "発動条件：好調　/　ロングパス・走力UP";

// Update mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetOld = "{ name: '快速のロングパサー', rank: '銀', description: '発動条件：絶好調　/　ロングパス・走力UP' }";
const targetNew = "{ name: '快速のロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・走力UP' }";

if (mockCode.includes(targetOld)) {
  mockCode = mockCode.split(targetOld).join(targetNew);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js updated successfully.');
} else {
  console.log('targetOld not found directly in mockData.js');
}

const addScriptPath = path.join(__dirname, 'add_tanakakazuki2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  if (scriptCode.includes(targetOld)) {
    scriptCode = scriptCode.split(targetOld).join(targetNew);
    fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
    console.log('2. add_tanakakazuki2026.js updated.');
  }
}

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const verifyCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(verifyCode, sandbox);

const fastLongPassers = [];
sandbox.window.INITIAL_PLAYERS.forEach(p => {
  (p.abilities || []).forEach(a => {
    if (a.name === '快速のロングパサー') {
      fastLongPassers.push({ player: p.name, ability: a });
    }
  });
});

console.log('3. All 「快速のロングパサー」 in mockData.js:');
console.log(JSON.stringify(fastLongPassers, null, 2));

console.log('=== UPDATE COMPLETE! ===');
