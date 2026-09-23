const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cody Gakpo (p391) Max Enhanced Stats ---');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const player = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p391');
if (!player) {
  console.error("ERROR: Player p391 not found!");
  process.exit(1);
}

// Find p391 block in code
const p391Idx = code.indexOf("id: 'p391'");
if (p391Idx === -1) {
  console.error("ERROR: id 'p391' string not found in code");
  process.exit(1);
}

const p391EndIdx = code.indexOf("avatarUrl:", p391Idx);
const p391BlockEnd = code.indexOf("}", p391EndIdx);

const newMaxEnhancedObj = `    maxOverall: 15399,
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

// Replace maxOverall and maxEnhanced in p391 block
const p391Slice = code.substring(p391Idx, p391BlockEnd);
const updatedP391Slice = p391Slice.replace(
  /maxOverall:\s*\d+,[\s\S]*?maxEnhanced:\s*\{[\s\S]*?\}\s*\}\s*\}/,
  newMaxEnhancedObj
);

code = code.substring(0, p391Idx) + updatedP391Slice + code.substring(p391BlockEnd);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully written updated maxEnhanced stats to mockData.js');

// Verify with Node VM
const verifySandbox = { window: {} };
verifySandbox.window = verifySandbox;
vm.createContext(verifySandbox);
vm.runInContext(code, verifySandbox);

const updatedPlayer = verifySandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p391');
console.log('Verified updated p391 maxOverall:', updatedPlayer.maxOverall);
console.log('Verified updated p391 maxEnhanced baseStats:', updatedPlayer.maxEnhanced.baseStats);
console.log('Verified updated p391 maxEnhanced detailStats:', updatedPlayer.maxEnhanced.detailStats);
