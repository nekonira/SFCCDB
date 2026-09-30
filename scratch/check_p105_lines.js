const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');
const lines = mockCode.split('\n');

console.log('Lines 5030 to 5090 of mockData.js:');
for (let i = 5029; i < 5090 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
