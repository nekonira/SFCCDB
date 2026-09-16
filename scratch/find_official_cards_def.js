const fs = require('fs');

const files = ['src/data/mockData.js', 'src/data/officialCards.js', 'src/data/cardData.js', 'index.html'];
files.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    if (text.includes('OFFICIAL_SPECIAL_CARDS')) {
      console.log(`Found OFFICIAL_SPECIAL_CARDS in ${f}`);
    }
  }
});
