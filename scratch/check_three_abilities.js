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
const threeAbilities = players.filter(p => p.abilities && p.abilities.length === 3);
console.log(`Players with 3 abilities: ${threeAbilities.length}`);
threeAbilities.slice(0, 5).forEach(p => console.log(`${p.id}: ${p.name}, abilities:`, p.abilities.map(a => a.name)));
