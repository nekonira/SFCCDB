const fs = require('fs');
const vm = require('vm');

const appJs = fs.readFileSync('src/app.js', 'utf-8');
const mockData = fs.readFileSync('src/data/mockData.js', 'utf-8');

const testCode = mockData + '\n' + appJs + `
const iijima = window.INITIAL_PLAYERS.find(p => p.name.includes('飯島潤一郎'));
if (iijima) {
  const unenhanced = getAdjustedPlayer(iijima, '☆5', false);
  console.log('Unenhanced Iijima:', unenhanced.name, '| Rarity:', unenhanced.rarity, '| Overall:', unenhanced.overall);

  const maxEnhanced = getAdjustedPlayer(iijima, '☆5', true);
  console.log('MaxEnhanced Iijima:', maxEnhanced.name, '| Rarity:', maxEnhanced.rarity, '| Overall:', maxEnhanced.overall);
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
  console.log('Verification successful!');
} catch (err) {
  console.error('ERROR:', err);
  process.exit(1);
}
