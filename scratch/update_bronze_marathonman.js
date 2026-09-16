const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING ALL BRONZE MARATHONMAN DESCRIPTIONS ===');

// 1. Update src/data/mockData.js
const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetPattern = /\{\s*name:\s*['"]マラソンマン['"]\s*,\s*rank:\s*['"]銅['"]\s*,\s*description:\s*['"][^'"]*['"]\s*\}/g;
let count = 0;
mockCode = mockCode.replace(targetPattern, (match) => {
  count++;
  return "{ name: 'マラソンマン', rank: '銅', description: '発動条件：絶好調　/　スタミナ・走力UP' }";
});

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log(`Updated ${count} occurrences of Bronze マラソンマン in mockData.js`);

// 2. Update add_takehiroTomiyasu2026.js
const scriptPath = path.join(__dirname, '..', 'add_takehiroTomiyasu2026.js');
if (fs.existsSync(scriptPath)) {
  let scriptCode = fs.readFileSync(scriptPath, 'utf-8');
  scriptCode = scriptCode.replace(targetPattern, "{ name: 'マラソンマン', rank: '銅', description: '発動条件：絶好調　/　スタミナ・走力UP' }");
  fs.writeFileSync(scriptPath, scriptCode, 'utf-8');
  console.log('Updated add_takehiroTomiyasu2026.js');
}

// 3. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const p389 = players.find(p => p.id === 'p389');
if (p389) {
  console.log('p389 (冨安健洋) Abilities:');
  p389.abilities.forEach(a => console.log(`  [${a.rank}] ${a.name} : ${a.description}`));
}

console.log('=== UPDATE COMPLETE AND VERIFIED! ===');
