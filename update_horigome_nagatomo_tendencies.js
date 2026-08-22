const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING PLAY TENDENCIES FOR NAGATOMO (p330) AND HORIGOME (p331) ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const newTendencies = `playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    }`;

// Function to update playTendencies for a player ID
function updatePlayerTendencies(playerId) {
  const pIdx = mockCode.indexOf(`id: '${playerId}'`);
  if (pIdx === -1) {
    console.error(`Could not find ${playerId} in mockData.js!`);
    return false;
  }
  const tStart = mockCode.indexOf('playTendencies: {', pIdx);
  const tEnd = mockCode.indexOf('}', tStart);
  const oldBlock = mockCode.substring(tStart, tEnd + 1);
  mockCode = mockCode.replace(oldBlock, newTendencies);
  console.log(`Updated playTendencies for ${playerId}.`);
  return true;
}

updatePlayerTendencies('p330');
updatePlayerTendencies('p331');

fs.writeFileSync(mockPath, mockCode, 'utf-8');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);

['p330', 'p331'].forEach(id => {
  const p = sandbox.window.INITIAL_PLAYERS.find(x => x.id === id);
  console.log(`Verified ${p.name} (${p.id}) playTendencies:`, p.playTendencies);
});

console.log('=== UPDATE SUCCESSFUL! ===');
