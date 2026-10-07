const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Searching for any text containing 線 or 変更 or ボーナス or 種類 or 線種 in app.jsx buttons or UI elements...');

lines.forEach((line, i) => {
  if (line.includes('線種') || line.includes('線') || line.includes('変更') || line.includes('切替')) {
    console.log(`Line ${i+1}: ${line.trim().substring(0, 160)}`);
  }
});
