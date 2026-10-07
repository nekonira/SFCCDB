const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

console.log('Searching app.jsx for 6-slot simulator / line / connection / button click...');

const lines = jsxContent.split('\n');
lines.forEach((line, i) => {
  if (line.includes('線種') || line.includes('6スロット') || line.includes('ボーナス線') || line.includes('ライン') || line.includes('line') || line.includes('Line')) {
    if (line.includes('button') || line.includes('onClick') || line.includes('set') || line.includes('Slot') || line.includes('slot') || line.includes('Bonus') || line.includes('bonus')) {
      console.log(`Line ${i+1}: ${line.trim().substring(0, 140)}`);
    }
  }
});
