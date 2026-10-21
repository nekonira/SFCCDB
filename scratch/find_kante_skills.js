const fs = require('fs');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const cardCode = fs.readFileSync('src/data/specialCardsData.js', 'utf-8');

function findItem(name) {
  const reg = new RegExp('name:\\s*[\'"]' + name + '[\'"][\\s\\S]*?description:\\s*[\'"]([^\'"]+)[\'"]');
  const m1 = mockCode.match(reg);
  if (m1) return m1[1];
  const m2 = cardCode.match(reg);
  if (m2) return m2[1];
  return null;
}

console.log('奪還:', findItem('奪還'));
console.log('不死鳥のタックル:', findItem('不死鳥のタックル'));
console.log('ピッチの分断者:', findItem('ピッチの分断者'));
console.log('リスクヘッジパサー:', findItem('リスクヘッジパサー'));
