const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Updating Skill Description for "驚異の弾道" ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetStr = "description: '発動エリア：前左中右・中中　/{0}発動条件：シュート時　/　決定力・キック力UP'";
const newStr = "description: '発動エリア：前中・中中　/　発動条件：シュート・ロングシュート時　/　決定力・キック力UP'";

if (mockCode.includes("name: '驚異の弾道'")) {
  // Replace description line near 驚異の弾道
  const idx = mockCode.indexOf("name: '驚異の弾道'");
  const descStart = mockCode.indexOf("description:", idx);
  const descEnd = mockCode.indexOf("'", descStart + 13);
  const fullDescEnd = mockCode.indexOf("'", descEnd + 1);

  const oldDescLine = mockCode.substring(descStart, fullDescEnd + 1);
  console.log('Found old description line:', oldDescLine);

  mockCode = mockCode.substring(0, descStart) + newStr + mockCode.substring(fullDescEnd + 1);

  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('✅ Updated "驚異の弾道" description in src/data/mockData.js');
} else {
  console.error('❌ Could not find "驚異の弾道" in mockData.js');
  process.exit(1);
}

// Node VM evaluation check
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const dembele = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p396');
if (dembele) {
  console.log('Verified p396 Skill:');
  console.log('  Name:', dembele.skill.name);
  console.log('  Description:', dembele.skill.description);
} else {
  console.error('❌ p396 missing in mockData.js!');
  process.exit(1);
}
