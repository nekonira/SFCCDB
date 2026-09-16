const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

let pos = -1;
while ((pos = content.indexOf('acquiredItems', pos + 1)) !== -1) {
  console.log('acquiredItems at pos:', pos, ':', content.slice(Math.max(0, pos - 80), Math.min(content.length, pos + 150)));
}
