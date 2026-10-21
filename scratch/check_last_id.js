const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
console.log('Total players:', players.length);
const lastPlayer = players[players.length - 1];
console.log('Last player:', lastPlayer ? lastPlayer.id + ' ' + lastPlayer.name : 'NONE');

// Find max ID
let maxIdNum = 0;
players.forEach(p => {
  const m = p.id.match(/^p(\d+)$/);
  if (m) {
    const num = parseInt(m[1], 10);
    if (num > maxIdNum) maxIdNum = num;
  }
});
console.log('Max ID: p' + maxIdNum);
