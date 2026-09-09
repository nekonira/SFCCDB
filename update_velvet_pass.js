const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

let count = 0;
// Match { name: 'ベルベットパス', rank: '金', description: '...' }
code = code.replace(/(\{[\s]*name:\s*['"]ベルベットパス['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"][\s]*\})/g, (match, p1, p2, p3) => {
  count++;
  console.log(`Found #${count}: Old description = "${p2}"`);
  return p1 + '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' + p3;
});

fs.writeFileSync(mockPath, code, 'utf-8');
console.log(`Updated ${count} occurrence(s) of 金 ベルベットパス description.`);
