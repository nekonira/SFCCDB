const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Lionel Messi (Haifu) (p112) subPositions to include CF ---');

// Replace subPositions for p112
code = code.replace(
  /(id:\s*['"]p112['"][\s\S]*?subPositions:\s*)\[[^\]]*\]/,
  "$1['CF']"
);

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p112 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p112');
  console.log('SUCCESS! Updated Lionel Messi (Haifu) (p112) positions:');
  console.log('Main Position:', p112.mainPosition);
  console.log('Sub Positions:', p112.subPositions);
} catch (err) {
  console.error('VM eval error:', err.message);
}
