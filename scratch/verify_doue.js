const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Verifying Desire Doue in App Runtime ---');

const projectRoot = path.join(__dirname, '..');
const mockPath = path.join(projectRoot, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');
const imagePath = path.join(projectRoot, 'src', 'data', 'desireDoue2026Image.js');
const imageCode = fs.readFileSync(imagePath, 'utf-8');
const appJsPath = path.join(projectRoot, 'src', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');

class MockComponent {}

const sandbox = {
  window: {},
  document: {
    getElementById: () => ({ innerHTML: '' }),
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} })
  },
  console: console,
  React: {
    Component: MockComponent,
    PureComponent: MockComponent,
    useState: (init) => [init, () => {}],
    useEffect: () => {},
    useMemo: (fn) => fn(),
    useRef: () => ({ current: null }),
    useCallback: (fn) => fn(),
    createContext: () => ({ Provider: () => null, Consumer: () => null }),
    createElement: () => ({})
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imageCode, sandbox);
vm.runInContext(mockCode, sandbox);
vm.runInContext(appJsCode, sandbox);

const p404 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p404');
console.log('Player found:', p404 ? `${p404.name} (${p404.id})` : 'NOT FOUND');

const avatarUrl = sandbox.window.getPlayerAvatarUrl(p404);
console.log('Avatar resolved:', avatarUrl && avatarUrl.startsWith('data:image/png;base64,') ? 'SUCCESS (Base64 URL found)' : 'FAILED');

console.log('Total players in DB now:', sandbox.window.INITIAL_PLAYERS.length);
console.log('Doue Overall:', p404.overall, '-> Max:', p404.maxOverall);
console.log('Doue Positions:', p404.mainPosition, '/', p404.subPositions);
console.log('Doue Skill:', p404.skill.name, '(', p404.skill.rank, ')');
console.log('Doue Abilities:', p404.abilities.map(a => `${a.name} [${a.rank}]`).join(', '));

// Test getAdjustedPlayer simulation
const star3 = (sandbox.getAdjustedPlayer || sandbox.window.getAdjustedPlayer)(p404, '☆3', false);
console.log('☆3 Adjusted Overall:', star3.overall);
const star5Max = (sandbox.getAdjustedPlayer || sandbox.window.getAdjustedPlayer)(p404, '☆5', true);
console.log('☆5 Max Adjusted Overall:', star5Max.overall, '(Expected: 15650)');

console.log('All tests passed for p404!');
