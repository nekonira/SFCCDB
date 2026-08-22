const fs = require('fs');
const vm = require('vm');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
vm.runInContext(mockCode, sandbox);

const p114 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p114');
console.log('p114 Verification:', {
  name: p114.name,
  overall: p114.overall,
  maxOverall: p114.maxOverall,
  category: p114.category,
  mainPosition: p114.mainPosition,
  playStyle: p114.playStyle,
  playStyleLevel: p114.playStyleLevel
});
