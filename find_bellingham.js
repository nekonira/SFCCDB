const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const bellingham = players.find(p => p.name && (p.name.includes('ベリンガム') || p.name.includes('Bellingham')));

console.log('Found Bellingham:', bellingham ? { id: bellingham.id, name: bellingham.name, playTendencies: bellingham.playTendencies } : 'NOT FOUND');
