const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');

console.log('File length:', code.length);

['マイ編成', 'simPlayerCondition', '調子', '1.25', '1.5', 'TrainingSimulatorTab', 'calculateBoostedPlayer'].forEach(term => {
  const matches = [];
  let pos = code.indexOf(term);
  while (pos !== -1) {
    matches.push(pos);
    pos = code.indexOf(term, pos + 1);
  }
  console.log(`Term "${term}": found ${matches.length} times`);
});
