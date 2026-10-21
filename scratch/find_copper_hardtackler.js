const fs = require('fs');
const cardCode = fs.readFileSync('src/data/specialCardsData.js', 'utf-8');

function findMatches(name) {
  const reg = new RegExp('name:\\s*[\'"]' + name + '[\'"][\\s\\S]*?description:\\s*[\'"]([^\'"]+)[\'"]', 'g');
  const results = [];
  let m;
  while ((m = reg.exec(cardCode)) !== null) {
    results.push(m[0].replace(/\s+/g, ' '));
  }
  return results;
}

console.log('Cards ハードタックラー:', findMatches('ハードタックラー'));
