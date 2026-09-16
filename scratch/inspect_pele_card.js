const fs = require('fs');
const content = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('キング・オブ・サッカー') || line.includes('ペレ')) {
    console.log((idx + 1) + ': ' + line);
  }
});
