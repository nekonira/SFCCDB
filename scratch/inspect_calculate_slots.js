const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');
const lines = content.split('\n');
for (let i = 8045; i < Math.min(8140, lines.length); i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
