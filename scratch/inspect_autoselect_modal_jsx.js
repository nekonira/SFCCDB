const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating AutoSelectModal inner logic and buttons (L11150-L11350) ===');
for (let i = 11150; i < 11350 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
