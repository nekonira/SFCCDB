const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Load mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// 2. Load current app.js MAP
const appJsCode = fs.readFileSync(path.join(rootDir, 'src', 'app.js'), 'utf-8');
const mapMatch = appJsCode.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
const currentAppMap = eval('(' + mapMatch[1] + ')');

// 3. Scan all add_*.js and convert_*.ps1 files
const registeredMapById = {};
const registeredMapByName = {};

fs.readdirSync(rootDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (ext !== '.js' && ext !== '.ps1') return;
  if (file === 'app.js' || file === 'mockData.js' || file.startsWith('test_') || file.startsWith('build_') || file.startsWith('apply_')) return;

  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');

  // Extract ID if present
  const idM = content.match(/id:\s*['"](p\d+)['"]/);
  // Extract Name if present
  const nameM = content.match(/name:\s*['"]([^'"]+)['"]/);
  // Extract variable name or image.js filename
  let varName = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)/);
  if (varM) {
    varName = varM[1];
  }

  if (varName) {
    if (idM) registeredMapById[idM[1]] = { varName, file };
    if (nameM) registeredMapByName[nameM[1]] = { varName, file };
  }
});

console.log(`Players in mockData.js: ${players.length}`);
console.log(`Registered add scripts by ID: ${Object.keys(registeredMapById).length}`);
console.log(`Registered add scripts by Name: ${Object.keys(registeredMapByName).length}`);

let totalMismatches = 0;
const diffReport = [];

players.forEach((p, index) => {
  const currentVar = currentAppMap[p.id];
  const registeredById = registeredMapById[p.id] ? registeredMapById[p.id].varName : null;
  const registeredByName = registeredMapByName[p.name] ? registeredMapByName[p.name].varName : null;

  // Determine intended variable
  let intendedVar = registeredById || registeredByName || null;

  if (intendedVar && currentVar !== intendedVar) {
    totalMismatches++;
    diffReport.push({
      index: index + 1,
      id: p.id,
      name: p.name,
      currentVar: currentVar || 'NONE',
      intendedVar: intendedVar,
      scriptFile: (registeredById ? registeredMapById[p.id].file : registeredMapByName[p.name].file)
    });
  }
});

console.log(`\nFound ${totalMismatches} MISMATCHES between current app.js map and registered scripts!\n`);

diffReport.forEach(d => {
  console.log(`[MISMATCH #${d.index}] ${d.id} (${d.name}): Current -> '${d.currentVar}' | Intended -> '${d.intendedVar}' (${d.scriptFile})`);
});
