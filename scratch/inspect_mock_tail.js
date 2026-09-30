const fs = require('fs');
const path = require('path');

const mockCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8');
const lines = mockCode.split('\n');

console.log('Last 25 lines of mockData.js:');
lines.slice(-25).forEach((line, i) => console.log(`${lines.length - 25 + i + 1}: ${line}`));
