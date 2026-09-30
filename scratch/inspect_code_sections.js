const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

const printRange = (start, end, label) => {
  console.log(`\n=================== ${label} (L${start}-L${end}) ===================`);
  for (let i = start - 1; i < end && i < lines.length; i++) {
    console.log(`${i+1}: ${lines[i]}`);
  }
};

printRange(8085, 8220, 'TrainingSimulatorTab Condition & Boost logic');
printRange(8475, 8560, 'マイ編成 State & Handlers');
printRange(9960, 10090, 'マイ編成 Modal / Button / Dropdown UI');
