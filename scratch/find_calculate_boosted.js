const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

let pos = -1;
while ((pos = appJs.indexOf('calculateBoostedPlayer', pos + 1)) !== -1) {
  console.log('calculateBoostedPlayer at pos:', pos, ':', appJs.slice(Math.max(0, pos - 50), Math.min(appJs.length, pos + 120)));
}
