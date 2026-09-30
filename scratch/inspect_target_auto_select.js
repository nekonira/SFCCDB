const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating 条件指定 / AutoSelectModal triggers in app.jsx ===');
lines.forEach((line, idx) => {
  if (line.includes('条件指定') || line.includes('AutoSelectModal') || line.includes('isAutoSelectModalOpen')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
