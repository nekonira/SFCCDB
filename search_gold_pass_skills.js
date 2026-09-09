const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const regex = /skill:\s*{\s*name:\s*['"]([^'"]*)['"]\s*,\s*rank:\s*['"]金['"]\s*,\s*description:\s*['"]([^'"]*)['"]\s*}/g;
let m;
while ((m = regex.exec(code)) !== null) {
  if (m[2].includes('パス')) {
    console.log(`金スキル | ${m[1]} | ${m[2]}`);
  }
}
