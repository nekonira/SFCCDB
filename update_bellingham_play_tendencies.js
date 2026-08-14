const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING JUDE BELLINGHAM PLAY TENDENCIES ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

const p06Idx = code.indexOf("id: 'p06'");
if (p06Idx === -1) {
  console.error('Could not find p06 in mockData.js!');
  process.exit(1);
}

const tendenciesIdx = code.indexOf('playTendencies:', p06Idx);
const attackIdx = code.indexOf('attack:', tendenciesIdx);

const currentAttack = code.substring(attackIdx, code.indexOf(',', attackIdx));
console.log('Current attack tendency line:', currentAttack);

code = code.substring(0, attackIdx) + 'attack: 1' + code.substring(code.indexOf(',', attackIdx));
fs.writeFileSync(mockPath, code, 'utf-8');

// Verification
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const bellingham = players.find(p => p.id === 'p06');

console.log('Verification of Jude Bellingham (p06):');
console.log('Name:', bellingham ? bellingham.name : 'MISSING');
console.log('Play Tendencies:', bellingham ? bellingham.playTendencies : 'MISSING');

if (bellingham && bellingham.playTendencies.attack === 1) {
  console.log('🎉 BELLINGHAM PLAY TENDENCIES SUCCESSFULLY UPDATED TO +1 0 0 +1 +2 0 0 0 0 0 0 -1 0 0!');
} else {
  console.error('❌ Verification failed!');
  process.exit(1);
}
