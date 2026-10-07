const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting app.jsx lines 11950 to 12450...');

for (let i = 11949; i < Math.min(lines.length, 12450); i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
