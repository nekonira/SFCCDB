const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== calculateBoostedPlayer end (L8291-L8310) ===');
for (let i = 8290; i < 8310 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
