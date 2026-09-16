const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const tabPos = appJs.indexOf('function TrainingSimulatorTab');
const code = appJs.slice(tabPos, tabPos + 4000);

console.log('=== Initial state of currentPlayer in TrainingSimulatorTab ===');
console.log(code.slice(0, 1500));
