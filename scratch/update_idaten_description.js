const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING ABILITY DESCRIPTION FOR 韋駄天 ===');

// 1. Update src/data/mockData.js
const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetStr = "description: '発動条件：好調　/　走力・敏捷性・スタミナUP'";
const newStr = "description: '発動条件：好調　/　スタミナ・走力UP　/　ハーフタイムにスタミナ回復量'";

if (mockCode.includes(targetStr)) {
  mockCode = mockCode.replace(targetStr, newStr);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('Updated 韋駄天 description in mockData.js');
}

// 2. Update add_daizenMaeda2026.js
const scriptPath = path.join(__dirname, '..', 'add_daizenMaeda2026.js');
if (fs.existsSync(scriptPath)) {
  let scriptCode = fs.readFileSync(scriptPath, 'utf-8');
  if (scriptCode.includes(targetStr)) {
    scriptCode = scriptCode.replace(targetStr, newStr);
    fs.writeFileSync(scriptPath, scriptCode, 'utf-8');
    console.log('Updated 韋駄天 description in add_daizenMaeda2026.js');
  }
}

// 3. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const p386 = players.find(p => p.id === 'p386');
if (p386) {
  console.log('p386 (前田大然) Abilities:');
  p386.abilities.forEach(a => console.log(`  [${a.rank}] ${a.name} : ${a.description}`));
}

console.log('=== UPDATE COMPLETE AND VERIFIED! ===');
