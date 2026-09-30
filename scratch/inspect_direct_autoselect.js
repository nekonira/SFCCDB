const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating handleDirectAutoSelect (L8560-L8610) ===');
for (let i = 8560; i < 8610 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
