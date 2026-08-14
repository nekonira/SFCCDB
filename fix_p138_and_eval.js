const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

// Fix player p138 skill object line
code = code.replace(/skill:\s*\{[\s\S]*?\},/g, (m) => {
  if (m.includes('驫') || m.includes('迢吶＞縺')) {
    return "skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },";
  }
  return m;
});

// Clean up any remaining garbled skill / ability / name properties
code = code.replace(/name:\s*'[^']*繧[^']*'/g, "name: 'スキル'");
code = code.replace(/description:\s*'[^']*繧[^']*'/g, "description: 'スキルの説明'");

fs.writeFileSync(mockPath, code, 'utf-8');

const sandbox = { window: {} };
try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const count = sandbox.window.INITIAL_PLAYERS.length;
  console.log(`\n🎉 SUCCESS! Evaluated mockData.js cleanly! TOTAL PLAYERS: ${count}`);
} catch (err) {
  console.error('VM Eval Error:', err.message);
  const match = err.stack.match(/evalmachine\.<anonymous>:(\d+)/);
  if (match) {
    const lineNum = parseInt(match[1]);
    const lines = code.split('\n');
    console.error(`Error at line ${lineNum}:`, lines[lineNum - 1]);
  }
}
