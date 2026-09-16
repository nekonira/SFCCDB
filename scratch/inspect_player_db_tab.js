const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const dbPos = content.indexOf('function PlayerDBTab');
const dbCode = content.slice(dbPos, content.indexOf('function PlayerCard', dbPos));

console.log('PlayerDBTab length:', dbCode.length);

let pos = 0;
while ((pos = dbCode.indexOf('toggleCompare', pos + 1)) !== -1) {
  console.log('toggleCompare at:', pos, ':', dbCode.slice(Math.max(0, pos - 40), Math.min(dbCode.length, pos + 120)));
}

let pos2 = 0;
while ((pos2 = dbCode.indexOf('setIsCompareModalOpen', pos2 + 1)) !== -1) {
  console.log('setIsCompareModalOpen at:', pos2, ':', dbCode.slice(Math.max(0, pos2 - 40), Math.min(dbCode.length, pos2 + 120)));
}
