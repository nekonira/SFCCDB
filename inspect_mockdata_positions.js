const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Inspecting Current mockData.js Positions & Styles ---');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];

const positions = new Set();
const playStyles = new Set();
const levels = new Set();

players.forEach(p => {
  if (p.mainPosition) positions.add(p.mainPosition);
  if (p.category) positions.add(p.category);
  if (p.playStyle) playStyles.add(p.playStyle);
  if (p.playStyleLevel) levels.add(p.playStyleLevel);
});

console.log('Positions found:', Array.from(positions).join(', '));
console.log('Play Styles found:', Array.from(playStyles).join(', '));
console.log('Levels found:', Array.from(levels).join(', '));
