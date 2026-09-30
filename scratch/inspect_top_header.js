const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Top header in TrainingSimulatorTab (L9010-L9065) ===');
for (let i = 9010; i < 9065 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
