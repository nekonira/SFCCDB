const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const regex = /skill:\s*{\s*name:\s*['"]([^'"]*)['"]\s*,\s*rank:\s*['"]([^'"]*)['"]\s*,\s*description:\s*['"]([^'"]*)['"]\s*}/g;
let m;
while ((m = regex.exec(code)) !== null) {
  if (m[1].includes('パス') || m[3].includes('ショートパス・ロングパス')) {
    console.log(`${m[2]}スキル | ${m[1]} | ${m[3]}`);
  }
}
