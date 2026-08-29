const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Collect all window.*_IMAGE variables and their source file names
const imageVars = {}; // varName -> fileName
const fileToVar = {}; // fileName -> varName

fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const match = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (match) {
    const varName = match[1];
    imageVars[varName] = file;
    fileToVar[file] = varName;
  }
});

// 2. Parse mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// 3. Extract PLAYER_IMAGE_MAP from src/app.js
const appJsCode = fs.readFileSync(path.join(rootDir, 'src', 'app.js'), 'utf-8');
const mapMatch = appJsCode.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
let currentMap = {};
if (mapMatch) {
  try {
    currentMap = eval('(' + mapMatch[1] + ')');
  } catch (e) {
    console.error('Error parsing PLAYER_IMAGE_MAP from app.js:', e);
  }
}

// 4. Also scan all add_*.js files to discover the intended mapping for each player!
const addScriptMap = {}; // player id / player name -> varName / image file
fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  const idMatch = content.match(/id:\s*['"](p\d+)['"]/);
  const imageJsMatch = content.match(/['"](.*Image\.js)['"]/);
  const varMatch = content.match(/window\.([A-Z0-9_]+_IMAGE)/);
  if (idMatch && (varMatch || imageJsMatch)) {
    const pid = idMatch[1];
    let v = varMatch ? varMatch[1] : null;
    if (!v && imageJsMatch) {
      v = fileToVar[path.basename(imageJsMatch[1])];
    }
    if (v) {
      addScriptMap[pid] = v;
    }
  }
});

console.log(`Found ${players.length} players in mockData.js`);
console.log(`Found ${Object.keys(imageVars).length} Image.js files`);
console.log(`Found ${Object.keys(addScriptMap).length} mappings from add_*.js scripts`);

const auditResults = [];
let mismatchCount = 0;

players.forEach(p => {
  const assignedVar = currentMap[p.id];
  const scriptVar = addScriptMap[p.id];
  
  // Verify if assignedVar exists in window
  const imageExists = assignedVar ? !!imageVars[assignedVar] : false;
  
  // Status check
  let status = 'OK';
  let note = '';
  
  if (!assignedVar) {
    status = 'MISSING_MAP';
    mismatchCount++;
  } else if (!imageExists) {
    status = 'INVALID_VAR';
    mismatchCount++;
  } else if (scriptVar && assignedVar !== scriptVar) {
    status = 'MISMATCH_WITH_SCRIPT';
    note = `(Script intended: ${scriptVar}, Assigned: ${assignedVar})`;
    mismatchCount++;
  }
  
  auditResults.push({
    id: p.id,
    name: p.name,
    readingName: p.readingName,
    assignedVar: assignedVar || 'NONE',
    scriptVar: scriptVar || 'NONE',
    status,
    note
  });
});

console.log(`\nAudit completed. Found ${mismatchCount} potential issues.\n`);

auditResults.filter(r => r.status !== 'OK').forEach(r => {
  console.log(`[${r.status}] ${r.id}: ${r.name} (${r.readingName}) | AppMap: ${r.assignedVar} | AddScript: ${r.scriptVar} ${r.note}`);
});

fs.writeFileSync(path.join(rootDir, 'scratch', 'full_player_audit_report.json'), JSON.stringify(auditResults, null, 2), 'utf-8');
