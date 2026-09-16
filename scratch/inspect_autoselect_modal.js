const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const idx = content.indexOf('function AutoSelectModal');
if (idx !== -1) {
  console.log(content.slice(idx, idx + 4000));
} else {
  console.log('AutoSelectModal not found');
}
