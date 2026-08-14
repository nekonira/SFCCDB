const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TESTING ARAKI AVATAR RESOLUTION ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const appJsPath = path.join(__dirname, 'src', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');

const sandbox = { window: {}, React: { useState: () => [], useMemo: () => {}, useEffect: () => {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p199 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p199');
const p149 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p149');

const fnStart = appJsCode.indexOf('const getPlayerAvatarUrl =');
// Find the ending bracket of getPlayerAvatarUrl
const fnEnd = appJsCode.indexOf('const App =', fnStart);

let getAvatarCode = appJsCode.substring(fnStart, fnEnd > -1 ? fnEnd : appJsCode.length);
getAvatarCode = getAvatarCode.replace('const getPlayerAvatarUrl =', 'window.getPlayerAvatarUrl =');

sandbox.window.ARAKI_2026_IMAGE = 'ARAKI_HAYATO_IMAGE_URL';
sandbox.window.ARAKI_RYOTARO_2026_IMAGE = 'ARAKI_RYOTARO_IMAGE_URL';

vm.runInContext(getAvatarCode, sandbox);

const p199Avatar = sandbox.window.getPlayerAvatarUrl(p199);
const p149Avatar = sandbox.window.getPlayerAvatarUrl(p149);

console.log('p199 (荒木遼太郎) Avatar URL resolved to:', p199Avatar);
console.log('p149 (荒木隼人) Avatar URL resolved to:', p149Avatar);

if (p199Avatar === 'ARAKI_RYOTARO_IMAGE_URL' && p149Avatar === 'ARAKI_HAYATO_IMAGE_URL') {
  console.log('=== SUCCESS: Both Araki players resolve correctly! ===');
} else {
  console.error('=== FAILURE: Avatar resolution mismatch! ===');
  process.exit(1);
}
