const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const text = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Debugging Player Objects One by One ---');

const playerRegex = /\{\s*id:\s*['"](p\d+)['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/g;

let match;
let validCount = 0;
const invalidIds = [];

while ((match = playerRegex.exec(text)) !== null) {
  const block = match[0];
  const pId = /id:\s*['"](p\d+)['"]/.exec(block)[1];
  try {
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext('const p = ' + block, sandbox);
    validCount++;
  } catch (err) {
    console.error(`Syntax error in player ${pId}:`, err.message);
    invalidIds.push(pId);
  }
}

console.log(`\nValid player blocks: ${validCount} / ${validCount + invalidIds.length}`);
if (invalidIds.length > 0) {
  console.log('Invalid player IDs:', invalidIds.join(', '));
} else {
  console.log('ALL PLAYER BLOCKS ARE INDIVIDUALLY VALID!');
}
