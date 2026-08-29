const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

// 1. Load all script files in index.html to populate window.*_IMAGE and INITIAL_PLAYERS
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
const scriptMatches = indexHtml.match(/src=["']\.\/src\/data\/([^"']+)["']/g) || [];

scriptMatches.forEach(match => {
  const fileName = match.replace(/src=["']\.\/src\/data\//, '').replace(/["']$/, '').split('?')[0];
  const filePath = path.join(dataDir, fileName);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf-8');
    vm.runInContext(code, sandbox);
  }
});

// Load mockData.js
const mockDataCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockDataCode, sandbox);

// Load current PLAYER_IMAGE_MAP from app.js
const appJsPath = path.join(rootDir, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
const currentMapMatch = appJsCode.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
const currentMap = eval('(' + currentMapMatch[1] + ')');

// Get all loaded window image variables
const loadedImageVars = Object.keys(sandbox.window).filter(k => k.endsWith('_IMAGE'));

const players = sandbox.window.INITIAL_PLAYERS || [];

// Helper to normalize strings for comparison
function norm(str) {
  return str.toLowerCase().replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '');
}

players.forEach(p => {
  const currentVar = currentMap[p.id];
  if (!currentVar || !sandbox.window[currentVar]) {
    // Find best match in loadedImageVars
    const pNameNorm = norm(p.name);
    const pReadingNorm = norm(p.readingName || '');
    
    let bestMatch = null;
    
    for (const imgVar of loadedImageVars) {
      const varNorm = norm(imgVar.replace('_IMAGE', ''));
      if (varNorm && (pNameNorm.includes(varNorm) || varNorm.includes(pNameNorm) || pReadingNorm.includes(varNorm) || varNorm.includes(pReadingNorm))) {
        bestMatch = imgVar;
        break;
      }
    }

    if (bestMatch) {
      console.log(`[FIXED] ${p.id} (${p.name}): '${currentVar}' -> '${bestMatch}'`);
      currentMap[p.id] = bestMatch;
    } else {
      console.log(`[STILL MISSING] ${p.id} (${p.name})`);
    }
  }
});

// Save updated map back to app.js and app.jsx
const formattedMapLines = Object.entries(currentMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

appJsCode = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');

const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
appJsxCode = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');

console.log('\nUpdated PLAYER_IMAGE_MAP in app.js and app.jsx!');
