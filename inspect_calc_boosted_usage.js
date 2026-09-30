const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const regex = /calculateBoostedPlayer/g;
const matches = [...code.matchAll(regex)];

console.log('calculateBoostedPlayer matches count:', matches.length);
matches.forEach((m, i) => {
  const idx = m.index;
  console.log(`Match ${i+1}:`, code.substring(idx - 40, idx + 100).replace(/\n/g, ' '));
});
