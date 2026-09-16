const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('calculateBoostedPlayer') || line.includes('bonusMultiplier')) {
    if (idx > 7500 && idx < 8350) {
      console.log((idx + 1) + ': ' + line.slice(0, 110));
    }
  }
});
