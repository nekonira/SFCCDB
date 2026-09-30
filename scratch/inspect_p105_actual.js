const fs = require('fs');
const path = require('path');

const mockCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8');
const lines = mockCode.split('\n');

console.log('Lines 5032 to 5082 of mockData.js (p105):');
lines.slice(5031, 5082).forEach((line, i) => console.log(`${5032 + i}: ${line}`));
