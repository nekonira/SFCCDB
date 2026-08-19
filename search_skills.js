const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;

function findItem(name) {
  for (const p of players) {
    if (p.skill && p.skill.name.includes(name)) {
      console.log('Skill found:', p.skill);
    }
    if (p.abilities) {
      for (const a of p.abilities) {
        if (a.name.includes(name)) {
          console.log('Ability found:', a);
        }
      }
    }
  }
}

console.log('--- Searching エレガントセーブ ---');
findItem('エレガントセーブ');

console.log('--- Searching 守護神 ---');
findItem('守護神');

console.log('--- Searching パワフルジャンパー ---');
findItem('パワフルジャンパー');

console.log('--- Searching 高性能ロングパサー ---');
findItem('高性能ロングパサー');
