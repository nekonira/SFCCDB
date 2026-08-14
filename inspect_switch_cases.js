const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

const lines = text.split('\n');

console.log('--- LINES 1370 to 1435 (Switch cases in sort function) ---');
for (let i = 1369; i < Math.min(lines.length, 1435); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
