const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
players.forEach(p => {
  if (p.skill && (p.skill.name.includes('スリップ') || p.skill.name.includes('ビート') || p.skill.name.includes('ドリブル'))) {
    console.log(`Skill in ${p.name} (${p.skill.rank}):`, p.skill);
  }
});
