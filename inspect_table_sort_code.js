const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

const lines = text.split('\n');

console.log('--- LINES 1365 to 1450 (Sort Switch Case) ---');
for (let i = 1364; i < Math.min(lines.length, 1450); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

console.log('\n--- LINES 1560 to 1670 (Table Header & Sort Select Options) ---');
for (let i = 1559; i < Math.min(lines.length, 1670); i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
