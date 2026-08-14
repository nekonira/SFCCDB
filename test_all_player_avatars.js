const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TESTING ALL PLAYER AVATARS IN APP.JS ===');

// 1. Create sandbox with window
const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

// 2. Load all image JS files listed in index.html
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const scriptMatches = indexHtml.match(/src=["']\.\/src\/data\/([^"']+)["']/g) || [];

let loadedImageFiles = 0;
scriptMatches.forEach(match => {
  const fileName = match.replace(/src=["']\.\/src\/data\//, '').replace(/["']$/, '').split('?')[0];
  const filePath = path.join(__dirname, 'src', 'data', fileName);
  if (fs.existsSync(filePath)) {
    try {
      const code = fs.readFileSync(filePath, 'utf-8');
      vm.runInContext(code, sandbox);
      loadedImageFiles++;
    } catch (e) {
      console.error(`Error loading image file ${fileName}:`, e.message);
    }
  } else {
    console.error(`Image file not found: ${fileName}`);
  }
});
console.log(`Loaded ${loadedImageFiles} image JS files into sandbox.`);

// 3. Load mockData.js
const mockDataCode = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
vm.runInContext(mockDataCode, sandbox);

// 4. Load app.js
const appJsCode = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
vm.runInContext(appJsCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
console.log(`Total players in database: ${players.length}`);

let missingAvatarCount = 0;
const missingAvatarPlayers = [];

players.forEach(p => {
  const avatarUrl = sandbox.window.getPlayerAvatarUrl ? sandbox.window.getPlayerAvatarUrl(p) : (p.avatarUrl || '');
  if (!avatarUrl || avatarUrl.trim() === '') {
    missingAvatarCount++;
    missingAvatarPlayers.push(p);
  }
});

console.log(`\nResults:`);
console.log(`Players with valid avatar URL: ${players.length - missingAvatarCount} / ${players.length}`);
console.log(`Players missing avatar URL: ${missingAvatarCount}`);

if (missingAvatarPlayers.length > 0) {
  console.log('\nMissing avatar players list:');
  missingAvatarPlayers.forEach(p => {
    console.log(`- [${p.id}] ${p.name} (reading: ${p.readingName}, position: ${p.mainPosition})`);
  });
}
