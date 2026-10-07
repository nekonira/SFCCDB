const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting app.jsx lines 10610 to 10720...');

for (let i = 10609; i < 10720; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
