const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const pos = appJs.indexOf('const calculateBoostedPlayer=useCallback');
console.log('calculateBoostedPlayer useCallback at pos:', pos);
if (pos !== -1) {
  console.log(appJs.slice(Math.max(0, pos - 200), Math.min(appJs.length, pos + 2500)));
}
