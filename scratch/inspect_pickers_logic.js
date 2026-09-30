const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating Ability/Skill pickers in AutoSelectModal (L11465-L11660) ===');
for (let i = 11465; i < 11660 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
