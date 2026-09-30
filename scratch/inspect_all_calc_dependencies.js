const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Locating calcA and calcB useMemos (L8920-L8940) ===');
for (let i = 8920; i < 8940 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}

console.log('\n=== Locating AutoSelectModal props passing (L10335-L10355) ===');
for (let i = 10335; i < 10355 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
