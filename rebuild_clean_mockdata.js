const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
console.log('--- Verifying & Rebuilding mockData.js ---');

const code = fs.readFileSync(mockPath, 'utf-8');
const sandbox = { window: {} };

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  console.log('mockData.js JS evaluation: OK!');
  console.log('INITIAL_PLAYERS count:', sandbox.window.INITIAL_PLAYERS ? sandbox.window.INITIAL_PLAYERS.length : 0);
  console.log('STATUS: mockData.js is 100% VALID and clean!');
} catch (err) {
  console.error('Syntax error in mockData.js:', err.message);
  // Re-extract from restore_all_players.py
  const pyPath = path.join(__dirname, 'restore_all_players.py');
  const pyContent = fs.readFileSync(pyPath, 'utf-8');
  const startIdx = pyContent.indexOf('js_code = """') + 'js_code = """'.length;
  const endIdx = pyContent.lastIndexOf('"""');
  const cleanCode = pyContent.substring(startIdx, endIdx).trim();
  fs.writeFileSync(mockPath, cleanCode, 'utf-8');
  console.log('Rebuilt clean mockData.js from restore_all_players.py!');
}
