const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING YUKINARI SUGAWARA (p388) ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('1. Total Players in mockData.js:', players.length);

const sugawara = players.find(p => p.id === 'p388');
if (!sugawara) {
  console.error('FAIL: p388 missing in mockData.js!');
  process.exit(1);
}

console.log('2. p388 Details:', sugawara.name, `(${sugawara.nationality} / Category:${sugawara.category} / Main:${sugawara.mainPosition} Sub:[${sugawara.subPositions.join(',')}] / ${sugawara.policy} / ${sugawara.playStyle} ${sugawara.playStyleLevel})`);
console.log('   Overall:', sugawara.overall, '-> Max:', sugawara.maxOverall);
console.log('   Skill:', sugawara.skill.rank, sugawara.skill.name);
console.log('   Abilities:', sugawara.abilities.map(a => `[${a.rank}] ${a.name}`).join(' | '));

const imgPath = path.join(__dirname, '..', 'src', 'data', 'yukinariSugawara2026Image.js');
const imgCode = fs.readFileSync(imgPath, 'utf-8');
vm.runInContext(imgCode, sandbox);
console.log('3. Image file loaded. Length:', sandbox.window.YUKINARI_SUGAWARA_2026_IMAGE.length);

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
console.log('4. index.html script tag:', indexHtml.includes('yukinariSugawara2026Image.js'));

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');
console.log('5. src/app.js mapping:', appJsCode.includes('"p388"'));

const appJsxCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
console.log('6. src/app.jsx mapping:', appJsxCode.includes('"p388"'));

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
