const fs = require('fs');
const path = require('path');
const vm = require('vm');

const code = fs.readFileSync(path.join(__dirname, 'extracted_d5a_mockdata.js'), 'utf-8');
const sandbox = { window: {} };
sandbox.window = sandbox;

vm.createContext(sandbox);

try {
  vm.runInContext(code, sandbox);
  const players = sandbox.INITIAL_PLAYERS || sandbox.window.INITIAL_PLAYERS || [];
  console.log(`SUCCESS! Loaded ${players.length} players from extracted_d5a_mockdata.js:`);
  players.forEach((p, i) => console.log(`  [${i+1}] ${p.id}: ${p.name}`));
} catch (e) {
  console.error('VM Error:', e.message);
}
