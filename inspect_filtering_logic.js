const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

const lines = text.split('\n');
console.log('--- Filtering Logic in src/app.jsx ---');
for (let i = 1295; i < Math.min(lines.length, 1340); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
