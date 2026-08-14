const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING LEO CEARA (J1 BEST11 2025) IMAGE (p115) ===');

// 1. Convert new image to src/data/leoCearaImage.js
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786508655038.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'leoCearaImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LEO_CEARA_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. src/data/leoCearaImage.js updated. Size:', fs.statSync(imageJsPath).size);

// 2. Fix app.js and app.jsx avatar resolvers so p263 (2026TS) and p115 (J1 BEST11 2025) do not conflict
const p263CheckStrict = `  if (player.id === 'p263' || (player.name && player.name.includes('2026TS') && (player.name.includes('レオ・セアラ') || player.name.includes('Leo Ceara')))) {\n    return window.LEO_CEARA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const p115CheckStrict = `  if (player.id === 'p115' || (player.name && (player.name.includes('BEST11') || player.name.includes('2025')) && (player.name.includes('セアラ') || player.name.includes('Leo Ceara') || player.name.includes('Ceara'))) || (player.name && (player.name.includes('セアラ') || player.name.includes('Leo Ceara')) && !player.name.includes('2026TS'))) {\n    return window.LEO_CEARA_IMAGE || player.avatarUrl || '';\n  }`;

function updateResolverInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf-8');
  
  // Replace old p263 block if present
  const oldP263Match = /if\s*\(\s*player\.id\s*===\s*['"]p263['"][\s\S]*?return\s+window\.LEO_CEARA_2026_IMAGE[\s\S]*?\}/;
  if (oldP263Match.test(code)) {
    code = code.replace(oldP263Match, p263CheckStrict.trim());
  }

  // Replace old p115 / Ceara block if present
  const oldP115Match = /if\s*\(\s*\(?player\.name[\s\S]*?includes\(['"]セアラ['"]\)[\s\S]*?return\s+window\.LEO_CEARA_IMAGE[\s\S]*?\}/;
  if (oldP115Match.test(code)) {
    code = code.replace(oldP115Match, p115CheckStrict.trim());
  }

  fs.writeFileSync(filePath, code, 'utf-8');
  console.log(`Updated resolver in ${path.basename(filePath)}`);
}

updateResolverInFile(path.join(__dirname, 'src', 'app.js'));
updateResolverInFile(path.join(__dirname, 'src', 'app.jsx'));

// 3. Verification using VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);

const image2026 = fs.readFileSync(path.join(__dirname, 'src', 'data', 'leoCeara2026Image.js'), 'utf-8');
vm.runInContext(image2026, sandbox);

const image2025 = fs.readFileSync(path.join(__dirname, 'src', 'data', 'leoCearaImage.js'), 'utf-8');
vm.runInContext(image2025, sandbox);

const p115 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p115');
const p263 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p263');

console.log('Verification:');
console.log('p115 (J1 BEST11 2025):', p115 ? p115.name : 'NOT FOUND');
console.log('p263 (2026TS):', p263 ? p263.name : 'NOT FOUND');
console.log('LEO_CEARA_IMAGE size:', sandbox.window.LEO_CEARA_IMAGE.length);
console.log('LEO_CEARA_2026_IMAGE size:', sandbox.window.LEO_CEARA_2026_IMAGE.length);
