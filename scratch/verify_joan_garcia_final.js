const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

console.log('=== Final Verification of p105 (ジョアン・ガルシア) ===');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

try {
  vm.runInContext(mockCode, sandbox);
  const p105 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p105');

  console.log('ID:', p105.id);
  console.log('Name:', p105.name);
  console.log('Overall:', p105.overall, 'Max:', p105.maxOverall);
  console.log('Base Stats (shoot, pass, dribble, defense, physical, speed):');
  console.log(p105.baseStats);
  console.log('Base Detail Stats:');
  console.log(p105.detailStats);
  console.log('Max Base Stats:');
  console.log(p105.maxEnhanced.baseStats);
  console.log('Max Detail Stats:');
  console.log(p105.maxEnhanced.detailStats);

  // Check exact values
  const checkPass = 
    p105.baseStats.defense === 1364 &&
    p105.detailStats.defense.tackle === 442 &&
    p105.detailStats.defense.interception === 468 &&
    p105.detailStats.defense.marking === 454 &&
    p105.maxEnhanced.baseStats.defense === 2969 &&
    p105.maxEnhanced.detailStats.defense.tackle === 977 &&
    p105.maxEnhanced.detailStats.defense.interception === 1003 &&
    p105.maxEnhanced.detailStats.defense.marking === 989;

  if (checkPass) {
    console.log('\n🎉 ALL STATS MATCH SPECIFICATIONS 100% PERFECTLY!');
  } else {
    console.error('\n❌ Mismatch found in stats verification!');
  }
} catch (e) {
  console.error('❌ VM Error:', e.message);
}
