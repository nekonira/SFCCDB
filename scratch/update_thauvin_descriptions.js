const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log("=== UNIFYING FLORIAN THAUVIN (p378) SKILL & ABILITY DESCRIPTIONS ===");

const p378Idx = code.indexOf("id: 'p378'");
if (p378Idx === -1) {
  console.error("Could not find p378 in mockData.js!");
  process.exit(1);
}

// Unified Skill & Abilities Objects
const newSkill = `{ name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' }`;
const newAbilities = `[
      { name: '懐の深いパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キープ力UP' },
      { name: '技巧派ドリブラー', rank: '銅', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ]`;

// Find skill and abilities blocks of p378
const skillStartIdx = code.indexOf("skill: {", p378Idx);
const skillEndIdx = code.indexOf("}", skillStartIdx);

const abilitiesStartIdx = code.indexOf("abilities: [", p378Idx);
const abilitiesEndIdx = code.indexOf("]", abilitiesStartIdx);

// Replace in code
let p378Block = code.substring(p378Idx);

p378Block = p378Block.replace(
  /skill:\s*\{[^}]*\}/,
  `skill: ${newSkill}`
);

p378Block = p378Block.replace(
  /abilities:\s*\[[\s\S]*?\]/,
  `abilities: ${newAbilities}`
);

code = code.substring(0, p378Idx) + p378Block;

fs.writeFileSync(mockPath, code, 'utf-8');
console.log("Updated p378 in mockData.js with unified descriptions.");

// Verify execution
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const p378 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p378');
console.log("\n--- VERIFIED P378 SKILL & ABILITIES ---");
console.log("Skill:", JSON.stringify(p378.skill, null, 2));
console.log("Abilities:", JSON.stringify(p378.abilities, null, 2));
console.log("\n=== UNIFICATION COMPLETED SUCCESSFULLY ===");
