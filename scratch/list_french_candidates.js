const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const french = players.filter(p => p.nationality === 'フランス');
console.log('Total French players:', french.length);

french.forEach(p => {
  console.log(`${p.id} ${p.name.padEnd(25)} ${p.policy.padEnd(8)} ${p.mainPosition}/${(p.subPositions||[]).join(',')} ${(p.playStyle + ' ' + (p.playStyleLevel||'')).padEnd(15)} maxOverall:${p.maxOverall || p.overall}`);
});
