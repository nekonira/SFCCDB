const fs = require('fs');
const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');

const reg = /\{\s*name:\s*['"]([^'"]+)['"],\s*rank:\s*['"]金['"],\s*description:\s*['"]([^'"]+)['"]\s*\}/g;
let match;
const unique = new Map();
while ((match = reg.exec(mockCode)) !== null) {
  unique.set(match[1], match[2]);
}

console.log('Total unique Gold Abilities:', unique.size);
for (const [name, desc] of unique.entries()) {
  console.log(name, '->', desc);
}
