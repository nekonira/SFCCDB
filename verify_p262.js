const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJsCode = fs.readFileSync('src/app.js', 'utf-8');

const sandbox = { 
  window: {},
  React: { useState: () => [], useEffect: () => {}, useMemo: (f) => f(), useCallback: (f) => f, useRef: () => ({}) },
  ReactDOM: { createRoot: () => ({ render: () => {} }) },
  document: { getElementById: () => null }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

sandbox.window.KAWAMOTO_IMAGE = 'KAWAMOTO_ONISHIGE_IMAGE';
sandbox.window.KAWAMOTO_PACK_2026_IMAGE = 'KAWAMOTO_TATSUMASA_PACK_IMAGE';

vm.runInContext(mockCode, sandbox);
vm.runInContext(appJsCode, sandbox);

console.log('Total players in mockData.js:', sandbox.window.INITIAL_PLAYERS.length);
const p111 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p111');
const p262 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p262');

console.log('p111 (河本鬼茂) avatar resolved:', sandbox.window.getPlayerAvatarUrl(p111));
console.log('p262 (河本龍将(パック)) avatar resolved:', sandbox.window.getPlayerAvatarUrl(p262));
