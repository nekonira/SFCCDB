const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataDir = path.join(__dirname, 'src', 'data');
const imageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));

console.log('--- Verifying K1 BEST11 2025 Image Variables ---');

const sandbox = { window: {} };
vm.createContext(sandbox);

imageFiles.forEach(file => {
  const code = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  try {
    vm.runInContext(code, sandbox);
  } catch (e) {}
});

const k1Vars = [
  'SABBAG_IMAGE', 'SONG_IMAGE', 'LEE_IMAGE', 'KANG_IMAGE',
  'KIM_IMAGE', 'PARK_IMAGE', 'HONG_IMAGE', 'LEE_MYUNG_JAE_IMAGE',
  'KIM_MOON_HWAN_IMAGE', 'SONG_BUM_KEUN_IMAGE', 'YAZAN_IMAGE'
];

k1Vars.forEach(varName => {
  const val = sandbox.window[varName];
  if (val && val.length > 100) {
    console.log(`OK: window.${varName} exists (${val.length} bytes)`);
  } else {
    console.log(`MISSING/EMPTY: window.${varName}`);
  }
});
