const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const mockPath = path.join(rootDir, 'src', 'data', 'mockData.js');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const target = players.find(p => p.id === 'p139' || (p.name && p.name.includes('ソン・ミンギュ')));

console.log('Current Song Min-kyu data in mockData.js:');
console.log(target);
