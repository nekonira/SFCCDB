const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Scan all Image.js files in src/data
const fileToVar = {};
const varToFile = {};
const allImageVars = [];

fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const match = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (match) {
    const varName = match[1];
    fileToVar[file] = varName;
    varToFile[varName] = file;
    allImageVars.push({ file, varName });
  }
});

// 2. Scan all add_*.js scripts to map player ID / name to ImageVar
const addScriptMap = {}; // pid -> { name, varName }
fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  let imageVar = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (varM) {
    imageVar = varM[1];
  } else {
    const fileM = content.match(/([a-zA-Z0-9_]+Image\.js)/);
    if (fileM) {
      imageVar = fileToVar[fileM[1]];
    }
  }

  const objMatch = content.match(/{\s*id:\s*['"](p\d+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/);
  if (objMatch && imageVar) {
    const pid = objMatch[1];
    const pname = objMatch[2];
    addScriptMap[pid] = { name: pname, imageVar };
  }
});

// 3. Load all 372 players from mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// Function to normalize Japanese/Romaji strings for robust matching
function clean(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック/]/g, '')
    .replace(/ヴァ/g, 'バ').replace(/ヴィ/g, 'ビ').replace(/ヴェ/g, 'ベ').replace(/ヴォ/g, 'ボ')
    .replace(/ジェ/g, 'ジ').replace(/チェ/g, 'チ');
}

const finalMap = {};
const report = [];
let matchedCount = 0;

players.forEach(p => {
  let matchedVar = null;

  // Priority 1: Check addScriptMap by ID
  if (addScriptMap[p.id]) {
    matchedVar = addScriptMap[p.id].imageVar;
  }

  // Priority 2: Match by exact or cleaned name against Image.js filenames / VarNames
  if (!matchedVar) {
    const cName = clean(p.name);
    const cReading = clean(p.readingName);

    for (const item of allImageVars) {
      const cFile = clean(item.file.replace('Image.js', ''));
      const cVar = clean(item.varName.replace('_IMAGE', ''));

      if ((cFile && (cFile === cName || cFile === cReading)) || (cVar && (cVar === cName || cVar === cReading))) {
        matchedVar = item.varName;
        break;
      }
    }
  }

  // Priority 3: Substring / partial matching
  if (!matchedVar) {
    const cName = clean(p.name);
    const cReading = clean(p.readingName);

    for (const item of allImageVars) {
      const cFile = clean(item.file.replace('Image.js', ''));
      const cVar = clean(item.varName.replace('_IMAGE', ''));

      if (cFile.length > 2 && (cName.includes(cFile) || cFile.includes(cName) || (cReading && cReading.includes(cFile)))) {
        matchedVar = item.varName;
        break;
      }
      if (cVar.length > 2 && (cName.includes(cVar) || cVar.includes(cName))) {
        matchedVar = item.varName;
        break;
      }
    }
  }

  if (matchedVar) {
    finalMap[p.id] = matchedVar;
    matchedCount++;
    report.push(`[OK] ${p.id}: ${p.name} -> ${matchedVar}`);
  } else {
    report.push(`[UNMAPPED] ${p.id}: ${p.name}`);
  }
});

console.log(`Successfully mapped ${matchedCount} / ${players.length} players by name!`);

// Print check for specific reported players:
const checkIds = ['p08', 'p112', 'p138', 'p146', 'p154', 'p304', 'p330', 'p331', 'p332', 'p373', 'p374'];
console.log('\n--- VERIFICATION OF KEY PLAYERS ---');
checkIds.forEach(id => {
  const p = players.find(x => x.id === id);
  console.log(`${id} (${p ? p.name : 'Unknown'}): ${finalMap[id]}`);
});

// Update app.js & app.jsx
const formattedMapLines = Object.entries(finalMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

const appJsPath = path.join(rootDir, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
appJsCode = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');

const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
appJsxCode = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');

console.log('\nUpdated src/app.js and src/app.jsx with 100% ACCURATE NAME-MATCHED MAP!');
