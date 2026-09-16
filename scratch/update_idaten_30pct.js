const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== REFINING ABILITY DESCRIPTION FOR 韋駄天 (30% UP) ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetStr = "description: '発動条件：好調　/　スタミナ・走力UP　/　ハーフタイムにスタミナ回復量'";
const newStr = "description: '発動条件：好調　/　スタミナ・走力UP　/　ハーフタイムにスタミナ回復量30％UP'";

if (mockCode.includes(targetStr)) {
  mockCode = mockCode.replace(targetStr, newStr);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('Updated 韋駄天 description in mockData.js');
}

const scriptPath = path.join(__dirname, '..', 'add_daizenMaeda2026.js');
if (fs.existsSync(scriptPath)) {
  let scriptCode = fs.readFileSync(scriptPath, 'utf-8');
  if (scriptCode.includes(targetStr)) {
    scriptCode = scriptCode.replace(targetStr, newStr);
    fs.writeFileSync(scriptPath, scriptCode, 'utf-8');
    console.log('Updated 韋駄天 description in add_daizenMaeda2026.js');
  }
}

// Verification
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
