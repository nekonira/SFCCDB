const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const lines = code.split('\n');
console.log('--- SpecialCardsTab Component Header & State (L8300-L8380) ---');
console.log(lines.slice(8300, 8380).join('\n'));
