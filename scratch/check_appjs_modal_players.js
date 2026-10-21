const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf-8');

const idx = appJs.indexOf('modalPlayers');
if (idx !== -1) {
  console.log(appJs.substring(idx - 50, idx + 800));
} else {
  console.log('modalPlayers not found in app.js');
}
