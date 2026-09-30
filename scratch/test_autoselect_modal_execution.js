const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');

console.log('=== Checking AutoSelectModal and optimizeSpecialCardSlots in compiled app.js ===');

// Search for optimizeSpecialCardSlots in app.js
const idx = code.indexOf('function optimizeSpecialCardSlots');
if (idx !== -1) {
  console.log('optimizeSpecialCardSlots found in app.js!');
  console.log(code.substring(idx, idx + 250));
} else {
  console.log('optimizeSpecialCardSlots NOT found in app.js');
}

// Search for AutoSelectModal in app.js
const idx2 = code.indexOf('function AutoSelectModal');
if (idx2 !== -1) {
  console.log('AutoSelectModal found in app.js!');
  console.log(code.substring(idx2, idx2 + 250));
} else {
  console.log('AutoSelectModal NOT found in app.js');
}
