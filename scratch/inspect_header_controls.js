const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Header Controls in TrainingSimulatorTab (L9040-L9070) ===');
for (let i = 9040; i < 9070 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
