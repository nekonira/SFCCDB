const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const tabPos = appJs.indexOf('function TrainingSimulatorTab');
const calcPos = appJs.indexOf('const calculateBoostedPlayer=useCallback', tabPos);

const snippet = appJs.slice(tabPos, calcPos);
console.log('Between tabPos and calcPos: length', snippet.length);

// Check if calculateBoostedPlayer was used in snippet
let usagePos = snippet.indexOf('calculateBoostedPlayer');
if (usagePos !== -1) {
  console.log('calculateBoostedPlayer used BEFORE definition at offset', usagePos);
  console.log(snippet.slice(Math.max(0, usagePos - 100), Math.min(snippet.length, usagePos + 200)));
} else {
  console.log('calculateBoostedPlayer NOT used before definition');
}
