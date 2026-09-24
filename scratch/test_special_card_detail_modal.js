const fs = require('fs');
const vm = require('vm');

const appJs = fs.readFileSync('src/app.js', 'utf-8');
const specialCardsData = fs.readFileSync('src/data/specialCardsData.js', 'utf-8');

const testScript = `
${specialCardsData}

${appJs}

console.log('Testing all cards in OFFICIAL_SPECIAL_CARDS with SpecialCardDetailModal...');

const cards = window.OFFICIAL_SPECIAL_CARDS || [];
console.log('Total cards to test:', cards.length);

let successCount = 0;
cards.forEach((card, idx) => {
  try {
    const el = SpecialCardDetailModal({
      card: card,
      onClose: () => {},
      onCompareToggle: () => {},
      isCompared: idx % 2 === 0
    });
    if (el) successCount++;
  } catch (err) {
    console.error('Error rendering card index', idx, card ? card.name : '', err);
    process.exit(1);
  }
});

console.log('Successfully tested all', successCount, 'special training cards!');
`;

const sandbox = {
  window: {},
  React: {
    useState: (init) => [init, () => {}],
    useMemo: (fn) => fn(),
    useEffect: () => {},
    useRef: () => ({ current: null }),
    useCallback: (fn) => fn(),
    createElement: (type, props, ...children) => ({ type, props, children })
  },
  useState: (init) => [init, () => {}],
  useMemo: (fn) => fn(),
  useEffect: () => {},
  useRef: () => ({ current: null }),
  useCallback: (fn) => fn(),
  console: console
};
sandbox.window = sandbox;

vm.createContext(sandbox);

try {
  vm.runInContext(testScript, sandbox);
  console.log('ALL CARDS TESTED SUCCESSFULLY!');
} catch (err) {
  console.error('ERROR in bulk card test:', err);
  process.exit(1);
}
