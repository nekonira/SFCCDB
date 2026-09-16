const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const tabPos = appJs.indexOf('function TrainingSimulatorTab');
const endPos = appJs.indexOf('function AutoSelectModal');
console.log('TrainingSimulatorTab from', tabPos, 'to', endPos);

if (tabPos !== -1 && endPos !== -1) {
  const code = appJs.slice(tabPos, endPos);
  fs.writeFileSync('scratch/TrainingSimulatorTab_extracted.js', code);
  console.log('Extracted TrainingSimulatorTab code to scratch/TrainingSimulatorTab_extracted.js');
}
