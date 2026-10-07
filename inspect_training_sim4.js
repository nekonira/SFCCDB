const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting app.jsx lines 9170 to 9260...');

for (let i = 9169; i < 9260; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
