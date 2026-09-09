const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

['不敵', '不適', '至純', '精妙', '生成'].forEach(k => {
  const matches = [];
  const regex = new RegExp(`{\\s*name:\\s*['"][^'"]*${k}[^'"]*['"],\\s*rank:[^}]*}`, 'g');
  let m;
  while ((m = regex.exec(code)) !== null) {
    matches.push(m[0]);
  }
  console.log(`=== Keyword: ${k} (${matches.length} matches) ===`);
  matches.forEach(m => console.log(m));
});
