const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('Testing app.js syntax and reactivity in Node VM...');

const reactPath = path.join(__dirname, 'src', 'lib', 'react.min.js');
const appJsPath = path.join(__dirname, 'src', 'app.js');

const reactCode = fs.readFileSync(reactPath, 'utf-8');
const appCode = fs.readFileSync(appJsPath, 'utf-8');

const sandbox = {
  window: {},
  console: console
};
sandbox.self = sandbox;
sandbox.window = sandbox;
sandbox.global = sandbox;

vm.createContext(sandbox);

try {
  vm.runInContext(reactCode, sandbox);
  vm.runInContext(appCode, sandbox);
  console.log('✅ SUCCESS: app.js loaded and evaluated without any syntax errors!');
} catch (err) {
  console.error('❌ Error evaluating app.js:', err);
  process.exit(1);
}
