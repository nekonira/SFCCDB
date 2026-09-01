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
const passAbilities = new Map();
const dribbleAbilities = new Map();
const breakSkills = new Map();

players.forEach(p => {
  if (p.skill && p.skill.name.includes('中央突破')) {
    breakSkills.set(p.skill.name, p.skill.description);
  }
  if (p.abilities && Array.isArray(p.abilities)) {
    p.abilities.forEach(a => {
      if (a.name.includes('パサー') || a.name.includes('パス')) {
        passAbilities.set(a.name, a.description);
      }
      if (a.name.includes('ドリブラー') || a.name.includes('ドリブル')) {
        dribbleAbilities.set(a.name, a.description);
      }
    });
  }
});

console.log("=== SKILLS WITH 中央突破 ===");
for (let [k, v] of breakSkills) console.log(`"${k}": "${v}"`);

console.log("\n=== ABILITIES WITH パサー / パス ===");
for (let [k, v] of passAbilities) console.log(`"${k}": "${v}"`);

console.log("\n=== ABILITIES WITH ドリブラー / ドリブル ===");
for (let [k, v] of dribbleAbilities) console.log(`"${k}": "${v}"`);
