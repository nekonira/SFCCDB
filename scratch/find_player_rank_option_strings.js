const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('選手ランク') || (line.includes('option value="☆') && line.includes('凸'))) {
    console.log((idx + 1) + ': ' + line);
  }
});
