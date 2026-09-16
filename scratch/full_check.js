const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FULL SYSTEM CHECK FOR NEW PLAYER KOKI OGAWA (p384) ===');

// 1. mockData.js
const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('1. Total Players in mockData.js:', players.length);

const ogawa = players.find(p => p.id === 'p384');
if (!ogawa) {
  console.error('FAIL: p384 missing in mockData.js!');
  process.exit(1);
}
console.log('2. p384 Found:', ogawa.name, `(${ogawa.nationality} / ${ogawa.category} / ${ogawa.mainPosition} / ${ogawa.policy} / ${ogawa.playStyle} ${ogawa.playStyleLevel})`);
console.log('   Overall:', ogawa.overall, '-> Max:', ogawa.maxOverall);
console.log('   Skill:', ogawa.skill.rank, ogawa.skill.name, ':', ogawa.skill.description);
console.log('   Abilities:', ogawa.abilities.map(a => `[${a.rank}] ${a.name}`).join(' | '));

// 2. Image File
const imgPath = path.join(__dirname, '..', 'src', 'data', 'kokiOgawa2026Image.js');
if (!fs.existsSync(imgPath)) {
  console.error('FAIL: kokiOgawa2026Image.js does not exist!');
  process.exit(1);
}
const imgCode = fs.readFileSync(imgPath, 'utf-8');
vm.runInContext(imgCode, sandbox);
console.log('3. Image file loaded. Length of Base64:', sandbox.window.KOKI_OGAWA_2026_IMAGE.length);

// 3. index.html
const indexPath = path.join(__dirname, '..', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf-8');
if (!indexHtml.includes('kokiOgawa2026Image.js')) {
  console.error('FAIL: script tag missing in index.html!');
  process.exit(1);
}
console.log('4. index.html contains script tag for kokiOgawa2026Image.js');

// 4. src/app.js
const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p384"')) {
  console.error('FAIL: p384 missing in src/app.js!');
  process.exit(1);
}
console.log('5. src/app.js contains p384 image mapping');

// 5. src/app.jsx
const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');
const appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p384"')) {
  console.error('FAIL: p384 missing in src/app.jsx!');
  process.exit(1);
}
console.log('6. src/app.jsx contains p384 image mapping');

console.log('\nSUCCESS! ALL 6 CHECKS PASSED PERFECTLY!');
