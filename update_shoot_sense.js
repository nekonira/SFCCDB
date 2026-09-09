const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

// Find all occurrences of { name: 'シュートセンス', rank: '銀', description: '...' }
let count = 0;
code = code.replace(/(\{[\s]*name:\s*['"]シュートセンス['"][\s]*,[\s]*rank:\s*['"]銀['"][\s]*,[\s]*description:\s*['"])(.*?)(['"][\s]*\})/g, (match, p1, p2, p3) => {
  count++;
  console.log(`Found #${count}: Old description = "${p2}"`);
  return p1 + '発動条件：好調　/　決定力・キック力UP' + p3;
});

fs.writeFileSync(mockPath, code, 'utf-8');
console.log(`Updated ${count} occurrence(s) of 銀 シュートセンス description to 『発動条件：好調　/　決定力・キック力UP』.`);
