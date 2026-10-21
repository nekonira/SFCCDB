const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJsCode = fs.readFileSync('src/app.js', 'utf-8');

class MockComponent {}
const sandbox = {
  window: {},
  document: {
    getElementById: () => ({ innerHTML: '' }),
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} })
  },
  console: console,
  React: {
    Component: MockComponent,
    PureComponent: MockComponent,
    useState: (init) => [init, () => {}],
    useEffect: () => {},
    useMemo: (fn) => fn(),
    useRef: () => ({ current: null }),
    useCallback: (fn) => fn(),
    createContext: () => ({ Provider: () => null, Consumer: () => null }),
    createElement: () => ({})
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

// Let's inspect runAutoBuildForFormation inside appJsCode
const idx = appJsCode.indexOf('runAutoBuildForFormation');
console.log('runAutoBuildForFormation found at index:', idx);
if (idx !== -1) {
  console.log(appJsCode.substring(idx - 50, idx + 800));
}
