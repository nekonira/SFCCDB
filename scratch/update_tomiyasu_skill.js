const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING TAKEHIRO TOMIYASU SKILL RANK TO SILVER ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const tomiyasu = players.find(p => p.name === '冨安健洋' || p.id === 'p389');

if (!tomiyasu) {
  console.error('Tomiyasu not found in mockData.js!');
  process.exit(1);
}

console.log('Current Tomiyasu skill:', tomiyasu.skill);

// Update rank in mockData.js
const p389Idx = mockCode.indexOf("id: 'p389'");
if (p389Idx !== -1) {
  const nextSkillIdx = mockCode.indexOf("skill:", p389Idx);
  const nextRankIdx = mockCode.indexOf("rank: '銅'", nextSkillIdx);
  
  if (nextRankIdx !== -1 && nextRankIdx < p389Idx + 2000) {
    mockCode = mockCode.substring(0, nextRankIdx) + "rank: '銀'" + mockCode.substring(nextRankIdx + "rank: '銅'".length);
    fs.writeFileSync(mockPath, mockCode, 'utf-8');
    console.log('Successfully updated skill rank to 銀 in mockData.js');
  } else {
    console.error('Could not locate rank: 銅 for Tomiyasu');
  }
}

// Also update add_takehiroTomiyasu2026.js
const scriptPath = path.join(__dirname, '..', 'add_takehiroTomiyasu2026.js');
if (fs.existsSync(scriptPath)) {
  let scriptCode = fs.readFileSync(scriptPath, 'utf-8');
  scriptCode = scriptCode.replace(
    "skill: { name: '奪還', rank: '銅', description:",
    "skill: { name: '奪還', rank: '銀', description:"
  );
  fs.writeFileSync(scriptPath, scriptCode, 'utf-8');
  console.log('Successfully updated add_takehiroTomiyasu2026.js');
}

// Verification
const newSandbox = { window: {} };
newSandbox.window = newSandbox;
vm.createContext(newSandbox);
const updatedCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(updatedCode, newSandbox);

const updatedTomiyasu = newSandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p389' || p.name === '冨安健洋');
console.log('Verified updated Tomiyasu skill:', updatedTomiyasu ? updatedTomiyasu.skill : 'MISSING');
