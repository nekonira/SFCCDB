const fs = require('fs');
const path = require('path');

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');

console.log('Searching setSubTab in app.js...');
const matches = [];
let idx = appJsCode.indexOf('setSubTab');
while (idx !== -1) {
  console.log('Found:', appJsCode.substring(idx, idx + 40));
  idx = appJsCode.indexOf('setSubTab', idx + 1);
}
