const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const tabPos = appJs.indexOf('function TrainingSimulatorTab');
const calcPos = appJs.indexOf('const calculateBoostedPlayer', tabPos);

console.log('TrainingSimulatorTab at:', tabPos, 'calcPos at:', calcPos);
if (tabPos !== -1 && calcPos !== -1) {
  console.log(appJs.slice(tabPos, calcPos + 500));
}
