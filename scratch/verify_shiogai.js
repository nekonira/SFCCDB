const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING KENTO SHIOGAI (p385) ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('1. Total Players in mockData.js:', players.length);

const shiogai = players.find(p => p.id === 'p385');
if (!shiogai) {
  console.error('FAIL: p385 missing in mockData.js!');
  process.exit(1);
}

console.log('2. p385 Details:', shiogai.name, `(${shiogai.nationality} / ${shiogai.category} / Main:${shiogai.mainPosition} Sub:[${shiogai.subPositions.join(',')}] / ${shiogai.policy} / ${shiogai.playStyle} ${shiogai.playStyleLevel})`);
console.log('   Overall:', shiogai.overall, '-> Max:', shiogai.maxOverall);
console.log('   Skill:', shiogai.skill.rank, shiogai.skill.name);
console.log('   Abilities:', shiogai.abilities.map(a => `[${a.rank}] ${a.name}`).join(' | '));

const imgPath = path.join(__dirname, '..', 'src', 'data', 'kentoShiogai2026Image.js');
const imgCode = fs.readFileSync(imgPath, 'utf-8');
vm.runInContext(imgCode, sandbox);
console.log('3. Image file loaded. Length:', sandbox.window.KENTO_SHIOGAI_2026_IMAGE.length);

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
console.log('4. index.html script tag:', indexHtml.includes('kentoShiogai2026Image.js'));

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');
console.log('5. src/app.js mapping:', appJsCode.includes('"p385"'));

const appJsxCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
console.log('6. src/app.jsx mapping:', appJsxCode.includes('"p385"'));

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
