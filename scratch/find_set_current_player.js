const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('setCurrentPlayer(')) {
    console.log((idx + 1) + ': ' + line);
  }
});
