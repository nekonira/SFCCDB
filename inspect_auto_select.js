const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting handleDirectAutoSelect in app.jsx (Lines 8550 to 8640)...');

for (let i = 8549; i < 8640; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
