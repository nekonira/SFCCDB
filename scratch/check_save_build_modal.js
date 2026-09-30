const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating isSaveBuildModalOpen occurrences ===');
lines.forEach((line, idx) => {
  if (line.includes('isSaveBuildModalOpen') || line.includes('handleOpenSaveBuildModal')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
