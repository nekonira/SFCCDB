const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Inspecting all <img> tags in src/app.jsx ---');

const lines = text.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('<img')) {
    console.log(`Line ${idx + 1}:`);
    for (let i = Math.max(0, idx - 2); i <= Math.min(lines.length - 1, idx + 5); i++) {
      console.log(`  ${i + 1}: ${lines[i]}`);
    }
    console.log('-----------------------------------');
  }
});
