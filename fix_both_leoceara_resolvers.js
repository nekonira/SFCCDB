const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING LEO CEARA RESOLVERS (p115 vs p263) ===');

const p263Check = `  if (player.id === 'p263' || (player.name && player.name.includes('2026TS') && (player.name.includes('レオ・セアラ') || player.name.includes('Leo Ceara')))) {\n    return window.LEO_CEARA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const p115Check = `  if (player.id === 'p115' || (player.name && (player.name.includes('BEST11') || player.name.includes('2025')) && (player.name.includes('レオ・セアラ') || player.name.includes('Leo Ceara') || player.name.includes('セアラ'))) || (player.name && (player.name.includes('レオ・セアラ') || player.name.includes('Leo Ceara') || player.name.includes('セアラ')) && !player.name.includes('2026TS'))) {\n    return window.LEO_CEARA_IMAGE || player.avatarUrl || '';\n  }`;

function applyFixToFile(fileName) {
  const filePath = path.join(__dirname, 'src', fileName);
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');

  // Remove any existing LEO_CEARA_2026_IMAGE or LEO_CEARA_IMAGE blocks
  const lines = code.split('\n');
  const cleanedLines = [];
  let skip = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('LEO_CEARA_2026_IMAGE') || line.includes('LEO_CEARA_IMAGE')) {
      // Remove this block (if statement before it if any, and return line)
      if (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].trim().startsWith('if')) {
        cleanedLines.pop();
      }
      if (i + 1 < lines.length && lines[i + 1].trim() === '}') {
        i++; // skip closing brace
      }
      continue;
    }
    cleanedLines.push(line);
  }

  let cleanedCode = cleanedLines.join('\n');

  // Insert both checks right after function getPlayerAvatarUrl declaration
  const target = 'function getPlayerAvatarUrl(player) {';
  const altTarget = 'const getPlayerAvatarUrl = (player) => {';
  const activeTarget = cleanedCode.includes(target) ? target : (cleanedCode.includes(altTarget) ? altTarget : null);

  if (activeTarget) {
    const pos = cleanedCode.indexOf(activeTarget) + activeTarget.length;
    cleanedCode = cleanedCode.substring(0, pos) + '\n' + p263Check + '\n' + p115Check + cleanedCode.substring(pos);
    fs.writeFileSync(filePath, cleanedCode, 'utf-8');
    console.log(`Successfully patched ${fileName}`);
  } else {
    console.error(`Could not find function getPlayerAvatarUrl in ${fileName}`);
  }
}

applyFixToFile('app.js');
applyFixToFile('app.jsx');

// Verify with JS execution
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

const startIdx = appJsCode.indexOf('function getPlayerAvatarUrl');
const endIdx = appJsCode.indexOf('function ', startIdx + 10);
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
