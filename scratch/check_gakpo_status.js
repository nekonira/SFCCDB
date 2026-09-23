const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const player = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p391');
console.log('=== Current p391 (Cody Gakpo) ===');
console.log(JSON.stringify(player, null, 2));
