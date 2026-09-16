const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const mockDataJs = fs.readFileSync('src/data/mockData.js', 'utf8');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const dummyEl = { addEventListener: () => {}, removeEventListener: () => {} };
const ReactMock = {
  createElement: (type, props, ...children) => {
    if (typeof type === 'function') {
      return type(props || {});
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

const cards = sandbox.window.OFFICIAL_SPECIAL_CARDS;
const cardIds = cards.slice(0, 3).map(c => c.id);

console.log('--- Testing CardCompareModal ---');
try {
  const result = sandbox.CardCompareModal({
    compareCardIds: cardIds,
    officialCards: cards,
    onClose: () => {},
    onRemoveCard: () => {},
    onClearAll: () => {}
  });
  console.log('CardCompareModal passed test!');
} catch (e) {
  console.error('CardCompareModal ERROR:', e.stack);
}
