const fs = require('fs');
const path = require('path');
const vm = require('vm');

const babelPath = path.join(__dirname, '..', 'src', 'lib', 'babel.min.js');
const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
const mockDataPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');

console.log('Reading mockData.js...');
const mockDataCode = fs.readFileSync(mockDataPath, 'utf-8');

console.log('Reading app.js...');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');

// Create mock localStorage with saved teams data
const mockLocalStorage = {
  store: {
    sfcc_saved_teams: JSON.stringify([
      {
        id: 'team_1786777123456',
        name: 'マイチーム1',
        updatedAt: '08/19 21:38',
        formationId: '343c_selecao',
        formationName: '3-4-3C',
        teamPolicy: 'リアクション',
        builderMaxEnhanced: false,
        squadMap: { 1: { id: 'p01', name: '荒木 遼太郎' } },
        benchMap: {},
        playerCount: 1
      }
    ]),
    sfcc_active_team: JSON.stringify({
      formationId: '343c_selecao',
      teamPolicy: 'リアクション',
      builderMaxEnhanced: false,
      squadMap: { 1: { id: 'p01', name: '荒木 遼太郎' } },
      benchMap: {}
    })
  },
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  clear() { this.store = {}; }
};

const sandbox = {
  window: {},
  document: {
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }),
    getElementById: () => null
  },
  localStorage: mockLocalStorage,
  console: console,
  React: {
    useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
    useEffect: (fn) => { fn(); },
    useMemo: (fn) => fn(),
    useCallback: (fn) => fn,
    useRef: (init) => ({ current: init }),
    createElement: () => ({})
  }
};
sandbox.window = sandbox;

vm.createContext(sandbox);

try {
  console.log('Executing mockData.js in sandbox...');
  vm.runInContext(mockDataCode, sandbox);
  console.log('INITIAL_PLAYERS count:', sandbox.INITIAL_PLAYERS ? sandbox.INITIAL_PLAYERS.length : 'NONE');

  console.log('Executing app.js in sandbox...');
  vm.runInContext(appJsCode, sandbox);
  console.log('App function defined:', typeof sandbox.App === 'function');
  
  // Try running App()
  if (typeof sandbox.App === 'function') {
    const result = sandbox.App();
    console.log('App() executed successfully!');
  }
} catch (err) {
  console.error('RUNTIME EVALUATION ERROR:', err);
}
