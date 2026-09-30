const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Checking all occurrences of setIsAutoSelectModalOpen ===');
lines.forEach((line, idx) => {
  if (line.includes('setIsAutoSelectModalOpen')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
