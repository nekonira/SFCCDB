const fs = require('fs');
const content = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

const lines = content.split('\n');
for (let i = 570; i < Math.min(630, lines.length); i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
