const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('playerStage') || line.includes('playerRank') || line.includes('強化ランク') || line.includes('☆') || line.includes('currentPlayer')) {
    if (idx > 7500 && idx < 8600) {
      console.log((idx + 1) + ': ' + line.slice(0, 110));
    }
  }
});
