const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const idx = code.indexOf("function evaluateSetScore(");
if (idx !== -1) {
  console.log(code.substring(idx, idx + 1800));
} else {
  console.log('evaluateSetScore function not found');
}
