const fs = require('fs');
const path = require('path');

const appJsx = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = appJsx.split('\n');

console.log('Searching for description maps or パワーアジリティ in app.jsx...');

lines.forEach((line, idx) => {
  if (line.includes('SKILL_DESCRIPTIONS') || line.includes('ABILITY_DESCRIPTIONS') || line.includes('パワーアジリティ') || line.includes('エレガントセーブ')) {
    console.log(`L${idx+1}: ${line.substring(0, 120)}`);
  }
});
