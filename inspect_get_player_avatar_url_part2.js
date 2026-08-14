const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

const lines = text.split('\n');
console.log('--- getPlayerAvatarUrl (lines 525-560) in src/app.jsx ---');
for (let i = 524; i < Math.min(lines.length, 560); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
