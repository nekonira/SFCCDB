const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

let count = 0;
// Match { name: '不適のボールキープ' ... } or { name: '不敵のボールキープ' ... }
code = code.replace(/(\{[\s]*name:\s*['"](?:不適|不敵)のボールキープ['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"][\s]*\})/g, (match, p1, p2, p3) => {
  count++;
  console.log(`Found #${count}: Old name/desc match.`);
  return `{ name: '不敵のボールキープ', rank: '金', description: '発動条件：好調　/　キープ力・ボールタッチ・敏捷性UP' }`;
});

fs.writeFileSync(mockPath, code, 'utf-8');
console.log(`Updated ${count} occurrence(s) of 金 不敵のボールキープ.`);
