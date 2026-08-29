const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

// Load all script files in index.html to populate window.*_IMAGE and INITIAL_PLAYERS
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

// Load mockData.js
const mockDataCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockDataCode, sandbox);

// Load app.js
const appJsCode = fs.readFileSync(path.join(rootDir, 'src', 'app.js'), 'utf-8');
vm.runInContext(appJsCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
let successCount = 0;
let failCount = 0;
const failures = [];

players.forEach(p => {
  const avatarUrl = sandbox.window.getPlayerAvatarUrl(p);
  if (avatarUrl && avatarUrl.startsWith('data:image')) {
    successCount++;
  } else {
    failCount++;
    failures.push({ id: p.id, name: p.name });
  }
});

console.log(`\n==================================================`);
console.log(` TOTAL VERIFICATION RESULT:`);
console.log(` Success: ${successCount} / ${players.length} players have valid images loaded!`);
console.log(` Failed:  ${failCount} players`);
console.log(`==================================================\n`);

if (failures.length > 0) {
  console.log('Players with missing/invalid image avatar:');
  failures.forEach(f => console.log(` - ${f.id}: ${f.name}`));
}
