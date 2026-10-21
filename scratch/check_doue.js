const fs = require('fs');
const vm = require('vm');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

console.log('Recent 10 players:');
players.slice(-10).forEach(p => console.log(p.id, p.name, p.nationality, p.mainPosition));

const doue = players.find(p => p.name.includes('ドゥエ') || p.name.includes('Doue'));
console.log('Existing Doue:', doue ? doue.name : 'NONE');
