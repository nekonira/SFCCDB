const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appPath, 'utf-8');

const lines = code.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('p51') || line.includes('山口') || line.includes('Yamaguchi') || line.includes('YAMAGUCHI')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
