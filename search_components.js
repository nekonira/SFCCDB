const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'src', 'app.jsx');
const jsxContent = fs.readFileSync(jsxPath, 'utf-8');

const lines = jsxContent.split('\n');
console.log('Total lines in app.jsx:', lines.length);

lines.forEach((line, i) => {
  if (line.includes('function ') || line.includes('const ') && line.includes('Component') || line.includes('Simulator') || line.includes('SpecialCard')) {
    if (line.includes('=') || line.includes('function')) {
      console.log(`Line ${i+1}: ${line.trim().substring(0, 100)}`);
    }
  }
});
