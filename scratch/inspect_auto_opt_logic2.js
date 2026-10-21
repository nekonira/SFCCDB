const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lines = appJsx.split('\n');
console.log('=== Line 5480 - 5620 ===');
for (let i = 5480; i < 5620; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
