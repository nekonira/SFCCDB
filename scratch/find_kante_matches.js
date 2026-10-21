const fs = require('fs');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');

function findMatches(name) {
  const reg = new RegExp('name:\\s*[\'"]' + name + '[\'"][\\s\\S]*?description:\\s*[\'"]([^\'"]+)[\'"]', 'g');
  const results = [];
  let m;
  while ((m = reg.exec(mockCode)) !== null) {
    results.push(m[0].replace(/\s+/g, ' '));
  }
  return results;
}

console.log('ピッチの分断者:', findMatches('ピッチの分断者'));
console.log('リスクヘッジパサー:', findMatches('リスクヘッジパサー'));
console.log('奪還:', findMatches('奪還'));
