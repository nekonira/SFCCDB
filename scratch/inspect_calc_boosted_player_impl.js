const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== calculateBoostedPlayer implementation (L8185-L8260) ===');
for (let i = 8184; i < 8260 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
