const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Verifying p396 (ウスマン・デンベレ(フランスユニ)) Integration ===');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
const mockCode = fs.readFileSync(mockPath, 'utf-8');

const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log('Total players in database:', players.length);

const dembele = players.find(p => p.id === 'p396');
if (!dembele) {
  console.error('❌ p396 not found in mockData.js');
  process.exit(1);
}

console.log('✅ Player p396 found in mockData.js:');
console.log(JSON.stringify(dembele, null, 2));

// Verify image file exists
const imgJsPath = path.join(__dirname, '..', 'src', 'data', 'ousmaneDembeleFrance2026Image.js');
if (!fs.existsSync(imgJsPath)) {
  console.error('❌ Image JS file missing!');
  process.exit(1);
}
console.log('✅ Image JS file exists:', imgJsPath);

// Verify image variable in window
const imgCode = fs.readFileSync(imgJsPath, 'utf-8');
vm.runInContext(imgCode, sandbox);

if (sandbox.window.OUSMANE_DEMBELE_FRANCE_2026_IMAGE && sandbox.window.OUSMANE_DEMBELE_FRANCE_2026_IMAGE.startsWith('data:image/png;base64,')) {
  console.log('✅ Image Base64 loaded successfully (length:', sandbox.window.OUSMANE_DEMBELE_FRANCE_2026_IMAGE.length, ')');
} else {
  console.error('❌ Image Base64 failed to load!');
  process.exit(1);
}

// Verify index.html script tag
const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlCode = fs.readFileSync(htmlPath, 'utf-8');
if (htmlCode.includes('ousmaneDembeleFrance2026Image.js')) {
  console.log('✅ Script tag found in index.html');
} else {
  console.error('❌ Script tag missing in index.html!');
  process.exit(1);
}

console.log('\n🎉 ALL INTEGRATION TESTS PASSED!');
