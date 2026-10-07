const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting app.jsx lines 9260 to 9500...');

for (let i = 9259; i < Math.min(lines.length, 9500); i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
