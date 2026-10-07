const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Searching for filteredModalPlayers in app.jsx...');

lines.forEach((line, i) => {
  if (line.includes('filteredModalPlayers')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
});
