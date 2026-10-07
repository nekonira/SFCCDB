const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting app.jsx lines 2200 to 2230...');

for (let i = 2199; i < 2230; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
