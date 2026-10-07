const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting TrainingSimulatorTab in app.jsx (Lines 9000 to 10700)...');

for (let i = 8999; i < Math.min(lines.length, 10700); i++) {
  const line = lines[i];
  if (line.includes('変更') || line.includes('切替') || line.includes('線') || line.includes('タイプ') || line.includes('種') || line.includes('表示') || line.includes('onClick') || line.includes('slot') || line.includes('Slot') || line.includes('button')) {
    if (line.includes('button') || line.includes('onClick') || line.includes('set') || line.includes('handle') || line.includes('線') || line.includes('型') || line.includes('種')) {
      console.log(`Line ${i+1}: ${line.trim().substring(0, 140)}`);
    }
  }
}
