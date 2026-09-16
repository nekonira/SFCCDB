const fs = require('fs');
const vm = require('vm');

const specialCardsJs = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const mockDataJs = fs.readFileSync('src/data/mockData.js', 'utf8');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const dummyEl = { addEventListener: () => {}, removeEventListener: () => {} };
let toastMsg = null;
let currentSlots = [];

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
  useState: (init) => [init, (v) => { if (typeof v === 'function') v = v(init); }],
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn(),
  useEffect: () => {},
  useRef: (init) => ({ current: null })
};

vm.createContext(sandbox);

vm.runInContext(specialCardsJs, sandbox);
vm.runInContext(mockDataJs, sandbox);
vm.runInContext(appJs, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const officialCards = sandbox.window.OFFICIAL_SPECIAL_CARDS;

console.log('Testing with multiple players:');

for (let i = 0; i < 5; i++) {
  const p = players[i];
  console.log(`\nPlayer #${i + 1}: ${p.name} (${p.mainPosition})`);

  const opt1 = sandbox.optimizeSpecialCardSlots(p, officialCards, {
    targetGoal: 'TOTAL',
    targetStage: '完凸',
    requiredAbilities: [],
    requiredSkills: [],
    matchPlaystyleBonusOnly: false,
    allowDuplicates: true,
    optimizationStrategy: 'EFFECTIVE_MAX'
  });
  console.log(' - EFFECTIVE_MAX selected cards:', opt1.map(s => {
    const card = officialCards.find(c => c.id === s.cardId);
    return card ? card.name : s.cardId;
  }));

  const opt2 = sandbox.optimizeSpecialCardSlots(p, officialCards, {
    targetGoal: 'TOTAL',
    targetStage: '完凸',
    requiredAbilities: [],
    requiredSkills: [],
    matchPlaystyleBonusOnly: false,
    allowDuplicates: true,
    optimizationStrategy: 'SAFE_150'
  });
  console.log(' - SAFE_150 selected cards:', opt2.map(s => {
    const card = officialCards.find(c => c.id === s.cardId);
    return card ? card.name : s.cardId;
  }));
}
