const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const mockDataJs = fs.readFileSync('src/data/mockData.js', 'utf8');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const dummyEl = { addEventListener: () => {}, removeEventListener: () => {} };
const ReactMock = {
  createElement: (type, props, ...children) => {
    if (typeof type === 'function') {
      try {
        return type(props || {});
      } catch (e) {
        console.error(`ERROR in component ${type.name}:`, e.stack);
        throw e;
      }
    }
    return { type, props, children };
  },
  useState: (init) => [init, () => {}],
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn,
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

const players = sandbox.window.INITIAL_PLAYERS;
const officialCards = sandbox.window.OFFICIAL_SPECIAL_CARDS;

console.log('OFFICIAL_SPECIAL_CARDS count on window:', officialCards ? officialCards.length : 'NULL');

// Inspect PlayerCompareModal call inside App or PlayerDBTab
console.log('\n--- 1. Testing PlayerCompareModal ---');
try {
  const comp = sandbox.PlayerCompareModal({
    compareList: [players[0], players[1]],
    onClose: () => {},
    onRemove: () => {},
    onClearAll: () => {}
  });
  console.log('PlayerCompareModal returned:', comp ? 'OBJECT' : 'NULL');
} catch (e) {
  console.error('PlayerCompareModal error:', e.stack);
}

// Inspect TrainingSimulatorTab officialCards and card list filtering
console.log('\n--- 2. Inspecting TrainingSimulatorTab card list logic ---');
const appJsContent = fs.readFileSync('src/app.jsx', 'utf8');

const tsPos = appJsContent.indexOf('function TrainingSimulatorTab');
const tsCode = appJsContent.slice(tsPos, tsPos + 10000);

console.log('TrainingSimulatorTab cards logic snippet:');
let cardFilterPos = tsCode.indexOf('filteredCards');
if (cardFilterPos !== -1) {
  console.log(tsCode.slice(cardFilterPos - 100, cardFilterPos + 1000));
}
