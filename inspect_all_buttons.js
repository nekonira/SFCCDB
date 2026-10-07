const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting ALL buttons in TrainingSimulatorTab (Lines 8082 to 10697)...');

for (let i = 8081; i < 10697; i++) {
  const line = lines[i];
  if (line.includes('<button') || line.includes('onClick=') || line.includes('handle')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
}
