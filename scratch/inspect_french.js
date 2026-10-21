const fs = require('fs');
const vm = require('vm');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

const sample = players.filter(p => ['p395', 'p396', 'p397', 'p400', 'p401', 'p402'].includes(p.id));
console.log(JSON.stringify(sample.map(p => ({
  id: p.id,
  name: p.name,
  readingName: p.readingName,
  category: p.category,
  mainPosition: p.mainPosition,
  subPositions: p.subPositions,
  playStyle: p.playStyle,
  playStyleLevel: p.playStyleLevel,
  rarity: p.rarity,
  baseRarity: p.baseRarity
})), null, 2));
