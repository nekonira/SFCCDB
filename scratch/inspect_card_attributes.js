const fs = require('fs');
let content = fs.readFileSync('src/app.jsx', 'utf8');

// Find officialCards definition or structure
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('officialCards') || line.includes('INITIAL_OFFICIAL_CARDS') || line.includes('ability')) {
    if (idx < 500 || idx > 7500) {
      console.log((idx + 1) + ': ' + line.slice(0, 120));
    }
  }
});
