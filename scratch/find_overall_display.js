const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('推定総合') || line.includes('boostedOverall') || line.includes('総合値') || line.includes('特練装着後')) {
    if (idx > 7500 && idx < 8700) {
      console.log((idx + 1) + ': ' + line.slice(0, 110));
    }
  }
});
