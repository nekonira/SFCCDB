const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
const appJsxPath = path.join(__dirname, '..', 'src', 'app.jsx');

const appJs = fs.readFileSync(appJsPath, 'utf-8');
const appJsx = fs.readFileSync(appJsxPath, 'utf-8');

console.log('=== Inspecting COUNTRY maps in app.js ===');

const codeMapJs = appJs.match(/const COUNTRY_CODE_MAP\s*=\s*\{([\s\S]*?)\};/);
if (codeMapJs) {
  console.log('COUNTRY_CODE_MAP:');
  console.log(codeMapJs[1]);
}

const flagMapJs = appJs.match(/const COUNTRY_FLAG_MAP\s*=\s*\{([\s\S]*?)\};/);
if (flagMapJs) {
  console.log('COUNTRY_FLAG_MAP:');
  console.log(flagMapJs[1]);
}

const quickNatJs = appJs.match(/['"]日本['"],\s*['"]ブラジル['"][\s\S]*?\]/);
if (quickNatJs) {
  console.log('Quick Nationality Filter List in app.js:', quickNatJs[0]);
}
