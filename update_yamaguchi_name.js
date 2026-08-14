const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Yamaguchi Hotaru name in mockData.js ---');

const targetStr = "id: 'p51',\n    name: '山口蛍',";
const replacementStr = "id: 'p51',\n    name: '山口蛍(2026)',";

if (!code.includes(targetStr)) {
  // Try alternative whitespace/formatting
  console.log("targetStr exact match not found, looking for id: 'p51'");
  const p51Idx = code.indexOf("id: 'p51'");
  console.log("p51 snippet:", code.substring(p51Idx, p51Idx + 60));
  code = code.replace(/id:\s*'p51',\s*name:\s*'山口蛍'/, "id: 'p51',\n    name: '山口蛍(2026)'");
} else {
  code = code.replace(targetStr, replacementStr);
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const p51 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p51');
console.log('p51 updated name:', p51 ? p51.name : 'MISSING');
