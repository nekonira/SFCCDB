const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lines = appJsx.split('\n');
console.log('=== Line 5620 - 5750 ===');
for (let i = 5620; i < 5750; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
