const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const lines = code.split('\n');
console.log('--- Lines 8110-8130 ---');
console.log(lines.slice(8110, 8130).join('\n'));

console.log('\n--- Lines 8185-8215 ---');
console.log(lines.slice(8185, 8215).join('\n'));

console.log('\n--- Lines 9015-9045 ---');
console.log(lines.slice(9015, 9045).join('\n'));
