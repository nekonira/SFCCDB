const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating modal section in TrainingSimulatorTab (L10330-L10370) ===');
for (let i = 10330; i < 10370 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
