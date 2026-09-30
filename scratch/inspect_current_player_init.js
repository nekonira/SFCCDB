const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating currentPlayer in TrainingSimulatorTab (L8080-L8150) ===');
for (let i = 8080; i < 8150 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
