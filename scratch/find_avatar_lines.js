const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'app.js');
const appCode = fs.readFileSync(appPath, 'utf-8');

const lines = appCode.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('getPlayerAvatarUrl')) {
    console.log(`L${idx + 1}: ${line.substring(0, 120)}`);
  }
});
