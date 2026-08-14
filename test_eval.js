const fs = require('fs');
const vm = require('vm');
const path = require('path');

console.log('--- Testing mockData.js evaluation ---');
try {
  const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
  const code = fs.readFileSync(mockPath, 'utf-8');
  const sandbox = { window: {} };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  console.log('mockData.js successfully evaluated!');
  console.log('Total players in window.INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS ? sandbox.window.INITIAL_PLAYERS.length : 0);
  if (sandbox.window.INITIAL_PLAYERS) {
    const p156 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p156');
    console.log('p156 found:', p156 ? p156.name : 'NOT FOUND');
  }
} catch (err) {
  console.error('ERROR evaluating mockData.js:', err);
}

console.log('\n--- Testing index.html structure ---');
try {
  const indexPath = path.join(__dirname, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf-8');
  console.log('index.html size:', html.length);
} catch (err) {
  console.error('ERROR reading index.html:', err);
}
