const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

if (html.indexOf('sasaki2026Image.js') === -1) {
  html = html.replace('<script src="./src/data/tono2026Image.js"></script>', '<script src="./src/data/sasaki2026Image.js"></script>\n  <script src="./src/data/tono2026Image.js"></script>');
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log('Successfully added sasaki2026Image.js to index.html!');
} else {
  console.log('sasaki2026Image.js is present');
}
