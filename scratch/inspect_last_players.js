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
console.log('Total INITIAL_PLAYERS count:', players.length);
console.log('Last 5 players:');
players.slice(-5).forEach(p => {
  console.log(`- ID: ${p.id}, Name: ${p.name}, Rarity: ${p.rarity}, Category: ${p.category}, Policy: ${p.policy}`);
});
