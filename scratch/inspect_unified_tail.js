const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lines = appJsx.split('\n');
console.log('=== Line 5800 - 5850 ===');
for (let i = 5800; i < 5850; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
