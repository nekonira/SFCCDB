const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Scan all *Image.js files to get actual window variables and their normalized filenames
const fileVarMap = {}; // normalized string -> actualVarName
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const code = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) {
    const varName = m[1];
    const baseName = f.replace('Image.js', '');
    fileVarMap[baseName.toLowerCase()] = varName;
    fileVarMap[varName.replace('_IMAGE', '').toLowerCase().replace(/_/g, '')] = varName;
  }
});

// 2. Load all players from mockData.js
const mockDataContent = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

// 3. Known explicit mappings for early players (p01 - p263) from verify_exact_image_vars.js
const verifyCode = fs.readFileSync(path.join(rootDir, 'verify_exact_image_vars.js'), 'utf-8');
const mapMatch = verifyCode.match(/const explicitMap = (\{[\s\S]*?\});/);
const baseExplicitMap = eval('(' + mapMatch[1] + ')');

const finalMap = {};
const auditLog = [];

players.forEach(p => {
  let matchedVar = null;

  // Helper to normalize Japanese/Romaji string
  function clean(str) {
    if (!str) return '';
    return str.toLowerCase()
      .replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '')
      .replace(/ヴァ/g, 'バ').replace(/ヴィ/g, 'ビ').replace(/ヴェ/g, 'ベ').replace(/ヴォ/g, 'ボ')
      .replace(/ジェ/g, 'ジ').replace(/チェ/g, 'チ');
  }

  const pCleanName = clean(p.name);
  const pCleanReading = clean(p.readingName);

  // 1. Exact matching by reading/name against fileVarMap
  for (const [key, varName] of Object.entries(fileVarMap)) {
    const keyClean = clean(key);
    if (keyClean && (keyClean === pCleanName || keyClean === pCleanReading)) {
      matchedVar = varName;
      break;
    }
  }

  // 2. Check baseExplicitMap
  if (!matchedVar && baseExplicitMap[p.id]) {
    matchedVar = baseExplicitMap[p.id];
  }

  // 3. Fallback partial matching
  if (!matchedVar) {
    for (const [key, varName] of Object.entries(fileVarMap)) {
      const keyClean = clean(key);
      if (keyClean && keyClean.length > 3 && (pCleanReading.includes(keyClean) || pCleanName.includes(keyClean) || keyClean.includes(pCleanReading))) {
        matchedVar = varName;
        break;
      }
    }
  }

  if (matchedVar) {
    finalMap[p.id] = matchedVar;
    auditLog.push(`[OK] ${p.id}: ${p.name} -> ${matchedVar}`);
  } else {
    auditLog.push(`[FAIL] ${p.id}: ${p.name}`);
  }
});

console.log(`Audited ${Object.keys(finalMap).length} / ${players.length} players!`);

fs.writeFileSync(path.join(rootDir, 'scratch', 'perfect_audited_image_map.json'), JSON.stringify(finalMap, null, 2), 'utf-8');
fs.writeFileSync(path.join(rootDir, 'scratch', 'audit_log.txt'), auditLog.join('\n'), 'utf-8');
