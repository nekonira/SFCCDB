const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');

const appJs = fs.readFileSync(appJsPath, 'utf-8');
const appJsx = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Checking Mexico in app.js and app.jsx ---');
console.log('app.js has メキシコ in COUNTRY_CODE_MAP:', appJs.includes("'メキシコ'"));
console.log('app.jsx has メキシコ in COUNTRY_CODE_MAP:', appJsx.includes("'メキシコ'"));

if (!appJs.includes("'メキシコ'")) {
  const codeMapMatch = appJs.match(/const COUNTRY_CODE_MAP\s*=\s*\{([\s\S]*?)\};/);
  if (codeMapMatch) {
    console.log('COUNTRY_CODE_MAP in app.js:');
    console.log(codeMapMatch[0].substring(0, 300));
  }
  const flagMapMatch = appJs.match(/const COUNTRY_FLAG_MAP\s*=\s*\{([\s\S]*?)\};/);
  if (flagMapMatch) {
    console.log('COUNTRY_FLAG_MAP in app.js:');
    console.log(flagMapMatch[0].substring(0, 300));
  }
}
