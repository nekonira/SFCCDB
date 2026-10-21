const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf-8');

const idx = appJs.indexOf('PLAYER_IMAGE_MAP');
if (idx !== -1) {
  console.log(appJs.substring(idx - 50, idx + 600));
}

const lastIdx = appJs.lastIndexOf('p402');
if (lastIdx !== -1) {
  console.log('Around p402 in app.js:');
  console.log(appJs.substring(lastIdx - 100, lastIdx + 150));
}
