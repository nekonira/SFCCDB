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

const ronaldo = players.find(p => p.id === 'p02' || (p.name && p.name.includes('ロナウド')));
const kawamoto = players.find(p => p.id === 'p111' || (p.name && p.name.includes('河本')));

console.log('=== CRISTIANO RONALDO (p02) ===');
console.log(JSON.stringify(ronaldo, null, 2));

console.log('\n=== ONISHIGE KAWAMOTO (p111) ===');
console.log(JSON.stringify(kawamoto, null, 2));
