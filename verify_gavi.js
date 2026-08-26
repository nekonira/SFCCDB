const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const gavi = players.find(p => p.id === 'p375' || p.name === 'ガビ');

console.log('=== GAVI VERIFICATION ===');
console.log('Player Found:', gavi ? `${gavi.name} (${gavi.id})` : 'NOT FOUND');
if (gavi) {
  console.log('Play Tendencies:', gavi.playTendencies);
  const expected = {
    attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
    shortPass: 0, longPass: 2, throughPass: 1, cutIn: 0, keep: 0,
    delay: 0, rushOut: -1, feint: 0, press: 0
  };
  
  let match = true;
  for (const k of Object.keys(expected)) {
    if (gavi.playTendencies[k] !== expected[k]) {
      console.error(`Mismatch for ${k}: expected ${expected[k]}, got ${gavi.playTendencies[k]}`);
      match = false;
    }
  }
  
  if (match) {
    console.log('SUCCESS: All 14 play tendencies values match expected (+1 0 0 0 0 0 +2 -1 0 0 0 -1 0 0)!');
  } else {
    console.error('FAILURE: Mismatch found!');
  }
}
