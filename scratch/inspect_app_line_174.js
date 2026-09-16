const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const lines = appJs.split('\n');
console.log('Total lines in app.js:', lines.length);

for (let i = 170; i < Math.min(lines.length, 180); i++) {
  console.log(`Line ${i + 1}: length ${lines[i].length}`, lines[i].slice(0, 300));
}
