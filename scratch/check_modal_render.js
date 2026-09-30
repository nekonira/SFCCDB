const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Checking all occurrences of isSavedBuildsModalOpen ===');
lines.forEach((line, idx) => {
  if (line.includes('isSavedBuildsModalOpen') || line.includes('SavedBuildsModal')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
