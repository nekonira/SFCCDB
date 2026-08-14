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
const messiHaifu = players.find(p => p.id === 'p112' || (p.name && p.name.includes('メッシ') && p.name.includes('配布')));

console.log('=== LIONEL MESSI (HAIFU) ===');
console.log(JSON.stringify(messiHaifu, null, 2));
