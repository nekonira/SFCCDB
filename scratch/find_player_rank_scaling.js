const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('rarity') || line.includes('強化') || line.includes('☆3') || line.includes('☆4') || line.includes('☆5') || line.includes('stage') || line.includes('scale')) {
    if (idx < 7500) {
      console.log((idx + 1) + ': ' + line.slice(0, 110));
    }
  }
});
