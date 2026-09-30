const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating all occurrences of subTab rendering in app.jsx ===');
lines.forEach((line, idx) => {
  if (line.includes("subTab ===") || line.includes("subTab == '")) {
    console.log(`L${idx+1}: ${line}`);
  }
});
