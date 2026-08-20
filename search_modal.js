const fs = require('fs');

const code = fs.readFileSync('src/app.jsx', 'utf-8');
const lines = code.split('\n');

lines.forEach((line, index) => {
  if (
    line.includes('☆') || 
    line.includes('未強化') || 
    line.includes('最大強化') || 
    line.includes('Lv') || 
    line.includes('LV') || 
    line.includes('rarity') || 
    line.includes('Rarity') || 
    line.includes('段階') || 
    line.includes('シミュレータ')
  ) {
    console.log(`${index + 1}: ${line.trim().slice(0, 120)}`);
  }
});
