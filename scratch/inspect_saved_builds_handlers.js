const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating savedBuilds handlers (L8480-L8550) ===');
for (let i = 8479; i < 8550 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
