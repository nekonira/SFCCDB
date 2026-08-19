const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== VERIFYING ALL 2026TS PLAYERS AVATAR RESOLUTION ===');

const sandbox = { window: {}, React: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

// 1. Read mockData.js
const mockDataCode = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
vm.runInContext(mockDataCode, sandbox);

// 2. Read TS Image files into sandbox
const tsImageFiles = [
  'yamagishi2026TSImage.js',
  'yamadaHiroto2026TSImage.js',
  'tamuraShota2026TSImage.js',
  'toshidaYusei2026TSImage.js',
  'izumiToya2026TSImage.js',
  'yamamotoOuta2026TSImage.js'
];

tsImageFiles.forEach(file => {
  const code = fs.readFileSync(path.join(__dirname, 'src', 'data', file), 'utf-8');
  vm.runInContext(code, sandbox);
});

// 3. Read app.js
const appJsCode = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
vm.runInContext(appJsCode, sandbox);

const tsIds = ['p264', 'p265', 'p266', 'p267', 'p268', 'p269'];
let allPassed = true;

tsIds.forEach(id => {
  const player = sandbox.window.INITIAL_PLAYERS.find(p => p.id === id);
  if (!player) {
    console.error(`Player ${id} NOT FOUND in INITIAL_PLAYERS`);
    allPassed = false;
    return;
  }
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(player);
  const ok = avatarUrl && avatarUrl.startsWith('data:image/');
  console.log(`${player.id} (${player.name}): Avatar Resolved = ${ok ? 'SUCCESS' : 'FAILED'}`);
  if (!ok) allPassed = false;
});

if (allPassed) {
  console.log('=== ALL 2026TS PLAYER IMAGES RESOLVED PERFECTLY ===');
} else {
  console.error('=== SOME TS PLAYER AVATARS FAILED ===');
  process.exit(1);
}
