const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

['鋭角的なタックル', 'エアバトラー', 'ピッチの分断者'].forEach(k => {
  const matches = [];
  const regex = new RegExp(`{\\s*name:\\s*['"][^'"]*${k}[^'"]*['"][^}]*}`, 'g');
  let m;
  while ((m = regex.exec(code)) !== null) {
    matches.push(m[0]);
  }
  console.log(`=== Keyword: ${k} (${matches.length} matches) ===`);
  matches.slice(0, 3).forEach(m => console.log(m));
});
