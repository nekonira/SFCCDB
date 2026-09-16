const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const pos = content.indexOf('{/* フローティング比較バー */}');
console.log('Floating bar pos:', pos);
if (pos !== -1) {
  console.log(content.slice(pos, pos + 3000));
}
