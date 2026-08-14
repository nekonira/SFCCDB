const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const arakis = players.filter(p => p.name && (p.name.includes('荒木') || p.name.includes('Araki')));

console.log('=== ARAKI ENTRIES IN MOCKDATA ===');
arakis.forEach(p => console.log(JSON.stringify(p, null, 2)));
console.log(`Total players in mockData.js: ${players.length}`);
