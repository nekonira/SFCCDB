const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Testing DOM & App Runtime Initialization ---');

const sandbox = {
  window: {},
  console: console,
  document: {
    getElementById: () => ({ innerHTML: '' }),
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} })
  },
  localStorage: { getItem: () => null, setItem: () => {}, clear: () => {} }
};

sandbox.window = sandbox;

vm.createContext(sandbox);

// 1. Read mockData.js
const mockCode = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);

console.log('INITIAL_PLAYERS length in window:', sandbox.window.INITIAL_PLAYERS ? sandbox.window.INITIAL_PLAYERS.length : 'undefined');

// 2. Check filters & state defaults in src/app.js
const appCode = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');

// Search for default state values or filter defaults
const filterMatches = appCode.match(/const\s+\[(\w+),\s*set\w+\]\s*=\s*useState\(([^)]+)\)/g);
console.log('\nState defaults found in app.js:', filterMatches ? filterMatches.slice(0, 15) : 'None');

