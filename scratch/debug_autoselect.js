const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

// Print around handleDirectAutoSelect
const pos1 = appJs.indexOf('const handleDirectAutoSelect');
console.log('=== handleDirectAutoSelect definition ===');
console.log(appJs.slice(pos1, pos1 + 1500));

// Print around optimizeSpecialCardSlots function
const pos2 = appJs.indexOf('function optimizeSpecialCardSlots');
console.log('\n=== optimizeSpecialCardSlots definition ===');
console.log(appJs.slice(pos2, pos2 + 2500));
