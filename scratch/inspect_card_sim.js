const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('slotCards') || line.includes('statDetailGains') || line.includes('calculateSlots') || line.includes('playstyleBonus')) {
    console.log((idx + 1) + ': ' + line);
  }
});
