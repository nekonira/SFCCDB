const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING BRONZE POWERFUL JUMPER DESCRIPTION ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

// Replace Bronze パワフルジャンパー description
let count = 0;
const targetPattern = /\{\s*name:\s*['"]パワフルジャンパー['"]\s*,\s*rank:\s*['"]銅['"]\s*,\s*description:\s*['"][^'"]*['"]\s*\}/g;

code = code.replace(targetPattern, (match) => {
  count++;
  return "{ name: 'パワフルジャンパー', rank: '銅', description: '発動条件：途中出場　/　ジャンプ・コンタクトUP' }";
});

console.log(`Replaced ${count} occurrences of Bronze パワフルジャンパー in mockData.js.`);

fs.writeFileSync(mockPath, code, 'utf-8');

// Verification
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const matchingAbilities = [];

players.forEach(p => {
  if (p.abilities) {
    p.abilities.forEach(a => {
      if (a.name === 'パワフルジャンパー') {
        matchingAbilities.push({ playerId: p.id, playerName: p.name, rank: a.rank, description: a.description });
      }
    });
  }
});

console.log('Verification of all パワフルジャンパー abilities in database:');
console.table(matchingAbilities);

const bronzeFailures = matchingAbilities.filter(a => a.rank === '銅' && a.description !== '発動条件：途中出場　/　ジャンプ・コンタクトUP');

if (bronzeFailures.length === 0) {
  console.log('🎉 ALL BRONZE POWERFUL JUMPER ABILITIES SUCCESSFULLY UPDATED!');
} else {
  console.error('❌ Some Bronze entries were not updated properly:', bronzeFailures);
  process.exit(1);
}
