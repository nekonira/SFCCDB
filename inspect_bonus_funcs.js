const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting bonus logic functions in app.jsx (Lines 1500 to 1650)...');

for (let i = 1500; i < 1650; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
