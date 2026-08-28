const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const mockDataPath = path.join(dataDir, 'mockData.js');

const mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

// Parse players from mockData
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
if (!playersMatch) {
  console.error('Could not find INITIAL_PLAYERS in mockData.js');
  process.exit(1);
}

const players = eval(playersMatch[1]);
console.log('Parsed players count:', players.length);

// Scan all *Image.js files in src/data to find what window variable each defines
const fileToVarMap = {};
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const varMatch = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (varMatch) {
    fileToVarMap[file] = varMatch[1];
  }
});

console.log('Total *Image.js files found:', Object.keys(fileToVarMap).length);

// Build map from player ID to window variable name
const playerImageMap = {};
const unmapped = [];

// Helper normalization function
function norm(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '')
    .replace(/ヴァ/g, 'バ').replace(/ヴィ/g, 'ビ').replace(/ヴェ/g, 'ベ').replace(/ヴォ/g, 'ボ')
    .replace(/ジェ/g, 'ジ').replace(/チェ/g, 'チ');
}

players.forEach(p => {
  // If player already has explicit avatarUrl in window.XXX format
  if (p.avatarUrl && p.avatarUrl.startsWith('window.')) {
    playerImageMap[p.id] = p.avatarUrl.replace('window.', '');
    return;
  }

  const pNorm = norm(p.name);
  const pReadNorm = norm(p.readingName);

  let bestVar = null;

  // Search through all fileToVarMap
  for (const [fileName, varName] of Object.entries(fileToVarMap)) {
    const fNorm = norm(fileName.replace('Image.js', ''));
    const vNorm = norm(varName.replace('_IMAGE', ''));

    if (fNorm === pNorm || vNorm === pNorm || fNorm === pReadNorm || vNorm === pReadNorm) {
      bestVar = varName;
      break;
    }
  }

  if (!bestVar) {
    // Partial search
    for (const [fileName, varName] of Object.entries(fileToVarMap)) {
      const fNorm = norm(fileName.replace('Image.js', ''));
      if (fNorm.includes(pNorm) || pNorm.includes(fNorm)) {
        bestVar = varName;
        break;
      }
    }
  }

  if (bestVar) {
    playerImageMap[p.id] = bestVar;
  } else {
    unmapped.push(p);
  }
});

console.log(`Successfully mapped ${Object.keys(playerImageMap).length} / ${players.length} players to image variables!`);

if (unmapped.length > 0) {
  console.log(`Unmapped players (${unmapped.length}):`);
  unmapped.forEach(p => console.log(`[${p.id}] ${p.name}`));
}

fs.writeFileSync(path.join(__dirname, 'complete_player_image_map.json'), JSON.stringify(playerImageMap, null, 2));
