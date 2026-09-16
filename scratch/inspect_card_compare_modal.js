const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const pos = appJs.indexOf('function CardCompareModal');
console.log('CardCompareModal pos:', pos);
if (pos !== -1) {
  const code = appJs.slice(pos, pos + 3000);
  console.log(code);
}
