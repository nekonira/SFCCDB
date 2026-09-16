const fs = require('fs');

const appJsx = fs.readFileSync('src/app.jsx', 'utf8');

console.log('=== Functions in app.jsx ===');
const matches = appJsx.match(/^function \w+/gm);
console.log(matches);
