const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Inspecting Sort Logic and Play Style Sorting in src/app.jsx ---');

const lines = text.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('sort') || line.includes('Sort') || line.includes('playStyle') || line.includes('プレースタイル')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
