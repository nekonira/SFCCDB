const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');
let code = fs.readFileSync(appJsxPath, 'utf-8');

console.log('Testing overflowPenalty fix...');
const targetStr = `      // Overflow penalty: wasted stats past limit ceiling
      if (rawVal > lim.maxLimit) {
        overflowPenalty += (rawVal - lim.maxLimit) * 5.0;
      }`;

if (code.includes(targetStr)) {
  console.log('✅ Target string found in app.jsx!');
} else {
  console.log('❌ Target string NOT found, checking snippet around line 1828...');
  const lines = code.split('\n');
  console.log(lines.slice(1820, 1835).join('\n'));
}
