const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Button bar in TrainingSimulatorTab (L8940-L9130) ===');
for (let i = 8940; i < 9130 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
