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

console.log('変速ギア:', findItem('変速ギア'));
console.log('変幻自在のドリブラー:', findItem('変幻自在のドリブラー'));
console.log('快速のロングパサー:', findItem('快速のロングパサー'));
console.log('俊敏なパサー:', findItem('俊敏なパサー'));
