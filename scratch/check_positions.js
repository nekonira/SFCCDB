const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const code = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
const positions = new Set();
const categories = new Set();
const playStyles = new Set();

players.forEach(p => {
  if (p.mainPosition) positions.add(p.mainPosition);
  if (p.category) categories.add(p.category);
  if (p.playStyle) playStyles.add(p.playStyle);
});

console.log("Positions:", Array.from(positions));
console.log("Categories:", Array.from(categories));
console.log("PlayStyles:", Array.from(playStyles));
