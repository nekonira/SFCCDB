const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const regex = /(isSelecao|isLaRoja|brazil|spain)/gi;
const matches = [...code.matchAll(regex)];

console.log('Total matches:', matches.length);

// Group by line numbers
const lines = code.split('\n');
lines.forEach((line, lineIdx) => {
  if (line.includes('isSelecao') || line.includes('isLaRoja') || line.includes('brazil') || line.includes('spain')) {
    console.log(`L${lineIdx+1}:`, line.trim());
  }
});
