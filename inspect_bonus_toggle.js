const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Searching for toggleCardBonus, bonus toggle, and bonus line logic...');

lines.forEach((line, i) => {
  if (line.includes('toggleCardBonus') || line.includes('toggleBonus') || line.includes('isBonusActive') || line.includes('bonusActive') || line.includes('toggleCard') || line.includes('Bonus')) {
    if (line.includes('function') || line.includes('const') || line.includes('onClick') || line.includes('useState')) {
      console.log(`Line ${i+1}: ${line.trim().substring(0, 140)}`);
    }
  }
});
