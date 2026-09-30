const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== calculateBoostedPlayer useCallback dependency array (L8265-L8290) ===');
for (let i = 8265; i < 8290 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
