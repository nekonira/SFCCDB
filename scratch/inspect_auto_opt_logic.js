const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lines = appJsx.split('\n');
console.log('=== Line 5350 - 5480 ===');
for (let i = 5350; i < 5480; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
