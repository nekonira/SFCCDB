const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING AKINORI ICHIKAWA (p368) NAME ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p368Idx = mockCode.indexOf("id: 'p368'");
if (p368Idx !== -1) {
  const avatarIdx = mockCode.indexOf("avatarUrl:", p368Idx);
  const endIdx = mockCode.indexOf("}", avatarIdx);
  let p368Str = mockCode.substring(p368Idx, endIdx);
  p368Str = p368Str.replace("name: '市川暉'", "name: '市川暉記'");
  mockCode = mockCode.substring(0, p368Idx) + p368Str + mockCode.substring(endIdx);
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('1. mockData.js updated with name: 市川暉記.');
}

const addScriptPath = path.join(__dirname, 'add_ichikawaakinori2026.js');
if (fs.existsSync(addScriptPath)) {
  let scriptCode = fs.readFileSync(addScriptPath, 'utf-8');
  scriptCode = scriptCode.replace("name: '市川暉'", "name: '市川暉記'");
  fs.writeFileSync(addScriptPath, scriptCode, 'utf-8');
  console.log('2. add_ichikawaakinori2026.js updated.');
}

// Verification
const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(finalMockCode, sandbox);

const p368 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p368');
console.log('3. Verification for p368:');
console.log(JSON.stringify(p368 ? { name: p368.name, readingName: p368.readingName } : null, null, 2));

console.log('=== NAME UPDATE COMPLETE! ===');
