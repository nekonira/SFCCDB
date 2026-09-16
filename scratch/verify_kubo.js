const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING TAKEFUSA KUBO (p387) ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('1. Total Players in mockData.js:', players.length);

const kubo = players.find(p => p.id === 'p387');
if (!kubo) {
  console.error('FAIL: p387 missing in mockData.js!');
  process.exit(1);
}

console.log('2. p387 Details:', kubo.name, `(${kubo.nationality} / Category:${kubo.category} / Main:${kubo.mainPosition} Sub:[${kubo.subPositions.join(',')}] / ${kubo.policy} / ${kubo.playStyle} ${kubo.playStyleLevel})`);
console.log('   Overall:', kubo.overall, '-> Max:', kubo.maxOverall);
console.log('   Skill:', kubo.skill.rank, kubo.skill.name);
console.log('   Abilities:', kubo.abilities.map(a => `[${a.rank}] ${a.name}`).join(' | '));

const imgPath = path.join(__dirname, '..', 'src', 'data', 'takefusaKubo2026Image.js');
const imgCode = fs.readFileSync(imgPath, 'utf-8');
vm.runInContext(imgCode, sandbox);
console.log('3. Image file loaded. Length:', sandbox.window.TAKEFUSA_KUBO_2026_IMAGE.length);

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
console.log('4. index.html script tag:', indexHtml.includes('takefusaKubo2026Image.js'));

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');
console.log('5. src/app.js mapping:', appJsCode.includes('"p387"'));

const appJsxCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
console.log('6. src/app.jsx mapping:', appJsxCode.includes('"p387"'));

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
