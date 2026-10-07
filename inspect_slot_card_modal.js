const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting Slot Card Modal in app.jsx (Lines 10250 to 10380)...');

for (let i = 10249; i < 10380; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
