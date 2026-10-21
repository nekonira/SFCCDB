const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lines = appJsx.split('\n');
console.log('=== Line 5750 - 5810 ===');
for (let i = 5750; i < 5810; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
