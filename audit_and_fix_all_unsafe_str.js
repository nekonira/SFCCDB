const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== AUDITING AND FIXING ALL POTENTIAL UNSAFE STRING/ARRAY CALLS IN APP.JSX ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Replace potential unsafe property calls in special card filters & modals
let fixCount = 0;

jsxCode = jsxCode.replace(/c\.name\.toLowerCase\(\)/g, () => { fixCount++; return '(c.name ? String(c.name).toLowerCase() : "")'; });
jsxCode = jsxCode.replace(/sk\.name\.toLowerCase\(\)/g, () => { fixCount++; return '(sk.name ? String(sk.name).toLowerCase() : "")'; });
jsxCode = jsxCode.replace(/sk\.description\.toLowerCase\(\)/g, () => { fixCount++; return '(sk.description ? String(sk.description).toLowerCase() : "")'; });
jsxCode = jsxCode.replace(/ef\.name\.toLowerCase\(\)/g, () => { fixCount++; return '(ef.name ? String(ef.name).toLowerCase() : "")'; });
jsxCode = jsxCode.replace(/ef\.description\.toLowerCase\(\)/g, () => { fixCount++; return '(ef.description ? String(ef.description).toLowerCase() : "")'; });

console.log(`Replaced ${fixCount} potential unsafe string method calls.`);

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// Transpile with Babel -> app.js
const babelPath = path.join(__dirname, 'src', 'lib', 'babel.min.js');
const babelCode = fs.readFileSync(babelPath, 'utf-8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);

const Babel = sandbox.Babel;
const transpiled = Babel.transform(jsxCode, {
  presets: [['react', { runtime: 'classic' }]]
});

fs.writeFileSync(appJsPath, transpiled.code, 'utf-8');
console.log(`Successfully transpiled app.jsx -> app.js (${transpiled.code.length} bytes)`);

console.log('=== ALL AUDITS & FIXES COMPLETE! ===');
