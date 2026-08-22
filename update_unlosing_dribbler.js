const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING 銀「失わないドリブラー」 DESCRIPTION ===');

const newDesc = "発動条件：絶好調　/　突破力・キープ力UP";

// Update mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetOld = "{ name: '失わないドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・キープ力UP' }";
const targetNew = "{ name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' }";

if (mockCode.includes(targetOld)) {
  mockCode = mockCode.split(targetOld).join(targetNew);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js updated successfully.');
} else {
  console.log('targetOld not found directly in mockData.js');
}

const addScriptPath = path.join(__dirname, 'add_konnokazuya2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  if (scriptCode.includes(targetOld)) {
    scriptCode = scriptCode.split(targetOld).join(targetNew);
    fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
    console.log('2. add_konnokazuya2026.js updated.');
  }
}

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const verifyCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(verifyCode, sandbox);

const unlosingDribblers = [];
sandbox.window.INITIAL_PLAYERS.forEach(p => {
  (p.abilities || []).forEach(a => {
    if (a.name === '失わないドリブラー' && a.rank === '銀') {
      unlosingDribblers.push({ player: p.name, ability: a });
    }
  });
});

console.log('3. All 銀「失わないドリブラー」 in mockData.js:');
console.log(JSON.stringify(unlosingDribblers, null, 2));

console.log('=== UPDATE COMPLETE! ===');
