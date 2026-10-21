const fs = require('fs');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const cardCode = fs.readFileSync('src/data/specialCardsData.js', 'utf-8');

function findHalfTime(text) {
  const reg = /\{\s*name:\s*['"]([^'"]+)['"][^}]*?description:\s*['"]([^'"]*ハーフタイム[^'"]*)['"][^}]*?\}/g;
  let m;
  const results = [];
  while ((m = reg.exec(text)) !== null) {
    results.push({ name: m[1], desc: m[2] });
  }
  return results;
}

console.log('MockData:', findHalfTime(mockCode));
console.log('CardData:', findHalfTime(cardCode));
