const fs = require('fs');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');

function findSkill(name) {
  const reg = new RegExp('name:\\s*[\'"]' + name + '[\'"][\\s\\S]*?description:\\s*[\'"]([^\'"]+)[\'"]');
  const m = mockCode.match(reg);
  return m ? m[1] : null;
}

function findAbility(name) {
  const reg = new RegExp('name:\\s*[\'"]' + name + '[\'"][\\s\\S]*?description:\\s*[\'"]([^\'"]+)[\'"]');
  const m = mockCode.match(reg);
  return m ? m[1] : null;
}

console.log('奮戦のタックル:', findSkill('奮戦のタックル'));
console.log('ボールハンター:', findAbility('ボールハンター'));
console.log('上空の寸断者:', findAbility('上空の寸断者'));
