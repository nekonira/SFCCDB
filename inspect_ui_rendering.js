const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const matches = [...code.matchAll(/isLaRoja/g)];
console.log('isLaRoja matches count:', matches.length);
matches.forEach((m, i) => {
  const idx = m.index;
  console.log(`Match ${i+1}:`, code.substring(idx - 40, idx + 120).replace(/\n/g, ' '));
});
