const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const pos = content.indexOf('function CardCompareModal');
if (pos !== -1) {
  console.log(content.slice(pos, pos + 2500));
}
