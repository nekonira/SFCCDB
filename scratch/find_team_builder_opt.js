const fs = require('fs');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const matches = [];
const lines = appJsx.split('\n');
lines.forEach((line, i) => {
  if (line.includes('自動編成') || line.includes('最適編成') || line.includes('optimize') || line.includes('autoSelect') || line.includes('レ・ブルー')) {
    matches.push(`${i + 1}: ${line.trim()}`);
  }
});
console.log('Matches in app.jsx (first 30):');
console.log(matches.slice(0, 30).join('\n'));
