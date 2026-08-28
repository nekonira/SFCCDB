const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Base explicit map from verify_exact_image_vars.js
const verifyCode = fs.readFileSync(path.join(rootDir, 'verify_exact_image_vars.js'), 'utf-8');
const mapMatch = verifyCode.match(/const explicitMap = (\{[\s\S]*?\});/);
const accurateMap = eval('(' + mapMatch[1] + ')');

// 2. Available image variables in src/data/*Image.js
const availableVars = new Map(); // normalized -> actualVarName
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const code = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) {
    const varName = m[1];
    const normName = varName.replace('_IMAGE', '').toLowerCase().replace(/_/g, '');
    availableVars.set(normName, varName);
  }
});

// 3. Load all players from mockData.js
const mockDataContent = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

console.log('Total players:', players.length);

// 4. For players >= p264, find their exact add_*.js file or exact name match
players.forEach(p => {
  if (accurateMap[p.id]) return; // keep original verified mapping for p01..p263

  // Search add_*.js files for exact player id definition
  let foundVar = null;

  const addFiles = fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js'));
  for (const file of addFiles) {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
    // Check if this script defines p.id in INITIAL_PLAYERS or new player object
    const idRegex = new RegExp(`id:\\s*['"]${p.id}['"]`);
    if (idRegex.test(content)) {
      // Find the window.XXX_IMAGE in this add_*.js file
      const imgMatch = content.match(/([A-Z0-9_]+_IMAGE)/);
      if (imgMatch) {
        foundVar = imgMatch[1];
        break;
      }
    }
  }

  // Fallback fuzzy/romaji matching if add_*.js not found
  if (!foundVar) {
    const pName = p.name.toLowerCase().replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '');
    const pRead = (p.readingName || '').toLowerCase().replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '');

    for (const [normVar, actualVar] of availableVars.entries()) {
      if (normVar === pName || normVar === pRead || normVar.includes(pName) || pName.includes(normVar)) {
        foundVar = actualVar;
        break;
      }
    }
  }

  if (foundVar) {
    accurateMap[p.id] = foundVar;
  }
});

console.log(`Total mapped players: ${Object.keys(accurateMap).length} / ${players.length}`);

// Manual fallbacks for p270, p271, p272
accurateMap['p270'] = 'ALISSON_2026_IMAGE';
accurateMap['p271'] = 'ENDRICK_2026_IMAGE';
accurateMap['p272'] = 'GREENWOOD_2026_IMAGE';

// Verify all mapped variables exist
let validCount = 0;
const invalid = [];
players.forEach(p => {
  const v = accurateMap[p.id];
  const allActualVars = new Set(availableVars.values());
  if (v && allActualVars.has(v)) {
    validCount++;
  } else {
    invalid.push({ id: p.id, name: p.name, var: v });
  }
});

console.log(`Valid mappings: ${validCount} / ${players.length}`);
if (invalid.length > 0) {
  console.log('Invalid or unmapped players:', invalid);
}

fs.writeFileSync(path.join(rootDir, 'scratch', 'accurate_player_image_map.json'), JSON.stringify(accurateMap, null, 2));
