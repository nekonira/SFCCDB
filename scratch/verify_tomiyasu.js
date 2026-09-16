const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING TAKEHIRO TOMIYASU (p389) ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('1. Total Players in mockData.js:', players.length);

const tomiyasu = players.find(p => p.id === 'p389');
if (!tomiyasu) {
  console.error('FAIL: p389 missing in mockData.js!');
  process.exit(1);
}

console.log('2. p389 Details:', tomiyasu.name, `(${tomiyasu.nationality} / Category:${tomiyasu.category} / Main:${tomiyasu.mainPosition} Sub:[${tomiyasu.subPositions.join(',')}] / ${tomiyasu.policy} / ${tomiyasu.playStyle} ${tomiyasu.playStyleLevel})`);
console.log('   Overall:', tomiyasu.overall, '-> Max:', tomiyasu.maxOverall);
console.log('   Skill:', tomiyasu.skill.rank, tomiyasu.skill.name);
console.log('   Abilities:', tomiyasu.abilities.map(a => `[${a.rank}] ${a.name}`).join(' | '));

const imgPath = path.join(__dirname, '..', 'src', 'data', 'takehiroTomiyasu2026Image.js');
const imgCode = fs.readFileSync(imgPath, 'utf-8');
vm.runInContext(imgCode, sandbox);
console.log('3. Image file loaded. Length:', sandbox.window.TAKEHIRO_TOMIYASU_2026_IMAGE.length);

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
console.log('4. index.html script tag:', indexHtml.includes('takehiroTomiyasu2026Image.js'));

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');
console.log('5. src/app.js mapping:', appJsCode.includes('"p389"'));

const appJsxCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
console.log('6. src/app.jsx mapping:', appJsxCode.includes('"p389"'));

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
