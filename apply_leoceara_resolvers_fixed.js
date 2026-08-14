const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== APPLYING FIXED LEO CEARA RESOLVERS (p115 vs p263) ===');

const p263Check = `  if (player.id === 'p263' || (player.name && player.name.includes('2026TS') && (player.name.includes('レオ・セアラ') || player.name.includes('Leo Ceara')))) {\n    return window.LEO_CEARA_2026_IMAGE || player.avatarUrl || '';\n  }`;

function updateFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  // Insert p263Check right after `if (!player) return '';`
  const target = "if (!player) return '';";
  if (code.includes(target) && !code.includes("player.id === 'p263'")) {
    code = code.replace(target, target + '\n' + p263Check);
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`Successfully updated ${fileName}`);
  } else {
    console.log(`${fileName} already has p263 check or target not found.`);
  }
}

updateFile('app.js');
updateFile('app.jsx');

// Verify with VM
const appJsCode = fs.readFileSync(path.join(__dirname, 'src', 'app.js'), 'utf-8');
const sandbox = {
  React: {},
  window: {
    LEO_CEARA_IMAGE: 'DATA_URL_FOR_J1_BEST11_2025',
    LEO_CEARA_2026_IMAGE: 'DATA_URL_FOR_2026TS'
  }
};
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

const startIdx = appJsCode.indexOf('const getPlayerAvatarUrl =');
const endIdx = appJsCode.indexOf('window.getPlayerAvatarUrl =', startIdx);
const funcCode = appJsCode.substring(startIdx, endIdx);

vm.runInContext(funcCode + '\nthis.getPlayerAvatarUrl = getPlayerAvatarUrl;', sandbox);

const p115 = { id: 'p115', name: 'レオ・セアラ(J1 BEST11 2025)' };
const p263 = { id: 'p263', name: 'レオ・セアラ(2026TS)' };

const avatar115 = sandbox.getPlayerAvatarUrl(p115);
const avatar263 = sandbox.getPlayerAvatarUrl(p263);

console.log('Result for p115 (J1 BEST11 2025):', avatar115);
console.log('Result for p263 (2026TS):', avatar263);

if (avatar115 === 'DATA_URL_FOR_J1_BEST11_2025' && avatar263 === 'DATA_URL_FOR_2026TS') {
  console.log('✅ PERFECT! Both players now return their distinct card images!');
} else {
  console.error('❌ Mismatch detected!');
  process.exit(1);
}
