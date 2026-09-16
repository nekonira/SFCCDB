const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const tabPos = content.indexOf('function TrainingSimulatorTab');
let pos = tabPos;
while ((pos = content.indexOf('calculateBoostedPlayer', pos + 1)) !== -1) {
  console.log('Pos:', pos, ':', content.slice(Math.max(0, pos - 50), Math.min(content.length, pos + 120)));
}
