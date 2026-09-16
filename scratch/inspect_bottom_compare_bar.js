const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

let pos = 0;
while ((pos = content.indexOf('compareList', pos + 1)) !== -1) {
  console.log('compareList at pos:', pos, ':', content.slice(Math.max(0, pos - 50), Math.min(content.length, pos + 150)));
}
