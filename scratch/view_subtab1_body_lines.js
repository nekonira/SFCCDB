const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
for (let i = 8550; i < Math.min(8640, lines.length); i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
