const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const lines = appJsx.split('\n');
console.log('=== Line 6020 - 6140 ===');
for (let i = 6010; i < 6140; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
