const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- UPDATING AND VERIFYING PLAYER p384 (小川航基) ---');

const appJsPath = path.join(__dirname, '..', 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p384":') && !appJsCode.includes('"p384"')) {
  if (appJsCode.includes('"p383":"PUJON_HAIFU_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p383":"PUJON_HAIFU_2026_IMAGE"',
      '"p383":"PUJON_HAIFU_2026_IMAGE","p384":"KOKI_OGAWA_2026_IMAGE"'
    );
  } else if (appJsCode.includes('"p383": "PUJON_HAIFU_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p383": "PUJON_HAIFU_2026_IMAGE"',
      '"p383": "PUJON_HAIFU_2026_IMAGE", "p384": "KOKI_OGAWA_2026_IMAGE"'
    );
  } else {
    // Replace end of PLAYER_IMAGE_MAP object
    appJsCode = appJsCode.replace(
      '"PUJON_HAIFU_2026_IMAGE"}',
      '"PUJON_HAIFU_2026_IMAGE","p384":"KOKI_OGAWA_2026_IMAGE"}'
    );
  }
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('Updated src/app.js with p384 mapping.');
} else {
  console.log('src/app.js already contains p384 mapping.');
}

// Check verification
console.log('app.js mapping check:', appJsCode.includes('"p384"'));
