const fs = require('fs');
const path = require('path');

const appJsx = fs.readFileSync(path.join(__dirname, 'src', 'app.jsx'), 'utf-8');
const lines = appJsx.split('\n');
console.log('Total lines in app.jsx:', lines.length);

lines.forEach((line, i) => {
  if (line.includes('セアラ') || line.includes('Ceara') || line.includes('p115') || line.includes('p263') || line.includes('LEO_CEARA')) {
    console.log(`Line ${i + 1}: ${line.trim().substring(0, 150)}`);
  }
});
