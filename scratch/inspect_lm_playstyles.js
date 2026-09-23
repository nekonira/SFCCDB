const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const lmPlayers = players.filter(p => p.mainPosition === 'LM' || p.mainPosition === 'LW');
console.log(`Found ${lmPlayers.length} LM/LW players`);
lmPlayers.slice(0, 10).forEach(p => {
  console.log(`${p.id}: ${p.name}, Pos: ${p.mainPosition}, PlayStyle: ${p.playStyle}, Level: ${p.playStyleLevel}`);
});
