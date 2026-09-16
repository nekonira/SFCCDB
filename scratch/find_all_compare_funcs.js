const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const funcs = [
  'PlayerCompareModal',
  'CardCompareModal',
  'PlayerDetailModal',
  'getCardStatData',
  'handleEnableAllBonuses',
  'isBonusActive'
];

funcs.forEach(fn => {
  let pos = -1;
  let count = 0;
  while ((pos = appJs.indexOf(fn, pos + 1)) !== -1) {
    count++;
    console.log(`Symbol "${fn}" at index ${pos}:`, appJs.slice(Math.max(0, pos - 60), Math.min(appJs.length, pos + 120)));
  }
  console.log(`Total "${fn}": ${count}\n`);
});
