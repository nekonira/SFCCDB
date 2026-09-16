const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const tsPos = content.indexOf('function TrainingSimulatorTab');
const pos = tsPos + 77400;

console.log(content.slice(pos - 100, pos + 2500));
