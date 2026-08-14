const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

const lines = text.split('\n');
console.log('--- Filter Dropdowns in src/app.jsx ---');
for (let i = 1580; i < Math.min(lines.length, 1635); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
