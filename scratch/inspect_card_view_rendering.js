const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const tsPos = content.indexOf('function TrainingSimulatorTab');
const tsCode = content.slice(tsPos, content.indexOf('function CardCompareModal', tsPos));

let pos = 0;
while ((pos = tsCode.indexOf('filteredCards', pos + 1)) !== -1) {
  console.log('filteredCards at offset:', pos, ':', tsCode.slice(Math.max(0, pos - 40), Math.min(tsCode.length, pos + 120)));
}
