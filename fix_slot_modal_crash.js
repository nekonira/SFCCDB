const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING SLOT CARD MODAL TO LOWERCASE CRASH BUG ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Replace unsafe toLowerCase calls in slot card search filter
const oldSearchFilter = `const matchSearch = !slotCardSearchText ||
                    c.name.toLowerCase().includes(q) ||
                    (sk && (sk.name.toLowerCase().includes(q) || sk.description.toLowerCase().includes(q))) ||
                    (ef && (ef.name.toLowerCase().includes(q) || ef.description.toLowerCase().includes(q)));`;

const newSearchFilter = `const matchSearch = !slotCardSearchText ||
                    (c.name && String(c.name).toLowerCase().includes(q)) ||
                    (sk && ((sk.name && String(sk.name).toLowerCase().includes(q)) || (sk.description && String(sk.description).toLowerCase().includes(q)))) ||
                    (ef && ((ef.name && String(ef.name).toLowerCase().includes(q)) || (ef.description && String(ef.description).toLowerCase().includes(q))));`;

if (jsxCode.includes(oldSearchFilter)) {
  jsxCode = jsxCode.replace(oldSearchFilter, newSearchFilter);
  console.log('1. Fixed unsafe toLowerCase calls in slotCardSearchText filter');
} else {
  // Replace string pattern if whitespace differs
  jsxCode = jsxCode.replace(
    /sk\.name\.toLowerCase\(\)/g, 'String(sk.name || "").toLowerCase()'
  ).replace(
    /sk\.description\.toLowerCase\(\)/g, 'String(sk.description || "").toLowerCase()'
  ).replace(
    /ef\.name\.toLowerCase\(\)/g, 'String(ef.name || "").toLowerCase()'
  ).replace(
    /ef\.description\.toLowerCase\(\)/g, 'String(ef.description || "").toLowerCase()'
  );
  console.log('1. Replaced toLowerCase calls safely across app.jsx');
}

// Write back app.jsx
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
console.log(`2. Successfully transpiled app.jsx -> app.js (${transpiled.code.length} bytes)`);

console.log('=== FIX COMPLETE! ===');
