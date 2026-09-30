const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating card list and table rendering in TrainingSimulatorTab (L8350-L8450) ===');
for (let i = 8350; i < 8450 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
