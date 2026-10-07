const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting app.jsx lines 9360 to 9420 (limitGaugeMode UI)...');

for (let i = 9359; i < 9420; i++) {
  console.log(`Line ${i+1}: ${lines[i]}`);
}
