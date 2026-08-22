const fs = require('fs');
const vm = require('vm');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
vm.runInContext(mockCode, sandbox);

const p306 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p306');
const p114 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p114');

console.log('=== P306 (新規 ラファエル・エリアス) ===');
console.log('Overall:', p306.overall, 'MaxOverall:', p306.maxOverall);
console.log('BaseStats (Initial):', p306.baseStats);
console.log('DetailStats (Initial):', p306.detailStats);
console.log('BaseStats (Max):', p306.maxEnhanced.baseStats);
console.log('DetailStats (Max):', p306.maxEnhanced.detailStats);

console.log('\n=== P114 (ラファエル・エリアス J1 BEST11 2025) ===');
console.log('Overall:', p114.overall, 'MaxOverall:', p114.maxOverall);
console.log('BaseStats (Initial):', p114.baseStats);
console.log('DetailStats (Initial):', p114.detailStats);
console.log('BaseStats (Max):', p114.maxEnhanced.baseStats);
console.log('DetailStats (Max):', p114.maxEnhanced.detailStats);
