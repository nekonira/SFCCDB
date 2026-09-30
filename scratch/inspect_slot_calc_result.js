const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating slotCalcResult (L8875-L8890) ===');
for (let i = 8874; i < 8890 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
