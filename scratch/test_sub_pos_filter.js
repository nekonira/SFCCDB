const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

// Extract isPositionMatch and normalizePosition from app.jsx
const normMatch = appJsx.match(/const normalizePosition = [^;]+;/s);
const isPosMatch = appJsx.match(/const isPositionMatch = [^;]+;/s);

vm.runInContext(normMatch[0], sandbox);
vm.runInContext(isPosMatch[0], sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const mitoma = players.find(p => p.name.includes('三笘薫(日本代表)'));
console.log('Mitoma:', mitoma.name, 'main:', mitoma.mainPosition, 'sub:', mitoma.subPositions);

// Test filterPos = 'AM'
const filterPos = 'AM';
const isMainMatch = sandbox.isPositionMatch(mitoma.mainPosition, filterPos);
const isSubMatch = mitoma.subPositions && mitoma.subPositions.some(sp => sandbox.isPositionMatch(sp, filterPos));
console.log('filterPos = AM -> isMainMatch:', isMainMatch, 'isSubMatch:', isSubMatch);

// What if slot is AM?
console.log('normalizePosition(AM):', sandbox.normalizePosition('AM'));
console.log('normalizePosition(LM):', sandbox.normalizePosition('LM'));
