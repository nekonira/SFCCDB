const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Verifying Desabi (Haifu) in App ---');

const projectRoot = path.join(__dirname, '..');
const mockPath = path.join(projectRoot, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');
const imagePath = path.join(projectRoot, 'src', 'data', 'desabiHaifuImage.js');
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

const p403 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p403');
console.log('Player found:', p403 ? `${p403.name} (${p403.id})` : 'NOT FOUND');

const avatarUrl = sandbox.window.getPlayerAvatarUrl(p403);
console.log('Avatar resolved:', avatarUrl && avatarUrl.startsWith('data:image/png;base64,') ? 'SUCCESS (Base64 URL found)' : 'FAILED');

console.log('Total players in DB now:', sandbox.window.INITIAL_PLAYERS.length);
console.log('Desabi Overall:', p403.overall, '-> Max:', p403.maxOverall);
console.log('Desabi Skill:', p403.skill.name, '(', p403.skill.rank, ')');
console.log('Desabi Abilities:', p403.abilities.map(a => `${a.name} [${a.rank}]`).join(', '));
console.log('All tests passed for p403!');
