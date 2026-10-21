const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const ids = new Set(players.map(p => p.id));

for (let i = 1; i <= 402; i++) {
  if (!ids.has('p' + i)) {
    console.log('Missing: p' + i);
  }
}
console.log('Next new ID would be: p403');
