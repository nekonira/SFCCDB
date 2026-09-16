const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('lg:col-span-5') || line.includes('獲得スキル')) {
    console.log((idx + 1) + ': ' + line);
  }
});
