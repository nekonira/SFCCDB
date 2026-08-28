const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Original verified explicit map (p01 - p263)
const verifyCode = fs.readFileSync(path.join(rootDir, 'verify_exact_image_vars.js'), 'utf-8');
const mapMatch = verifyCode.match(/const explicitMap = (\{[\s\S]*?\});/);
const truthfulMap = eval('(' + mapMatch[1] + ')');

// 2. Add_*.js extracted mappings
const addScriptsMap = JSON.parse(fs.readFileSync(path.join(rootDir, 'scratch', 'add_scripts_extracted_map.json'), 'utf-8'));
Object.entries(addScriptsMap).forEach(([pid, info]) => {
  truthfulMap[pid] = info.varName;
});

// 3. Load all players from mockData.js
const mockDataContent = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

// 4. Scan all Image.js files available in src/data
const availableVars = new Set();
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const code = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) availableVars.add(m[1]);
});

console.log('Total players in mockData:', players.length);
console.log('Total available image variables:', availableVars.size);

// 5. Audit all 372 players
let validCount = 0;
const invalid = [];

players.forEach(p => {
  const pid = p.id;
  const varName = truthfulMap[pid];
  if (varName && availableVars.has(varName)) {
    validCount++;
  } else {
    invalid.push({ id: pid, name: p.name, mappedVar: varName || 'NONE' });
  }
});

console.log(`Truthful Valid Mappings: ${validCount} / ${players.length}`);

if (invalid.length > 0) {
  console.log(`Invalid / missing mappings (${invalid.length}):`);
  invalid.forEach(inv => console.log(`[${inv.id}] ${inv.name} -> ${inv.mappedVar}`));
}

fs.writeFileSync(path.join(rootDir, 'scratch', 'truthful_player_image_map.json'), JSON.stringify(truthfulMap, null, 2), 'utf-8');
