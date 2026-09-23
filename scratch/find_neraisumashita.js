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
console.log('=== Players with 狙いすました強振 ===');
players.forEach(p => {
  if (p.abilities) {
    p.abilities.forEach(a => {
      if (a.name === '狙いすました強振') {
        console.log(`Player: ${p.id} (${p.name}), Rank: ${a.rank}, Current Description: "${a.description}"`);
      }
    });
  }
});
