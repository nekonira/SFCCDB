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
  if (p.skill && p.skill.name === '強引な中央突破') {
    console.log(`PLAYER WITH SKILL 強引な中央突破: ${p.id} ${p.name} (Rarity: ${p.rarity})`);
    console.log('Skill Obj:', JSON.stringify(p.skill, null, 2));
  }
  if (p.abilities && Array.isArray(p.abilities)) {
    p.abilities.forEach(a => {
      if (a.name === '魂の深いパサー' || a.name === '技巧派ドリブラー') {
        console.log(`PLAYER WITH ABILITY ${a.name}: ${p.id} ${p.name} (Rarity: ${p.rarity})`);
        console.log('Ability Obj:', JSON.stringify(a, null, 2));
      }
    });
  }
});
