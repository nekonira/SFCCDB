const fs = require('fs');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const cardCode = fs.readFileSync('src/data/specialCardsData.js', 'utf-8');

function findMatches(name) {
  const reg = new RegExp('name:\\s*[\'"]' + name + '[\'"][\\s\\S]*?description:\\s*[\'"]([^\'"]+)[\'"]', 'g');
  const results = [];
  let m;
  while ((m = reg.exec(mockCode)) !== null) {
    results.push(m[0].replace(/\s+/g, ' '));
  }
  while ((m = reg.exec(cardCode)) !== null) {
    results.push('Card: ' + m[0].replace(/\s+/g, ' '));
  }
  return results;
}

console.log('絶好の楔:', findMatches('絶好の楔'));
console.log('不屈のキッカー:', findMatches('不屈のキッカー'));
console.log('長短のキック:', findMatches('長短のキック'));
