const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting app.jsx lines 11948 to 12150...');

for (let i = 11947; i < 12150; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
