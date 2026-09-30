const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const idx = code.indexOf("id: '433b_laRoja26'");
if (idx !== -1) {
  const endIdx = code.indexOf("}", code.indexOf("]", idx));
  console.log(code.substring(idx - 10, endIdx + 2));
} else {
  console.log('433b_laRoja26 not found');
}
