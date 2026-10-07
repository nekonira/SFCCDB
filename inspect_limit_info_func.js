const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting getDetailStatLimitInfo in app.jsx (Lines 8110 to 8180)...');

for (let i = 8109; i < 8180; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
