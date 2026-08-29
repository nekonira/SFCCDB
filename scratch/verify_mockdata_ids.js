const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

console.log(`Total players in mockData.js: ${players.length}`);

// Print all players with ID starting from p280 to p380
players.filter(p => {
  const num = parseInt(p.id.replace('p', ''), 10);
  return num >= 280;
}).forEach(p => {
  console.log(`${p.id}: ${p.name} (${p.readingName})`);
});
