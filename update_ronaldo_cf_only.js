const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cristiano Ronaldo (p02) to CF Only ---');

// Update subPositions to [] for p02
code = code.replace(
  /(id:\s*['"]p02['"][\s\S]*?subPositions:\s*)\[[^\]]*\]/,
  '$1[]'
);

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p2 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p02');
  console.log('SUCCESS! Cristiano Ronaldo (p02) positions updated:');
  console.log('Main Position:', p2.mainPosition);
  console.log('Sub Positions:', p2.subPositions);
} catch (err) {
  console.error('VM eval error:', err.message);
}
