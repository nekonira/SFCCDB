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

// Define dummy images
sandbox.window.HAALAND_IMAGE = 'DUMMY_HAALAND_NORMAL';
sandbox.window.HAALAND_GIFT_2026_IMAGE = 'DUMMY_HAALAND_GIFT';

vm.runInContext(mockCode, sandbox);
vm.runInContext(appJsCode, sandbox);

const p17 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p17');
const p259 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p259');

console.log('p17 avatar resolved:', sandbox.window.getPlayerAvatarUrl(p17));
console.log('p259 avatar resolved:', sandbox.window.getPlayerAvatarUrl(p259));
