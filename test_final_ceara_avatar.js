const fs = require('fs');
const path = require('path');
const vm = require('vm');

function testFile(fileName) {
  const code = fs.readFileSync(path.join(__dirname, 'src', fileName), 'utf-8');
  
  const startIdx = code.indexOf('const getPlayerAvatarUrl =');
  const endIdx = code.indexOf('window.getPlayerAvatarUrl =', startIdx);
  const funcCode = code.substring(startIdx, endIdx);

  const windowObj = {
    LEO_CEARA_IMAGE: 'DATA_URL_FOR_J1_BEST11_2025',
    LEO_CEARA_2026_IMAGE: 'DATA_URL_FOR_2026TS'
  };

  const sandbox = {
    React: {},
    window: windowObj,
    console: console
  };
  vm.createContext(sandbox);

  vm.runInContext(funcCode + '\nthis.getPlayerAvatarUrl = getPlayerAvatarUrl;', sandbox);

  const p115 = { id: 'p115', name: 'レオ・セアラ(J1 BEST11 2025)' };
  const p263 = { id: 'p263', name: 'レオ・セアラ(2026TS)' };

  const avatar115 = sandbox.getPlayerAvatarUrl(p115);
  const avatar263 = sandbox.getPlayerAvatarUrl(p263);

  console.log(`=== Test Results for ${fileName} ===`);
  console.log('p115 (J1 BEST11 2025) avatar:', avatar115);
  console.log('p263 (2026TS) avatar:', avatar263);

  if (avatar115 === 'DATA_URL_FOR_J1_BEST11_2025' && avatar263 === 'DATA_URL_FOR_2026TS') {
    console.log(`SUCCESS for ${fileName}!`);
  } else {
    console.error(`FAILURE for ${fileName}!`);
    process.exit(1);
  }
}

testFile('app.js');
