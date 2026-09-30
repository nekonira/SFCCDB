const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const lines = code.split('\n');

console.log('--- Player Selection Bar & State (L8980-L9050) ---');
console.log(lines.slice(8975, 9050).join('\n'));

console.log('\n--- Calculation Logic for 6 slots (L8190-L8260) ---');
console.log(lines.slice(8185, 8260).join('\n'));
