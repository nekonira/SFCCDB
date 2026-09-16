const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const startPos = appJs.indexOf('function CardCompareModal');
const endPos = appJs.indexOf('function App', startPos);

console.log('CardCompareModal start:', startPos, 'end:', endPos);
if (startPos !== -1 && endPos !== -1) {
  const code = appJs.slice(startPos, endPos);
  fs.writeFileSync('scratch/CardCompareModal_full.js', code);
  console.log('Saved CardCompareModal code to scratch/CardCompareModal_full.js. Length:', code.length);
}
