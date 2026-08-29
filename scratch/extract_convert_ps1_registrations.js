const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Scan all Image.js files to get filename -> window variable
const fileToVar = {};
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const match = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (match) {
    fileToVar[file.toLowerCase()] = match[1];
  }
});

// 2. Load all 372 players from mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// 3. Scan convert_*.ps1 files
const ps1Map = {}; // baseName -> varName

fs.readdirSync(rootDir).filter(f => f.startsWith('convert_') && f.endsWith('.ps1')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)/);
  const outPathM = content.match(/([a-zA-Z0-9_]+Image\.js)/i);

  let varName = varM ? varM[1] : null;
  if (!varName && outPathM) {
    varName = fileToVar[outPathM[1].toLowerCase()];
  }

  if (varName) {
    const baseKey = file.replace('convert_', '').replace('.ps1', '').toLowerCase().replace(/_/g, '');
    ps1Map[baseKey] = varName;
  }
});

console.log(`Parsed ${Object.keys(ps1Map).length} convert_*.ps1 files.`);

// Normalize strings for matching
function clean(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック/]/g, '')
    .replace(/ヴァ/g, 'バ').replace(/ヴィ/g, 'ビ').replace(/ヴェ/g, 'ベ').replace(/ヴォ/g, 'ボ')
    .replace(/ジェ/g, 'ジ').replace(/チェ/g, 'チ');
}

// Check matching for p01 to p187
const basePlayerMap = {};
let matchCount = 0;

players.slice(0, 187).forEach(p => {
  let v = null;
  const pName = clean(p.name);
  const pReading = clean(p.readingName);

  for (const [key, varName] of Object.entries(ps1Map)) {
    if (key.length > 2 && (pName.includes(key) || key.includes(pName) || pReading.includes(key))) {
      v = varName;
      break;
    }
  }

  if (v) {
    basePlayerMap[p.id] = v;
    matchCount++;
  } else {
    console.log(`[BASE UNMATCHED] ${p.id}: ${p.name}`);
  }
});

console.log(`Matched ${matchCount} / 187 base players from convert_*.ps1 files.`);
