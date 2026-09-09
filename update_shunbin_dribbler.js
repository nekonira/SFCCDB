const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

let count = 0;
// Match { name: '俊敏なドリブラー', rank: '銅', description: '...' }
code = code.replace(/(\{[\s]*name:\s*['"]俊敏なドリブラー['"][\s]*,[\s]*rank:\s*['"]銅['"][\s]*,[\s]*description:\s*['"])(.*?)(['"][\s]*\})/g, (match, p1, p2, p3) => {
  count++;
  console.log(`Found #${count}: Old description = "${p2}"`);
  return p1 + '発動条件：絶好調　/　突破力・敏捷性UP' + p3;
});

fs.writeFileSync(mockPath, code, 'utf-8');
console.log(`Updated ${count} occurrence(s) of 銅 俊敏なドリブラー description to 『発動条件：絶好調　/　突破力・敏捷性UP』.`);
