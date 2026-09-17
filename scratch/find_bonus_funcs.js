const fs = require('fs');

const files = ['./src/app.jsx', './src/app.js'];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log(`\n========================================`);
  console.log(`FILE: ${filePath} (${lines.length} lines)`);
  console.log(`========================================`);

  lines.forEach((line, i) => {
    if (line.includes('checkBonusMatch') || line.includes('calculateCardBonusMult') || line.includes('playstyleBonus')) {
      console.log(`Line ${i + 1}: ${line.trim().substring(0, 120)}`);
    }
  });
});
