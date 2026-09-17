const fs = require('fs');

const content = fs.readFileSync('./src/data/specialCardsData.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('card_calhanoglu') || line.includes('card_parejo') || line.includes('card_kamada_south_london') || line.includes('card_modric_matured') || line.includes('card_rice_ruler')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
