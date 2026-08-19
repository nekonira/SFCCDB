const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('Total players in mockData.js:', players.length);
const lastPlayer = players[players.length - 1];
console.log('Last player:', lastPlayer.id, lastPlayer.name);

// Find all GK players to check detailStats format for GK
const gkPlayers = players.filter(p => p.mainPosition === 'GK' || p.category === 'GK');
console.log('GK players count:', gkPlayers.length);
if (gkPlayers.length > 0) {
  console.log('Sample GK player:', JSON.stringify(gkPlayers[0], null, 2));
}
