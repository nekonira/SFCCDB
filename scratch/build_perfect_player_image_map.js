const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Get explicitMap from verify_exact_image_vars.js
const verifyCode = fs.readFileSync(path.join(rootDir, 'verify_exact_image_vars.js'), 'utf-8');
const mapMatch = verifyCode.match(/const explicitMap = (\{[\s\S]*?\});/);
let explicitMap = {};
if (mapMatch) {
  explicitMap = eval('(' + mapMatch[1] + ')');
}

// 2. Scan all add_*.js files in root directory
const files = fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js'));

files.forEach(f => {
  const code = fs.readFileSync(path.join(rootDir, f), 'utf-8');
  const idMatch = code.match(/id:\s*['"](p\d+)['"]/);
  const imgVarMatch = code.match(/([A-Z0-9_]+_IMAGE)/);
  if (idMatch && imgVarMatch) {
    const pid = idMatch[1];
    const varName = imgVarMatch[1];
    explicitMap[pid] = varName;
  }
});

// Manual fallbacks for specific players
explicitMap['p269'] = 'YAMAMOTO_OUTA_2026_TS_IMAGE';
explicitMap['p270'] = 'ALISSON_2026_IMAGE';
explicitMap['p271'] = 'ENDRICK_2026_IMAGE';
explicitMap['p272'] = 'GREENWOOD_2026_IMAGE';
explicitMap['p320'] = 'KOSUKEONOSE_2025_IMAGE';
explicitMap['p376'] = 'SIMON_IMAGE';

// 3. Scan all *Image.js files to get actual window variables defined
const availableVars = new Set();
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const code = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) availableVars.add(m[1]);
});

// 4. Load mockData.js to check all INITIAL_PLAYERS
const mockDataContent = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

console.log('Total players in mockData:', players.length);
console.log('Total available image variables:', availableVars.size);

let valid = 0;
const missing = [];

players.forEach(p => {
  const pid = p.id;
  const varName = explicitMap[pid];
  if (varName && availableVars.has(varName)) {
    valid++;
  } else {
    missing.push({ id: pid, name: p.name, mappedVar: varName || 'NONE' });
  }
});

console.log(`Successfully mapped ${valid} / ${players.length} players to valid available image variables!`);

if (missing.length > 0) {
  console.log(`Missing ${missing.length} mappings:`);
  missing.forEach(m => console.log(`[${m.id}] ${m.name} -> ${m.mappedVar}`));
}

fs.writeFileSync(path.join(rootDir, 'scratch', 'perfect_player_image_map.json'), JSON.stringify(explicitMap, null, 2));
