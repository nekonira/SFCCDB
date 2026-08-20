const fs = require('fs');

const code = fs.readFileSync('src/app.js', 'utf-8');
const lines = code.split('\n');

console.log('Total lines in app.js:', lines.length);

lines.forEach((line, index) => {
  if (
    line.includes('PlayerDetailModal') || 
    line.includes('getAdjustedPlayer') || 
    line.includes('シミュレータ')
  ) {
    console.log(`${index + 1}: ${line.trim().slice(0, 120)}`);
  }
});
