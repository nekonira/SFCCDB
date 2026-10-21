const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf-8');

const idx = appJs.indexOf('getPlayerAvatarUrl');
if (idx !== -1) {
  console.log(appJs.substring(idx, idx + 1200));
} else {
  console.log('getPlayerAvatarUrl not found in app.js');
}
