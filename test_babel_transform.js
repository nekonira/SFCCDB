const fs = require('fs');
const path = require('path');
const vm = require('vm');

const cwd = __dirname;
const babelPath = path.join(cwd, 'src', 'lib', 'babel.min.js');
const appJsxPath = path.join(cwd, 'src', 'app.jsx');
const mockDataPath = path.join(cwd, 'src', 'data', 'mockData.js');

console.log('--- Testing Babel compilation of app.jsx & mockData.js ---');

try {
  const babelCode = fs.readFileSync(babelPath, 'utf-8');
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(babelCode, sandbox);
  const Babel = sandbox.Babel;

  console.log('Babel version loaded:', Babel ? 'OK' : 'FAILED');

  // Test 1: mockData.js JS evaluation
  console.log('\nTesting mockData.js evaluation...');
  const mockCode = fs.readFileSync(mockDataPath, 'utf-8');
  const mockSandbox = { window: {} };
  mockSandbox.window = mockSandbox;
  vm.createContext(mockSandbox);
  vm.runInContext(mockCode, mockSandbox);
  console.log('mockData.js evaluated successfully! Total players:', mockSandbox.window.INITIAL_PLAYERS.length);

  // Test 2: app.jsx Babel transform
  console.log('\nTesting app.jsx Babel transform...');
  const appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  const appResult = Babel.transform(appJsxCode, {
    presets: [['react', { runtime: 'classic' }]]
  });
  console.log('app.jsx Babel transform SUCCESS! Output length:', appResult.code.length);

} catch (err) {
  console.error('\n!!! DIAGNOSTIC ERROR DETECTED !!!');
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
}
