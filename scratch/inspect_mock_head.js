const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8');
const lines = mockCode.split('\n');

console.log('First 5 lines of mockData.js:');
lines.slice(0, 5).forEach((line, i) => console.log(`${i+1}: ${line}`));
