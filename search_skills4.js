const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const regex = /{\s*name:\s*['"]([^'"]*)['"]\s*,\s*rank:\s*['"]金['"]\s*,\s*description:\s*['"]([^'"]*)['"]\s*}/g;
let m;
while ((m = regex.exec(code)) !== null) {
  if (m[1].includes('キープ') || (m[2] && m[2].includes('キープ'))) {
    console.log(`金 | ${m[1]} | ${m[2]}`);
  }
}
