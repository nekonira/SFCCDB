const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting state handlers inside TrainingSimulatorTab...');

for (let i = 8081; i < 9000; i++) {
  const line = lines[i];
  if (line.includes('const [') || line.includes('function ') || line.includes('const handle') || line.includes('const set') || line.includes('const update')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
}
