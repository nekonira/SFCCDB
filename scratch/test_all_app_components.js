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

console.log('--- 1. Testing PlayerCompareModal ---');
try {
  sandbox.PlayerCompareModal({
    compareList: players.slice(0, 3),
    onClose: () => {},
    onRemove: () => {},
    onClearAll: () => {}
  });
  console.log('SUCCESS: PlayerCompareModal');
} catch (e) {
  console.error('FAIL: PlayerCompareModal', e.stack);
}

console.log('\n--- 2. Testing CardCompareModal ---');
try {
  sandbox.CardCompareModal({
    compareCardIds: officialCards.slice(0, 3).map(c => c.id),
    officialCards: officialCards,
    onClose: () => {},
    onRemoveCard: () => {},
    onClearAll: () => {}
  });
  console.log('SUCCESS: CardCompareModal');
} catch (e) {
  console.error('FAIL: CardCompareModal', e.stack);
}

console.log('\n--- 3. Testing PlayerDetailModal ---');
try {
  sandbox.PlayerDetailModal({
    player: players[0],
    onClose: () => {},
    onCompareToggle: () => {},
    isCompared: true
  });
  console.log('SUCCESS: PlayerDetailModal');
} catch (e) {
  console.error('FAIL: PlayerDetailModal', e.stack);
}

console.log('\n--- 4. Testing AutoSelectModal ---');
try {
  sandbox.AutoSelectModal({
    isOpen: true,
    onClose: () => {},
    onApply: () => {},
    currentPlayer: players[0],
    officialCards: officialCards,
    initialStrategy: 'EFFECTIVE_MAX',
    setAutoSelectToast: () => {}
  });
  console.log('SUCCESS: AutoSelectModal');
} catch (e) {
  console.error('FAIL: AutoSelectModal', e.stack);
}

console.log('\n--- 5. Testing TrainingSimulatorTab ---');
try {
  sandbox.TrainingSimulatorTab({
    players: players,
    selectedPlayer: players[0],
    setSelectedPlayer: () => {},
    onGoToDB: () => {}
  });
  console.log('SUCCESS: TrainingSimulatorTab');
} catch (e) {
  console.error('FAIL: TrainingSimulatorTab', e.stack);
}
