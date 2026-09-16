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

console.log('--- Testing TrainingSimulatorTab ---');
try {
  const result = sandbox.TrainingSimulatorTab({
    players: players,
    selectedPlayer: players[0],
    setSelectedPlayer: () => {},
    onGoToDB: () => {}
  });
  console.log('TrainingSimulatorTab SUCCESS!');
} catch (e) {
  console.error('TrainingSimulatorTab ERROR:', e.stack);
}
