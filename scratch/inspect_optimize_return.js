const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const pos = appJs.indexOf('function optimizeSpecialCardSlots');
console.log(appJs.slice(pos, pos + 5000));
