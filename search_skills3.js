const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const regex = /{\s*name:\s*['"]([^'"]*)['"]\s*,\s*rank:\s*['"]([^'"]*)['"]\s*,\s*description:\s*['"]([^'"]*)['"]\s*}/g;
let m;
while ((m = regex.exec(code)) !== null) {
  const name = m[1];
  const rank = m[2];
  const desc = m[3];
  if (name.includes('キープ') || name.includes('突破')) {
    console.log(`${rank} | ${name} | ${desc}`);
  }
}
