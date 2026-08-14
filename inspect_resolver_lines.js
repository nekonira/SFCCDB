const fs = require('fs');
const path = require('path');

const appJs = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
const lines = appJs.split('\n');

const startIdx = lines.findIndex(l => l.includes('const getPlayerAvatarUrl ='));
const endIdx = lines.findIndex(l => l.includes('window.getPlayerAvatarUrl ='));

console.log(`getPlayerAvatarUrl lines in app.js: ${startIdx + 1} to ${endIdx + 1}`);

for (let i = startIdx; i <= endIdx; i++) {
  if (lines[i].includes('return window.')) {
    console.log(`Line ${i + 1}: ${lines[i].trim()}`);
  }
}
