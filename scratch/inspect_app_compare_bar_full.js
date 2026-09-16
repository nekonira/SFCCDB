const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const startPos = content.indexOf('{/* フローティング比較バー */}');
const endPos = content.indexOf('selectedPlayer && (', startPos);

console.log('Compare bar start:', startPos, 'end:', endPos);
if (startPos !== -1 && endPos !== -1) {
  console.log(content.slice(startPos, endPos));
}
