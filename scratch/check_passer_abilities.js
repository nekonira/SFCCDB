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

players.forEach(p => {
  if (p.abilities && Array.isArray(p.abilities)) {
    p.abilities.forEach(a => {
      if (a.name.includes('深いパサー')) {
        console.log(`PLAYER ${p.id} ${p.name}: AbilityName="${a.name}" Rank="${a.rank}" Desc="${a.description}"`);
      }
    });
  }
});
