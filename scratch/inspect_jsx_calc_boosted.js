const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const tabPos = content.indexOf('function TrainingSimulatorTab');
const usagePos = content.indexOf('calculateBoostedPlayer', tabPos);

console.log('TrainingSimulatorTab at:', tabPos, 'usagePos at:', usagePos);
if (tabPos !== -1 && usagePos !== -1) {
  console.log(content.slice(usagePos - 100, usagePos + 500));
}
