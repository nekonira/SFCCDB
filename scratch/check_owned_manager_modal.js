const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('isOwnedManagerOpen') || line.includes('OwnedCardsManagerModal')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
