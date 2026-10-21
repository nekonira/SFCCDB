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

console.log('熟練のインターセプト:', findMatches('熟練のインターセプト'));
console.log('上空の寸断者:', findMatches('上空の寸断者'));
console.log('ランニングマーカー:', findMatches('ランニングマーカー'));
console.log('ハードタックラー:', findMatches('ハードタックラー'));
