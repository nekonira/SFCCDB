const fs = require('fs');
const path = require('path');

const appJs = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
const lines = appJs.split('\n');
for (let i = 80; i <= 95 && i < lines.length; i++) {
  console.log(`Line ${i + 1}: ${lines[i]}`);
}
