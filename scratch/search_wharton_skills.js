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
const names = ['即興の起点', 'ドリブンパス', '懐の深いロングパサー', 'シルクタッチ', 'ワイドカッター'];

names.forEach(name => {
  console.log(`=== Searching for: ${name} ===`);
  players.forEach(p => {
    if (p.skill && p.skill.name === name) {
      console.log(`Skill in ${p.name} (${p.skill.rank}):`, p.skill);
    }
    if (p.abilities) {
      p.abilities.forEach(a => {
        if (a.name === name) {
          console.log(`Ability in ${p.name} (${a.rank}):`, a);
        }
      });
    }
  });
});
