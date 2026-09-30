const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.jsx'), 'utf-8');
const lines = code.split('\n');

console.log('=== Print singleCompare header and buttons (L9465-L9530) ===');
for (let i = 9465; i < 9530 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
