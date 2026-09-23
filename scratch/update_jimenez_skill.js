const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Raúl Jiménez (p390) Skill Rank to Silver ---');

const p390Idx = code.indexOf("id: 'p390'");
if (p390Idx === -1) {
  console.error("ERROR: id 'p390' not found in mockData.js");
  process.exit(1);
}

const p390EndIdx = code.indexOf("avatarUrl:", p390Idx);
const p390BlockEnd = code.indexOf("}", p390EndIdx);

let p390Block = code.substring(p390Idx, p390BlockEnd);

p390Block = p390Block.replace(
  /skill:\s*\{\s*name:\s*['"]コントロールショット['"],\s*rank:\s*['"][^'"]+['"]/,
  "skill: {\n      name: 'コントロールショット',\n      rank: '銀'"
);

code = code.substring(0, p390Idx) + p390Block + code.substring(p390BlockEnd);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully updated p390 in mockData.js');

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const updatedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p390');
console.log('Verified p390 Skill:', updatedPlayer.skill);
