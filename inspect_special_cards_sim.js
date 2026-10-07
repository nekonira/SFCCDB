const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsPath = path.join(__dirname, 'src', 'app.js');

console.log('jsx exists:', fs.existsSync(jsxPath));
console.log('js exists:', fs.existsSync(jsPath));

let jsContent = fs.readFileSync(jsPath, 'utf-8');
console.log('jsContent length:', jsContent.length);

// Find occurrences of 6, slot, simulator, lineType, etc.
const lines = jsContent.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('6') && (line.includes('スロット') || line.includes('slot') || line.includes('Slot') || line.includes('線種') || line.includes('ライン') || line.includes('ボーナス'))) {
    console.log(`Line ${idx+1}: ${line.substring(0, 150)}`);
  }
});
