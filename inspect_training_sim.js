const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Inspecting TrainingSimulatorTab in app.jsx (Lines 8082 to 9000)...');

for (let i = 8081; i < Math.min(lines.length, 9000); i++) {
  const line = lines[i];
  if (line.includes('線') || line.includes('色') || line.includes('カラー') || line.includes('変更') || line.includes('スロット') || line.includes('線種') || line.includes('border') || line.includes('stroke') || line.includes('line') || line.includes('style') || line.includes('type') || line.includes('onClick')) {
    if (line.includes('button') || line.includes('handle') || line.includes('set') || line.includes('Line') || line.includes('Type') || line.includes('Style') || line.includes('6')) {
      console.log(`Line ${i+1}: ${line.trim().substring(0, 140)}`);
    }
  }
}
