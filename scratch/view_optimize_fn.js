const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');

const idx = content.indexOf('function optimizeSpecialCardSlots');
if (idx !== -1) {
  console.log(content.slice(idx, idx + 2500));
} else {
  console.log('function optimizeSpecialCardSlots not found');
}
