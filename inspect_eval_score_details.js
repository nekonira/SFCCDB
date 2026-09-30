const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const lines = code.split('\n');
const idx = code.indexOf("function evaluateSetScore(");
const lineNum = code.substring(0, idx).split('\n').length;

console.log(lines.slice(lineNum - 1, lineNum + 80).join('\n'));
