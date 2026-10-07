const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');

console.log('Searching for getDetailStatLimitInfo definition...');

lines.forEach((line, i) => {
  if (line.includes('getDetailStatLimitInfo')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
});
