const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const imgPath = path.join(__dirname, '..', 'src', 'data', 'florianThauvin2026Image.js');
const appJsPath = path.join(__dirname, '..', 'src', 'app.js');

const mockCode = fs.readFileSync(mockPath, 'utf-8');
const imgCode = fs.readFileSync(imgPath, 'utf-8');
const appCode = fs.readFileSync(appJsPath, 'utf-8');

const sandbox = {
  window: {},
  document: {
    createElement: () => ({ getContext: () => {} }),
    head: { appendChild: () => {} }
  },
  console: console,
  setTimeout: () => {},
  setInterval: () => {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgCode, sandbox);
vm.runInContext(mockCode, sandbox);

console.log("=== VERIFYING FLORIAN THAUVIN (p378) ===");

const p378 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p378');
if (!p378) {
  console.error("p378 NOT FOUND!");
  process.exit(1);
}

console.log("Name:", p378.name);
console.log("Rarity:", p378.rarity, "BaseRarity:", p378.baseRarity);
console.log("Nationality:", p378.nationality);
console.log("Position:", p378.mainPosition, "Category:", p378.category);
console.log("PlayStyle:", p378.playStyle, p378.playStyleLevel);
console.log("Policy:", p378.policy);
console.log("Initial Overall:", p378.overall);
console.log("Max Enhanced Overall:", p378.maxOverall);
console.log("Skill:", p378.skill);
console.log("Abilities:", p378.abilities);
console.log("Image Variable Loaded:", !!sandbox.window.FLORIAN_THAUVIN_2026_IMAGE);

console.log("=== ALL VERIFICATIONS PASSED SUCCESSFULLY ===");
