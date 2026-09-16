const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const mockDataJs = fs.readFileSync('src/data/mockData.js', 'utf8');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const dummyEl = { addEventListener: () => {}, removeEventListener: () => {} };
const ReactMock = {
  createElement: (...args) => ({ type: args[0], props: args[1], children: args.slice(2) }),
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

try {
  vm.runInContext(specialCardsJs, sandbox);
  vm.runInContext(mockDataJs, sandbox);
  vm.runInContext(appJs, sandbox);
  console.log('Evaluated app.js successfully');
} catch (err) {
  console.error('Error during initial eval:', err.stack);
}

// Test PlayerCompareModal execution
if (sandbox.PlayerCompareModal) {
  console.log('\nTesting PlayerCompareModal execution...');
  try {
    const players = sandbox.window.INITIAL_PLAYERS.slice(0, 3);
    const res = sandbox.PlayerCompareModal({
      compareList: players,
      onClose: () => {},
      onRemove: () => {},
      onClearAll: () => {}
    });
    console.log('PlayerCompareModal executed successfully!');
  } catch (err) {
    console.error('ERROR in PlayerCompareModal:', err.stack);
  }
}

// Test CardCompareModal execution
if (sandbox.CardCompareModal) {
  console.log('\nTesting CardCompareModal execution...');
  try {
    const cards = sandbox.window.OFFICIAL_SPECIAL_CARDS;
    const cardIds = cards.slice(0, 3).map(c => c.id);
    const res = sandbox.CardCompareModal({
      compareCardIds: cardIds,
      officialCards: cards,
      onClose: () => {},
      onRemoveCard: () => {},
      onClearAll: () => {}
    });
    console.log('CardCompareModal executed successfully!');
  } catch (err) {
    console.error('ERROR in CardCompareModal:', err.stack);
  }
}
