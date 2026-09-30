const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const idx = code.indexOf("{comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0 && (");
if (idx !== -1) {
  console.log(code.substring(idx - 100, idx + 800));
}
