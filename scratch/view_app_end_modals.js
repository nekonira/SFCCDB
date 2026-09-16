const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');
const lines = content.split('\n');
console.log('Total lines in app.jsx:', lines.length);
for (let i = Math.max(0, lines.length - 80); i < lines.length; i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
