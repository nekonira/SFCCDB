const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Fixing getSpecialCardSkill helper in app.jsx ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

const targetFunc = `const getSpecialCardSkill = (c) => {
  if (!c) return null;
  const sk = c.skill || null;
  if (!sk) return null;

  // Sync skill description with player DB if description is missing or equal to skill name
  if (!sk.description || sk.description === sk.name) {
    if (window.INITIAL_PLAYERS && Array.isArray(window.INITIAL_PLAYERS)) {
      for (const p of window.INITIAL_PLAYERS) {
        if (p.skill && p.skill.name === sk.name && p.skill.description && p.skill.description !== sk.name) {
          return { ...sk, description: p.skill.description };
        }
      }
    }
  }
  return sk;
};`;

// Replace existing getSpecialCardSkill definition
const startIdx = jsxCode.indexOf('const getSpecialCardSkill =');
const endIdx = jsxCode.indexOf('const getSpecialCardEffect =', startIdx);

jsxCode = jsxCode.substring(0, startIdx) + targetFunc + '\n' + jsxCode.substring(endIdx);
fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
console.log('Replaced getSpecialCardSkill definition cleanly in app.jsx');

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
console.log(`Transpiled src/app.jsx -> src/app.js (${transpiled.code.length} bytes)`);

console.log('=== HELPER FIX & TRANSPILE COMPLETE! ===');
