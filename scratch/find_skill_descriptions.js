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
console.log("Total players:", players.length);

const skillsMap = new Map();
const abilitiesMap = new Map();

players.forEach(p => {
  if (p.skill && p.skill.name) {
    skillsMap.set(p.skill.name, p.skill.description);
  }
  if (p.abilities && Array.isArray(p.abilities)) {
    p.abilities.forEach(a => {
      if (a.name) {
        abilitiesMap.set(a.name, a.description);
      }
    });
  }
});

console.log("=== ALL UNIQUE SKILLS (" + skillsMap.size + ") ===");
for (let [name, desc] of skillsMap) {
  if (name.includes('突破') || name.includes('パサー') || name.includes('ドリブラー') || desc.includes('発動')) {
    console.log(`SKILL: "${name}" -> "${desc}"`);
  }
}

console.log("\n=== SAMPLE ABILITIES ===");
let count = 0;
for (let [name, desc] of abilitiesMap) {
  if (count++ < 20) {
    console.log(`ABILITY: "${name}" -> "${desc}"`);
  }
}
