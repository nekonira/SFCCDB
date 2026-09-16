const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

let pos = -1;
while ((pos = content.indexOf('PlayerCompareModal', pos + 1)) !== -1) {
  console.log('PlayerCompareModal at pos:', pos, ':', content.slice(Math.max(0, pos - 80), Math.min(content.length, pos + 250)));
}

let pos2 = -1;
while ((pos2 = content.indexOf('isCompareModalOpen', pos2 + 1)) !== -1) {
  console.log('isCompareModalOpen at pos:', pos2, ':', content.slice(Math.max(0, pos2 - 80), Math.min(content.length, pos2 + 250)));
}
