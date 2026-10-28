const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const targetStr = "{ name: '制空のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・ジャンプUP' }";
const replacementStr = "{ name: '制空のボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・ジャンプUP' }";

if (!mockCode.includes(targetStr)) {
  console.error("targetStr not found in mockData.js!");
  process.exit(1);
}

const count = (mockCode.match(new RegExp(targetStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
console.log(`Found ${count} occurrences of targetStr in mockData.js`);

mockCode = mockCode.split(targetStr).join(replacementStr);
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log("mockData.js updated successfully.");

// Update index.html cache buster
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
const newTimestamp = Date.now().toString();
indexContent = indexContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${newTimestamp}`);
fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log("index.html cache buster updated:", newTimestamp);

// Verify with vm
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const silverPlayers = sandbox.window.INITIAL_PLAYERS.filter(p => p.abilities.some(a => a.name === '制空のボールタッチ' && a.rank === '銀'));
console.log("Verified silver players with 制空のボールタッチ:");
silverPlayers.forEach(p => {
  const ab = p.abilities.find(a => a.name === '制空のボールタッチ' && a.rank === '銀');
  console.log(`- ${p.name} (${p.id}): ${ab.description}`);
});
