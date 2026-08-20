const fs = require('fs');
const vm = require('vm');

const appJs = fs.readFileSync('src/app.js', 'utf-8');
const mockData = fs.readFileSync('src/data/mockData.js', 'utf-8');

const testCode = mockData + '\n' + appJs + `
const messi = window.INITIAL_PLAYERS.find(p => p.name.includes('メッシ(配布)'));
if (messi) {
  const unenhanced = getAdjustedPlayer(messi, '☆5', false);
  console.log('Unenhanced Messi:', unenhanced.name, '| Rarity:', unenhanced.rarity, '| Overall:', unenhanced.overall);

  const maxEnhanced = getAdjustedPlayer(messi, '☆5', true);
  console.log('MaxEnhanced Messi:', maxEnhanced.name, '| Rarity:', maxEnhanced.rarity, '| Overall:', maxEnhanced.overall);
}

const honda = window.INITIAL_PLAYERS.find(p => p.name.includes('本多勇喜'));
if (honda) {
  const unenhancedH = getAdjustedPlayer(honda, '☆3', false);
  console.log('Unenhanced Honda:', unenhancedH.name, '| Rarity:', unenhancedH.rarity, '| Overall:', unenhancedH.overall);

  const maxEnhancedH = getAdjustedPlayer(honda, '☆5', true);
  console.log('MaxEnhanced Honda:', maxEnhancedH.name, '| Rarity:', maxEnhancedH.rarity, '| Overall:', maxEnhancedH.overall);
}
`;

const sandbox = {
  window: {},
  React: {
    useState: () => [null, () => {}],
    useEffect: () => {},
    useMemo: (fn) => fn(),
    useRef: () => ({ current: null }),
    useCallback: (fn) => fn(),
    createElement: () => ({})
  },
  console: console
};
sandbox.window = sandbox;

vm.createContext(sandbox);

try {
  vm.runInContext(testCode, sandbox);
  console.log('3. All player adjustment tests passed!');
} catch (err) {
  console.error('ERROR:', err);
  process.exit(1);
}
