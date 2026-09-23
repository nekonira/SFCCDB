const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cody Gakpo (p391) PlayStyle to サイドアタッカーLW ---');

const p391Idx = code.indexOf("id: 'p391'");
if (p391Idx === -1) {
  console.error("ERROR: id 'p391' not found in mockData.js");
  process.exit(1);
}

const p391EndIdx = code.indexOf("avatarUrl:", p391Idx);
const p391BlockEnd = code.indexOf("}", p391EndIdx);

let p391Block = code.substring(p391Idx, p391BlockEnd);

p391Block = p391Block.replace(
  /playStyle:\s*['"][^'"]+['"]/,
  "playStyle: 'サイドアタッカーLW'"
);

code = code.substring(0, p391Idx) + p391Block + code.substring(p391BlockEnd);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully updated p391 in mockData.js');

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const updatedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p391');
console.log('Verified p391 PlayStyle:', updatedPlayer.playStyle);
