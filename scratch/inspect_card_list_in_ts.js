const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const tabPos = content.indexOf('function TrainingSimulatorTab');
const tabCode = content.slice(tabPos, content.indexOf('function CardCompareModal', tabPos));

console.log('TrainingSimulatorTab length:', tabCode.length);

// Search for officialCards in tabCode
let pos = 0;
while ((pos = tabCode.indexOf('officialCards', pos + 1)) !== -1) {
  console.log('At pos:', pos, ':', tabCode.slice(Math.max(0, pos - 40), Math.min(tabCode.length, pos + 120)));
}
