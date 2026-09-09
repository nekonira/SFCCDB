const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const matches = code.match(/\{[^}]*name:[^}]*配布[^}]*\}/g);
console.log('Found 配布 players count:', matches ? matches.length : 0);
if (matches) {
  matches.slice(0, 3).forEach(m => console.log(m));
}
