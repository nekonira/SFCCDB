const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating end of AutoSelectModal (L11650-L11675) ===');
for (let i = 11650; i < lines.length && i < 11675; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
