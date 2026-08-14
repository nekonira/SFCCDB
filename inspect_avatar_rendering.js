const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const text = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Searching for Avatar Rendering in src/app.jsx ---');

const lines = text.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('avatar') || line.includes('avatarUrl') || line.includes('<img') || line.includes('onError')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
