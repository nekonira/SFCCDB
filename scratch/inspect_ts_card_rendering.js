const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const pos = content.indexOf('filteredCards.map');
console.log('filteredCards.map at pos:', pos);
if (pos !== -1) {
  console.log(content.slice(Math.max(0, pos - 200), Math.min(content.length, pos + 2500)));
}
