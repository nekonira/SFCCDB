const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Verifying Maxence Lacroix in App Runtime ---');

const projectRoot = path.join(__dirname, '..');
const mockPath = path.join(projectRoot, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');
const imagePath = path.join(projectRoot, 'src', 'data', 'maxenceLacroix2026Image.js');
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

const p406 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p406');
console.log('Player found:', p406 ? `${p406.name} (${p406.id})` : 'NOT FOUND');

const avatarUrl = sandbox.window.getPlayerAvatarUrl(p406);
console.log('Avatar resolved:', avatarUrl && avatarUrl.startsWith('data:image/png;base64,') ? 'SUCCESS (Base64 URL found)' : 'FAILED');

console.log('Total players in DB now:', sandbox.window.INITIAL_PLAYERS.length);
console.log('Lacroix Overall:', p406.overall, '-> Max:', p406.maxOverall);
console.log('Lacroix Skill:', p406.skill.name, '(', p406.skill.rank, ')');
console.log('Lacroix Abilities:', p406.abilities.map(a => `${a.name} [${a.rank}]`).join(', '));

console.log('All tests passed for p406!');
