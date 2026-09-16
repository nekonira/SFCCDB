const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const mockDataJs = fs.readFileSync('src/data/mockData.js', 'utf8');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const dummyEl = { addEventListener: () => {}, removeEventListener: () => {} };
const ReactMock = {
  createElement: (type, props, ...children) => {
    // If type is a function component, invoke it to test for runtime errors inside it
    if (typeof type === 'function') {
      try {
        return type(props || {});
      } catch (e) {
        console.error('Error rendering inner component:', type.name, e.stack);
        throw e;
      }
    }
    return { type, props, children };
  },
  useState: (init) => [init, () => {}],
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn(),
  useEffect: () => {},
  useRef: (init) => ({ current: null }),
  Fragment: 'React.Fragment'
};

const sandbox = {
  console,
  Math,
  Array,
  Object,
  Set,
  Map,
  Number,
  String,
  Boolean,
  parseFloat,
  parseInt,
  setTimeout: (fn) => fn(),
  window: { innerWidth: 1024, addEventListener: () => {}, removeEventListener: () => {} },
  document: { addEventListener: () => {}, removeEventListener: () => {}, current: dummyEl },
  React: ReactMock,
  useState: ReactMock.useState,
  useMemo: ReactMock.useMemo,
  useCallback: ReactMock.useCallback,
  useEffect: ReactMock.useEffect,
  useRef: ReactMock.useRef
};

vm.createContext(sandbox);

vm.runInContext(specialCardsJs, sandbox);
vm.runInContext(mockDataJs, sandbox);
vm.runInContext(appJs, sandbox);

const players = sandbox.window.INITIAL_PLAYERS.slice(0, 4);

console.log('--- Testing PlayerCompareModal ---');
try {
  const result = sandbox.PlayerCompareModal({
    compareList: players,
    onClose: () => {},
    onRemove: () => {},
    onClearAll: () => {}
  });
  console.log('PlayerCompareModal passed test!');
} catch (e) {
  console.error('PlayerCompareModal ERROR:', e.stack);
}

console.log('\n--- Testing PlayerDetailModal ---');
try {
  const result = sandbox.PlayerDetailModal({
    player: players[0],
    onClose: () => {},
    onCompareToggle: () => {},
    isCompared: false
  });
  console.log('PlayerDetailModal passed test!');
} catch (e) {
  console.error('PlayerDetailModal ERROR:', e.stack);
}
