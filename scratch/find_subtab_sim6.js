const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('特練カードシミュレーター') || line.includes('subTab === \'sim6\'') || line.includes('6スロット')) {
    if (idx > 7000 && idx < 9000) {
      console.log((idx + 1) + ': ' + line.slice(0, 100));
    }
  }
});
