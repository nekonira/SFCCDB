const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating calculateBoostedPlayer definition and calls ===');
lines.forEach((line, idx) => {
  if (line.includes('calculateBoostedPlayer') || line.includes('CONDITION_MULTIPLIERS')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
