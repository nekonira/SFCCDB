const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');
const lines = content.split('\n');
for (let i = 7800; i < Math.min(7860, lines.length); i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
