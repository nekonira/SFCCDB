const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const code = fs.readFileSync(appJsxPath, 'utf-8');

const idx = code.indexOf("const isSelecao = activeComboData.id === 'selecao70';");
if (idx !== -1) {
  console.log(code.substring(idx - 50, idx + 900));
}
