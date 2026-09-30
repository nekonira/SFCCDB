const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating AutoSelectModal apply button and pickers (L11350-L11500) ===');
for (let i = 11350; i < 11500 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
