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

function searchSkill(name) {
  console.log(`--- Searching Skill: ${name} ---`);
  players.forEach(p => {
    if (p.skill && p.skill.name.includes(name)) {
      console.log(p.name, '->', p.skill);
    }
  });
}

function searchAbility(name) {
  console.log(`--- Searching Ability: ${name} ---`);
  players.forEach(p => {
    if (p.abilities) {
      p.abilities.forEach(a => {
        if (a.name.includes(name)) {
          console.log(p.name, '->', a);
        }
      });
    }
  });
}

searchSkill('コントロールショット');
searchAbility('ターゲットマン');
searchAbility('パワフルランナー');
searchAbility('ムービングスナイパー');
