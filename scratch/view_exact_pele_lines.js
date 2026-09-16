const fs = require('fs');
const content = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

const lines = content.split('\n');
for (let i = 590; i < Math.min(650, lines.length); i++) {
  console.log((i + 1) + ': ' + lines[i]);
}
