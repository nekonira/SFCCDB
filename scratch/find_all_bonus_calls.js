const fs = require('fs');
const jsx = fs.readFileSync('src/app.jsx', 'utf8');
const lines = jsx.split('\n');

console.log('--- Lines referencing playstyleBonus or playStyle matching ---');
lines.forEach((line, idx) => {
  if (line.includes('playstyleBonus') || line.includes('checkSingleBonusMatch') || line.includes('checkBonusMatch') || line.includes('calculateCardBonusMult')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
