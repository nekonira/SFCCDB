const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Cleaning garbled text in mockData.js ---');

// Replace garbled rank / text patterns
code = code.replace(/rank:\s*['"][^'"]*驫[^'"]*['"]/g, "rank: '銅'");
code = code.replace(/rank:\s*['"][^'"]* Wait[^'"]*['"]/g, "rank: '銀'");
code = code.replace(/rank:\s*['"][^'"]* 閾[^'"]*['"]/g, "rank: '金'");

// Clean UTF-8 replacement characters
code = code.replace(/[\uFFFD]/g, '');

fs.writeFileSync(mockPath, code, 'utf-8');

const sandbox = { window: {} };
try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const count = sandbox.window.INITIAL_PLAYERS.length;
  console.log(`\nSUCCESS! Evaluated mockData.js cleanly! TOTAL PLAYERS: ${count}`);
} catch (err) {
  console.error('VM Eval Error:', err.message);
  // find line of error
  const match = err.stack.match(/evalmachine\.<anonymous>:(\d+)/);
  if (match) {
    const lineNum = parseInt(match[1]);
    const lines = code.split('\n');
    console.error(`Error at line ${lineNum}:`, lines[lineNum - 1]);
  }
}
