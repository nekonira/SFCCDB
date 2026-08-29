const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
const scriptMatches = indexHtml.match(/src=["']\.\/src\/data\/([^"']+)["']/g) || [];

scriptMatches.forEach(match => {
  const fileName = match.replace(/src=["']\.\/src\/data\//, '').replace(/["']$/, '').split('?')[0];
  const filePath = path.join(dataDir, fileName);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf-8');
    vm.runInContext(code, sandbox);
  }
});

const players = sandbox.window.INITIAL_PLAYERS || [];
const p377 = players.find(p => p.id === 'p377');

console.log(`Total players in mockData.js: ${players.length}`);
console.log('p377 Player Data:', p377);
console.log('window.SONG_MIN_KYU_2025_IMAGE loaded:', sandbox.window.SONG_MIN_KYU_2025_IMAGE ? 'YES (Valid Base64) ✅' : 'NO ❌');
