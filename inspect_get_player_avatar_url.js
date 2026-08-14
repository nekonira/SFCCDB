const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

const lines = text.split('\n');
console.log('--- getPlayerAvatarUrl in src/app.jsx ---');
for (let i = 480; i < Math.min(lines.length, 525); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
