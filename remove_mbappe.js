const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== REMOVING KYLIAN MBAPPÉ (p04) ===');

// 1. Remove p04 from mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p04Start = mockCode.indexOf("id: 'p04'");
const altP04Start = mockCode.indexOf('"id": "p04"');
const targetStart = p04Start !== -1 ? p04Start : altP04Start;

if (targetStart !== -1) {
  // Find opening brace `{` before id: 'p04'
  const braceStart = mockCode.lastIndexOf('{', targetStart);
  // Find closing brace `}` after p04 object
  const p04AvatarIdx = mockCode.indexOf('avatarUrl:', targetStart);
  const braceEnd = mockCode.indexOf('}', p04AvatarIdx);

  // Check if comma follows
  let removeEnd = braceEnd + 1;
  if (mockCode.substring(removeEnd).trim().startsWith(',')) {
    removeEnd = mockCode.indexOf(',', braceEnd) + 1;
  }

  mockCode = mockCode.substring(0, braceStart) + mockCode.substring(removeEnd);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. Removed p04 (キリアン・エムバペ) from mockData.js.');
} else {
  console.error('Could not find p04 in mockData.js!');
}

// 2. Remove p04 from PLAYER_IMAGE_MAP in app.js and app.jsx
function removeP04FromMap(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (code.includes('"p04": "HAALAND_IMAGE",\n')) {
    code = code.replace('"p04": "HAALAND_IMAGE",\n', '');
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`2. Removed p04 mapping from ${fileName}.`);
  } else if (code.includes('"p04": "HAALAND_IMAGE"')) {
    code = code.replace('"p04": "HAALAND_IMAGE"', '');
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`2. Removed p04 mapping from ${fileName}.`);
  }
}

removeP04FromMap('app.js');
removeP04FromMap('app.jsx');

// 3. Verification
const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

const updatedMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(updatedMockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const foundMbappe = players.find(p => p.id === 'p04' || (p.name && p.name.includes('エムバペ')));

console.log('3. Verification results:');
console.log(`   Total remaining players: ${players.length}`);
console.log(`   Kylian Mbappé in database: ${foundMbappe ? 'STILL PRESENT' : 'SUCCESSFULLY DELETED'}`);

if (!foundMbappe) {
  console.log('🎉 KYLIAN MBAPPÉ SUCCESSFULLY REMOVED FROM DATABASE!');
} else {
  console.error('❌ Deletion failed!');
  process.exit(1);
}
