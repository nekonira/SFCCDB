const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
const appJs = fs.readFileSync(appJsPath, 'utf-8');

const codeMapMatch = appJs.match(/const COUNTRY_CODE_MAP\s*=\s*\{([\s\S]*?)\};/);
if (codeMapMatch) {
  console.log('COUNTRY_CODE_MAP contains メキシコ:');
  const lines = codeMapMatch[1].split('\n').filter(l => l.includes('メキシコ') || l.includes('香港') || l.includes('mx'));
  console.log(lines.join('\n') || codeMapMatch[1]);
} else {
  console.log('COUNTRY_CODE_MAP not found in app.js');
}
