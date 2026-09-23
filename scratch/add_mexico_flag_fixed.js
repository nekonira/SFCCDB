const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');

console.log('--- Fixing Mexico Flag in src/app.js and src/app.jsx ---');

// 1. Update src/app.js
let appJs = fs.readFileSync(appJsPath, 'utf-8');
if (!appJs.includes("'メキシコ':'mx'") && !appJs.includes("'メキシコ': 'mx'")) {
  appJs = appJs.replace(
    "'香港':'hk'",
    "'香港':'hk','メキシコ':'mx'"
  );
  fs.writeFileSync(appJsPath, appJs, 'utf-8');
  console.log('[1/2] Added Mexico mapping to src/app.js');
} else {
  console.log('[1/2] src/app.js already has Mexico mapping');
}

// 2. Update src/app.jsx
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsx.includes("'メキシコ':'mx'") && !appJsx.includes("'メキシコ': 'mx'")) {
  appJsx = appJsx.replace(
    "'香港':'hk'",
    "'香港':'hk','メキシコ':'mx'"
  );
  appJsx = appJsx.replace(
    "'香港': 'hk'",
    "'香港': 'hk',\n  'メキシコ': 'mx'"
  );
  fs.writeFileSync(appJsxPath, appJsx, 'utf-8');
  console.log('[2/2] Added Mexico mapping to src/app.jsx');
} else {
  console.log('[2/2] src/app.jsx already has Mexico mapping');
}

// Verify COUNTRY_CODE_MAP in app.js
const sandbox = { React: { createElement: () => ({}) }, window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

try {
  const match = appJs.match(/const COUNTRY_CODE_MAP=\{(\{[^}]+\}|[^;]+)\};/);
  if (match) {
    vm.runInContext(match[0], sandbox);
    console.log('Verified COUNTRY_CODE_MAP in app.js for メキシコ:', sandbox.COUNTRY_CODE_MAP['メキシコ']);
  }
} catch (e) {
  console.log('Evaluation test note:', e.message);
}
