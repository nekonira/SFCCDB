const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');
const vm = require('vm');

const dummyEl = { addEventListener: () => {}, removeEventListener: () => {} };
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
  setTimeout: () => {},
  window: { innerWidth: 1024, addEventListener: () => {}, removeEventListener: () => {} },
  document: { addEventListener: () => {}, removeEventListener: () => {}, current: dummyEl },
  React: { createElement: () => {} },
  useState: (init) => [init, () => {}],
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn(),
  useEffect: () => {},
  useRef: (init) => ({ current: null })
};

vm.createContext(sandbox);

try {
  vm.runInContext(appJs, sandbox);
  console.log('app.js evaluated successfully');
} catch (e) {
  console.log('Error evaluating app.js:', e.stack);
}

console.log('officialCards count:', sandbox.OFFICIAL_CARDS ? sandbox.OFFICIAL_CARDS.length : (sandbox.officialCards ? sandbox.officialCards.length : 'undefined'));
console.log('PLAYERS count:', sandbox.PLAYERS ? sandbox.PLAYERS.length : (sandbox.players ? sandbox.players.length : 'undefined'));

// Check window globals
for (const k of Object.keys(sandbox)) {
  if (k.includes('CARD') || k.includes('Card') || k.includes('Player') || k.includes('player') || k.includes('optimize')) {
    console.log('Global symbol:', k);
  }
}
