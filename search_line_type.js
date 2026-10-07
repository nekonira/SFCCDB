const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Searching app.jsx for line / connection / wire / 6スロット / 線種 / 線 / bonus line...');

lines.forEach((line, i) => {
  if (line.includes('線') || line.includes('ライン') || line.includes('lineType') || line.includes('LineType') || line.includes('line_type')) {
    console.log(`Line ${i+1}: ${line.trim().substring(0, 140)}`);
  }
});
