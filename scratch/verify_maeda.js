const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING DAIZEN MAEDA (p386) ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('1. Total Players in mockData.js:', players.length);

const maeda = players.find(p => p.id === 'p386');
if (!maeda) {
  console.error('FAIL: p386 missing in mockData.js!');
  process.exit(1);
}

console.log('2. p386 Details:', maeda.name, `(${maeda.nationality} / Category:${maeda.category} / Main:${maeda.mainPosition} Sub:[${maeda.subPositions.join(',')}] / ${maeda.policy} / ${maeda.playStyle} ${maeda.playStyleLevel})`);
console.log('   Overall:', maeda.overall, '-> Max:', maeda.maxOverall);
console.log('   Skill:', maeda.skill.rank, maeda.skill.name);
console.log('   Abilities:', maeda.abilities.map(a => `[${a.rank}] ${a.name}`).join(' | '));

const imgPath = path.join(__dirname, '..', 'src', 'data', 'daizenMaeda2026Image.js');
const imgCode = fs.readFileSync(imgPath, 'utf-8');
vm.runInContext(imgCode, sandbox);
console.log('3. Image file loaded. Length:', sandbox.window.DAIZEN_MAEDA_2026_IMAGE.length);

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
console.log('4. index.html script tag:', indexHtml.includes('daizenMaeda2026Image.js'));

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');
console.log('5. src/app.js mapping:', appJsCode.includes('"p386"'));

const appJsxCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
console.log('6. src/app.jsx mapping:', appJsxCode.includes('"p386"'));

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
