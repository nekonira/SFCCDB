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

const playerMap = {};
players.forEach((p, idx) => {
  playerMap[p.id] = { index: idx, id: p.id, name: p.name, readingName: p.readingName };
});

fs.writeFileSync(path.join(rootDir, 'scratch', 'mockdata_players_list.json'), JSON.stringify(players.map(p => ({ id: p.id, name: p.name, readingName: p.readingName })), null, 2), 'utf-8');
console.log('Saved scratch/mockdata_players_list.json');

// Check the reported players:
// 1. 喜岡佳太(2026)
// 2. キム・ムンファン
// 3. リオネル・メッシ(配布)
const reportedNames = ['喜岡佳太', 'キム・ムンファン', 'メッシ', 'メッシ(配布)', 'パブロ・サバグ', 'クバルシ', 'ヤマル'];
players.forEach(p => {
  if (reportedNames.some(rn => p.name.includes(rn))) {
    console.log(`MATCHED REPORTED: ${p.id} -> ${p.name} (${p.readingName})`);
  }
});
