const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING KEISUKE HONDA (p07) POSITIONS ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p07Idx = mockCode.indexOf("id: 'p07'");
if (p07Idx !== -1) {
  const avatarIdx = mockCode.indexOf("avatarUrl:", p07Idx);
  const endIdx = mockCode.indexOf("}", avatarIdx);
  let p07Str = mockCode.substring(p07Idx, endIdx);
  p07Str = p07Str.replace("subPositions: []", "subPositions: ['AM']");
  mockCode = mockCode.substring(0, p07Idx) + p07Str + mockCode.substring(endIdx);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js updated with subPositions: [\'AM\'].');
} else {
  console.error('Could not find p07 in mockData.js');
  process.exit(1);
}

// Verification
const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(finalMockCode, sandbox);

const p07 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p07');
console.log('2. Verification for 本田圭佑:');
console.log(JSON.stringify(p07 ? { name: p07.name, mainPosition: p07.mainPosition, subPositions: p07.subPositions } : null, null, 2));

console.log('=== HONDA POSITION UPDATE COMPLETE! ===');
