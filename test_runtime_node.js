const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockJs = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
const appJs = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
const mainJs = fs.readFileSync(path.join(__dirname, 'src', 'main.js'), 'utf-8');

console.log('--- Sandboxed Node Runtime Evaluation Test ---');

// Mock browser globals
const sandbox = {
  window: {},
  document: {
    getElementById: (id) => ({ id, children: [], render: () => {} })
  },
  React: {
    useState: (val) => [val, () => {}],
    useEffect: () => {},
    useMemo: (fn) => fn(),
    createElement: (type, props, ...children) => ({ type, props, children })
  },
  ReactDOM: {
    createRoot: (el) => ({ render: (element) => { console.log('ReactDOM.createRoot().render() called successfully!'); } })
  },
  console: console,
  localStorage: { clear: () => {} }
};

sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  
  console.log('1. Evaluating mockData.js...');
  vm.runInContext(mockJs, sandbox);
  console.log('   -> INITIAL_PLAYERS count:', sandbox.window.INITIAL_PLAYERS ? sandbox.window.INITIAL_PLAYERS.length : 'undefined');

  console.log('2. Evaluating app.js...');
  vm.runInContext(appJs, sandbox);
  console.log('   -> App component type:', typeof sandbox.App);

  console.log('3. Evaluating main.js...');
  vm.runInContext(mainJs, sandbox);

  console.log('\nSUCCESS: 100% CLEAN EVALUATION! No errors thrown during runtime boot!');
} catch (err) {
  console.error('RUNTIME EVALUATION ERROR:', err);
}
