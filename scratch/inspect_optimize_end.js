const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const pos = appJs.indexOf('fillSlots(requir');
console.log(appJs.slice(pos, pos + 1000));
