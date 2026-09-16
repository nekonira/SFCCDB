const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('CardCompareModal') || line.includes('TeamBuilderModal') || line.includes('showVisualPicker')) {
    console.log((idx + 1) + ': ' + line);
  }
});
