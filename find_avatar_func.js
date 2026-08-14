const fs = require('fs');
const path = require('path');

const appJs = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
const lines = appJs.split('\n');
lines.forEach((line, i) => {
  if (line.includes('Avatar') || line.includes('avatar') || line.includes('Url')) {
    console.log(`Line ${i + 1}: ${line.trim().substring(0, 120)}`);
  }
});
