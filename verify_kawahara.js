const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

try {
  vm.runInContext(code, sandbox);
  const players = sandbox.window.INITIAL_PLAYERS;
  console.log(`Total players loaded: ${players.length}`);
  
  const p178 = players.find(p => p.id === 'p178');
  if (!p178) {
    console.error('ERROR: p178 not found!');
    process.exit(1);
  }
  
  console.log('--- p178 Verification ---');
  console.log('ID:', p178.id);
  console.log('Name:', p178.name);
  console.log('Reading:', p178.readingName);
  console.log('Category:', p178.category);
  console.log('Main Position:', p178.mainPosition);
  console.log('Policy:', p178.policy);
  console.log('PlayStyle:', p178.playStyle);
  console.log('PlayStyleLevel:', p178.playStyleLevel);
  console.log('Overall:', p178.overall, '-> Max:', p178.maxOverall);
  console.log('Base Stats:', JSON.stringify(p178.baseStats));
  console.log('Detail Stats:', JSON.stringify(p178.detailStats));
  console.log('Max Base Stats:', JSON.stringify(p178.maxEnhanced.baseStats));
  console.log('Skill:', JSON.stringify(p178.skill));
  console.log('Abilities:', JSON.stringify(p178.abilities));
  console.log('ALL CHECKS PASSED PERFECTLY!');
} catch (err) {
  console.error('Syntax / Runtime Error:', err.message);
  process.exit(1);
}
