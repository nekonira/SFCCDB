const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Hayato Araki 2026 (p149) maxOverall to 14684 ---');

// Replace maxOverall: 15192 for p149
code = code.replace(
  /(id:\s*['"]p149['"][\s\S]*?)maxOverall:\s*15192/g,
  '$1maxOverall: 14684'
);

code = code.replace(
  /(id:\s*['"]p149['"][\s\S]*?maxEnhanced:\s*\{\s*)overall:\s*15192/,
  '$1overall: 14684'
);

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p149 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p149');
  console.log('SUCCESS! Updated Hayato Araki 2026 (p149) overall values:');
  console.log('Name:', p149.name);
  console.log('Base Overall:', p149.overall);
  console.log('Catalog / Max Overall:', p149.maxOverall);
  console.log('MaxEnhanced Overall:', p149.maxEnhanced.overall);
} catch (err) {
  console.error('VM eval error:', err.message);
}
