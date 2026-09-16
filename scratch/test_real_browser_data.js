const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const mockDataJs = fs.readFileSync('src/data/mockData.js', 'utf8');
const appJs = fs.readFileSync('src/app.js', 'utf8');

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
  setTimeout: (fn) => fn(),
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

vm.runInContext(specialCardsJs, sandbox);
vm.runInContext(mockDataJs, sandbox);
vm.runInContext(appJs, sandbox);

console.log('OFFICIAL_SPECIAL_CARDS:', sandbox.window.OFFICIAL_SPECIAL_CARDS ? sandbox.window.OFFICIAL_SPECIAL_CARDS.length : 'NULL');
console.log('INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS ? sandbox.window.INITIAL_PLAYERS.length : 'NULL');

const player = sandbox.window.INITIAL_PLAYERS[0];
const officialCards = sandbox.window.OFFICIAL_SPECIAL_CARDS;

console.log('\nTesting player:', player.name, 'Position:', player.mainPosition);

try {
  const result1 = sandbox.optimizeSpecialCardSlots(player, officialCards, {
    targetGoal: 'TOTAL',
    targetStage: '完凸',
    requiredAbilities: [],
    requiredSkills: [],
    matchPlaystyleBonusOnly: false,
    allowDuplicates: true,
    optimizationStrategy: 'EFFECTIVE_MAX'
  });
  console.log('Result EFFECTIVE_MAX:', JSON.stringify(result1, null, 2));
} catch (err) {
  console.error('ERROR in EFFECTIVE_MAX:', err.stack);
}

try {
  const result2 = sandbox.optimizeSpecialCardSlots(player, officialCards, {
    targetGoal: 'TOTAL',
    targetStage: '完凸',
    requiredAbilities: [],
    requiredSkills: [],
    matchPlaystyleBonusOnly: false,
    allowDuplicates: true,
    optimizationStrategy: 'SAFE_150'
  });
  console.log('Result SAFE_150:', JSON.stringify(result2, null, 2));
} catch (err) {
  console.error('ERROR in SAFE_150:', err.stack);
}
