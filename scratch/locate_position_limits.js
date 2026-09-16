const fs = require('fs');

const appJs = fs.readFileSync('src/app.js', 'utf8');

let pos = 0;
while ((pos = appJs.indexOf('POSITION_LIMIT_ADDITIONS', pos)) !== -1) {
  console.log('Found POSITION_LIMIT_ADDITIONS at pos', pos, ':', appJs.slice(Math.max(0, pos - 50), Math.min(appJs.length, pos + 200)));
  pos += 'POSITION_LIMIT_ADDITIONS'.length;
}
