const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'src', 'app.js');
let jsContent = fs.readFileSync(jsPath, 'utf-8');

const lines = jsContent.split('\n');

for (let i = 115; i <= 210; i++) {
  if (lines[i]) {
    console.log(`=== Line ${i+1} ===`);
    console.log(lines[i]);
  }
}
