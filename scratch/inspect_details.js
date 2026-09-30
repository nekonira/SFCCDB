const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating マイ編成 in app.jsx ===');
lines.forEach((line, idx) => {
  if (line.includes('マイ編成') || line.includes('simPlayerCondition') || line.includes('TrainingSimulatorTab')) {
    console.log(`L${idx+1}: ${line.trim()}`);
  }
});
