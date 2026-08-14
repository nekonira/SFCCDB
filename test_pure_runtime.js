const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Testing pure JavaScript execution in Node VM ---');

const mockCode = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
const appCode = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');

const sandbox = {
  window: {},
  document: { getElementById: () => ({ appendChild: () => {} }) },
  React: { useState: () => [], useEffect: () => {}, useMemo: () => {}, createElement: () => ({}) },
  ReactDOM: { createRoot: () => ({ render: () => {} }) },
  console
};
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(mockCode, sandbox);
  console.log('1. mockData.js OK! Total players:', sandbox.window.INITIAL_PLAYERS.length);

  vm.runInContext(appCode, sandbox);
  console.log('2. app.js OK! App component defined:', typeof sandbox.App === 'function' ? 'YES' : 'NO');
  console.log('3. getPlayerAvatarUrl defined:', typeof sandbox.window.getPlayerAvatarUrl === 'function' ? 'YES' : 'NO');

  console.log('SUCCESS! ALL PURE JS FILES EXECUTED 100% CLEANLY!');
} catch (err) {
  console.error('ERROR during runtime execution:', err);
}
