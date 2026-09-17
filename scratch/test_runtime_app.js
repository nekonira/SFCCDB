const fs = require('fs');
global.window = global;

require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const appJsCode = fs.readFileSync('./src/app.js', 'utf8');

// Evaluate app.js in context to verify clean execution
const vm = require('vm');
const context = vm.createContext({
  global,
  window: global,
  console,
  require,
  exports: {},
  module: { exports: {} },
  React: {
    createElement: () => ({}),
    useState: (init) => [init, () => {}],
    useMemo: (fn) => fn(),
    useEffect: () => {},
    useCallback: (fn) => fn,
    useRef: () => ({ current: null })
  },
  ReactDOM: { render: () => {} }
});

try {
  vm.runInContext(appJsCode, context);
  console.log("SUCCESS: src/app.js parsed and executed cleanly in VM without errors!");
} catch (err) {
  console.error("ERROR running src/app.js in VM:", err);
  process.exit(1);
}
