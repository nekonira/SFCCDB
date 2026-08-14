const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const dataDir = path.join(__dirname, 'src', 'data');
const babelPath = path.join(__dirname, 'src', 'lib', 'babel.min.js');

console.log('--- Testing K1 BEST11 2025 Avatar Resolution in Node VM ---');

const babelCode = fs.readFileSync(babelPath, 'utf-8');
const sandbox = {
  window: {},
  console,
  React: { useState: () => [false, () => {}], useEffect: () => {} }
};
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);

// Load all image files into window sandbox
const imageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));
imageFiles.forEach(file => {
  const code = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  try {
    vm.runInContext(code, sandbox);
  } catch (e) {}
});

// Load mockData.js into window sandbox
const mockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(mockCode, sandbox);

// Transpile app.jsx and run
const appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
const appResult = sandbox.Babel.transform(appJsxCode, {
  presets: [['react', { runtime: 'classic' }]]
});
vm.runInContext(appResult.code, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const k1Players = players.filter(p => p.id >= 'p138' && p.id <= 'p148');

console.log(`Testing ${k1Players.length} K1 BEST11 2025 players avatar resolution:`);

let resolvedCount = 0;
k1Players.forEach(p => {
  const url = sandbox.window.getPlayerAvatarUrl ? sandbox.window.getPlayerAvatarUrl(p) : '';
  if (url && url.startsWith('data:image')) {
    resolvedCount++;
    console.log(`OK: [${p.id}] ${p.name} -> Resolved image (${url.length} bytes)`);
  } else {
    console.log(`FAIL: [${p.id}] ${p.name} -> '${url}'`);
  }
});

console.log(`\n🎉 RESOLVED ${resolvedCount} / ${k1Players.length} K1 BEST11 2025 PLAYER IMAGES!`);
