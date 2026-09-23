const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cody Gakpo (p391) Skill Rank & Max Enhanced Stats ---');

const p391Idx = code.indexOf("id: 'p391'");
if (p391Idx === -1) {
  console.error("ERROR: id 'p391' not found in mockData.js");
  process.exit(1);
}

const p391EndIdx = code.indexOf("avatarUrl:", p391Idx);
const p391BlockEnd = code.indexOf("}", p391EndIdx);

let p391Block = code.substring(p391Idx, p391BlockEnd);

// 1. Update skill rank to 銀
p391Block = p391Block.replace(
  /skill:\s*\{\s*name:\s*['"]スリップビート['"],\s*rank:\s*['"][^'"]+['"]/,
  "skill: {\n      name: 'スリップビート',\n      rank: '銀'"
);

// 2. Update maxOverall and maxEnhanced
const newMaxEnhancedObj = `maxOverall: 15399,
    maxEnhanced: {
      overall: 15399,
      baseStats: {
        shoot: 2869,
        pass: 2820,
        dribble: 3003,
        defense: 2375,
        physical: 2763,
        speed: 1989
      },
      detailStats: {
        shoot: { finishing: 973, power: 939, composure: 957 },
        pass: { shortPass: 945, longPass: 937, accuracy: 938 },
        dribble: { breakout: 1002, keeping: 1002, ballTouch: 999 },
        defense: { tackle: 777, interception: 806, marking: 792 },
        physical: { jumping: 913, contact: 922, stamina: 928 },
        speed: { running: 981, agility: 1008 }
      }
    }`;

p391Block = p391Block.replace(
  /maxOverall:\s*\d+,[\s\S]*?maxEnhanced:\s*\{[\s\S]*?\}\s*\}\s*\}/,
  newMaxEnhancedObj
);

code = code.substring(0, p391Idx) + p391Block + code.substring(p391BlockEnd);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully updated p391 in mockData.js');

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const updatedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p391');
console.log('Verified p391 Skill:', updatedPlayer.skill);
console.log('Verified p391 maxOverall:', updatedPlayer.maxOverall);
console.log('Verified p391 maxEnhanced baseStats:', updatedPlayer.maxEnhanced.baseStats);
