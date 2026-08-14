const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const p181 = players.find(p => p.id === 'p181');
const p182 = players.find(p => p.id === 'p182');

console.log('p181:', p181 ? { id: p181.id, name: p181.name, mainPosition: p181.mainPosition } : 'NOT FOUND');
console.log('p182:', p182 ? { id: p182.id, name: p182.name, mainPosition: p182.mainPosition } : 'NOT FOUND');
