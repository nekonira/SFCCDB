const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const startPos = appJs.indexOf('function CardCompareModal');
console.log('CardCompareModal at:', startPos);
console.log(appJs.slice(startPos, startPos + 10000));
