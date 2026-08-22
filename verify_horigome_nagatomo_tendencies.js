const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);

['p330', 'p331'].forEach(id => {
  const p = sandbox.window.INITIAL_PLAYERS.find(x => x.id === id);
  console.log(`Verified ${p.name} (${p.id}) playTendencies:`, p.playTendencies);
});
