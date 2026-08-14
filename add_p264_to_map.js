const fs = require('fs');
const path = require('path');

console.log('=== UPDATING PLAYER_IMAGE_MAP FOR p264 ===');

function updateMapInFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  if (!code.includes('"p264": "YAMAGISHI_2026_TS_IMAGE"')) {
    code = code.replace(
      '"p263": "LEO_CEARA_2026_IMAGE"',
      '"p263": "LEO_CEARA_2026_IMAGE",\n  "p264": "YAMAGISHI_2026_TS_IMAGE"'
    );
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`Updated ${fileName} with p264 mapping.`);
  } else {
    console.log(`${fileName} already contains p264 mapping.`);
  }
}

updateMapInFile('app.js');
updateMapInFile('app.jsx');
