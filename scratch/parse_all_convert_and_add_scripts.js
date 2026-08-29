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

// 3. Scan ALL files in root directory (add_*.js, convert_*.ps1, update_*.js, etc.)
const scriptMapByPlayerId = {}; // pid -> varName
const scriptMapByName = {};     // playerName -> varName

fs.readdirSync(rootDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (ext !== '.js' && ext !== '.ps1' && ext !== '.py') return;
  if (file === 'app.js' || file === 'mockData.js') return;

  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');

  // Find player ID if present
  const idM = content.match(/id:\s*['"](p\d+)['"]/);
  // Find player name if present
  const nameM = content.match(/name:\s*['"]([^'"]+)['"]/);
  // Find image variable name
  let varName = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)/);
  if (varM) {
    varName = varM[1];
  } else {
    const imgJsM = content.match(/([a-zA-Z0-9_]+Image\.js)/i);
    if (imgJsM) {
      varName = fileToVar[imgJsM[1].toLowerCase()];
    }
  }

  if (varName) {
    if (idM) {
      scriptMapByPlayerId[idM[1]] = varName;
    }
    if (nameM) {
      scriptMapByName[nameM[1]] = varName;
    }
  }
});

console.log(`Mapped by ID: ${Object.keys(scriptMapByPlayerId).length} players.`);
console.log(`Mapped by Name: ${Object.keys(scriptMapByName).length} players.`);

// Combine mappings for every player in mockData.js
const fullMap = {};
let matchedCount = 0;

players.forEach(p => {
  let v = null;

  // 1. Direct ID match from scriptMapByPlayerId
  if (scriptMapByPlayerId[p.id]) {
    v = scriptMapByPlayerId[p.id];
  }
  // 2. Direct Name match from scriptMapByName
  if (!v && scriptMapByName[p.name]) {
    v = scriptMapByName[p.name];
  }
  // 3. Fallback name match
  if (!v) {
    for (const [sName, sVar] of Object.entries(scriptMapByName)) {
      if (p.name.includes(sName) || sName.includes(p.name)) {
        v = sVar;
        break;
      }
    }
  }

  if (v) {
    fullMap[p.id] = v;
    matchedCount++;
  } else {
    console.log(`[UNMATCHED] ${p.id}: ${p.name}`);
  }
});

console.log(`Total Mapped: ${matchedCount} / ${players.length}`);

// Print key reported players
const checkIds = ['p08', 'p112', 'p138', 'p146', 'p154', 'p304', 'p330', 'p331', 'p332', 'p373', 'p374'];
console.log('\n--- KEY PLAYERS VERIFICATION ---');
checkIds.forEach(id => {
  const p = players.find(x => x.id === id);
  console.log(`${id} (${p ? p.name : 'Unknown'}): ${fullMap[id]}`);
});
