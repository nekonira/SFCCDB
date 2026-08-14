const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

const lines = text.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('POS_ORDER')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
