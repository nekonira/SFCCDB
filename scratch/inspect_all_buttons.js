const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Checking all buttons in TrainingSimulatorTab (L8082-L10370) ===');

let inSimTab = false;
for (let i = 8081; i < 10370 && i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('<button')) {
    let btnCode = line;
    let j = i;
    while (!btnCode.includes('>') && j < lines.length - 1) {
      j++;
      btnCode += ' ' + lines[j].trim();
    }
    console.log(`L${i+1}: ${btnCode.replace(/\s+/g, ' ').substring(0, 150)}`);
  }
}
