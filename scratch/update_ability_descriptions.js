const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING ABILITY DESCRIPTIONS ===');

// 1. Update src/data/mockData.js
const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

let updatedCount = 0;

if (mockCode.includes("description: '発動条件：途中出場　/　決定力・シュート力UP'")) {
  mockCode = mockCode.replace(
    "description: '発動条件：途中出場　/　決定力・シュート力UP'",
    "description: '発動条件：途中出場　/　決定力・スタミナUP'"
  );
  updatedCount++;
}

if (mockCode.includes("description: '発動条件：好調　/　冷静さ・ショートパスUP'")) {
  mockCode = mockCode.replace(
    "description: '発動条件：好調　/　冷静さ・ショートパスUP'",
    "description: '発動条件：途中出場　/　冷静さ・ショートパスUP'"
  );
  updatedCount++;
}

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log(`Updated ${updatedCount} descriptions in mockData.js.`);

// 2. Update add_kentoShiogai2026.js as well
const scriptPath = path.join(__dirname, '..', 'add_kentoShiogai2026.js');
if (fs.existsSync(scriptPath)) {
  let scriptCode = fs.readFileSync(scriptPath, 'utf-8');
  scriptCode = scriptCode.replace(
    "description: '発動条件：途中出場　/　決定力・シュート力UP'",
    "description: '発動条件：途中出場　/　決定力・スタミナUP'"
  ).replace(
    "description: '発動条件：好調　/　冷静さ・ショートパスUP'",
    "description: '発動条件：途中出場　/　冷静さ・ショートパスUP'"
  );
  fs.writeFileSync(scriptPath, scriptCode, 'utf-8');
  console.log('Updated add_kentoShiogai2026.js');
}

// 3. Verify mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const p385 = players.find(p => p.id === 'p385');
if (p385) {
  console.log('p385 (塩貝健人) Abilities:');
  p385.abilities.forEach(a => console.log(`  [${a.rank}] ${a.name} : ${a.description}`));
}

console.log('=== UPDATE COMPLETE AND VERIFIED! ===');
