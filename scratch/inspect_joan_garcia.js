const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating ジョアン・ガルシア in mockData.js (L5030-L5090) ===');
for (let i = 5029; i < 5090 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
