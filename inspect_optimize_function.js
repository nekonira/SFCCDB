const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const idx = code.indexOf("function optimizeSpecialCardSlots");
if (idx !== -1) {
  console.log(code.substring(idx, idx + 2500));
} else {
  console.log('optimizeSpecialCardSlots function declaration not found');
}
