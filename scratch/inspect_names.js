const fs = require('fs');
const path = require('path');
const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const regex = /id:\s*'(p3[3-8]\d)',\s*name:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(code)) !== null) {
  console.log(`${match[1]}: ${match[2]}`);
}
