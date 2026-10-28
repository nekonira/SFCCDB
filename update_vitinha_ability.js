const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p409Idx = mockCode.indexOf("id: 'p409'");
if (p409Idx === -1) {
  console.error("p409 not found!");
  process.exit(1);
}

const targetStr = "{ name: '懐の深いロングパサー', rank: '銅', description: '発動条件：好調　/　ロングパス・キープ力UP' }";
const replacementStr = "{ name: '懐の深いロングパサー', rank: '銅', description: '発動条件：絶好調　/　ロングパス・キープ力UP' }";

if (!mockCode.includes(targetStr)) {
  console.error("targetStr not found in mockData.js!");
  process.exit(1);
}

mockCode = mockCode.replace(targetStr, replacementStr);
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log("mockData.js updated successfully.");

// Also update add_vitinha2026.js
const addScriptPath = path.join(__dirname, 'add_vitinha2026.js');
if (fs.existsSync(addScriptPath)) {
  let addScript = fs.readFileSync(addScriptPath, 'utf-8');
  addScript = addScript.replace(targetStr, replacementStr);
  fs.writeFileSync(addScriptPath, addScript, 'utf-8');
  console.log("add_vitinha2026.js updated successfully.");
}

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
const p409 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p409');
console.log("Verified p409 abilities:", p409.abilities);
