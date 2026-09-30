const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating AutoSelectModal optimizedSlots calculation (L11050-L11210) ===');
for (let i = 11050; i < 11210 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
