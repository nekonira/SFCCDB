const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const scriptMatches = indexHtml.match(/src=["']\.\/src\/data\/([^"']+)["']/g) || [];

scriptMatches.forEach(match => {
  const fileName = match.replace(/src=["']\.\/src\/data\//, '').replace(/["']$/, '').split('?')[0];
  const filePath = path.join(__dirname, '..', 'src', 'data', fileName);
  if (fs.existsSync(filePath)) {
    try {
      vm.runInContext(fs.readFileSync(filePath, 'utf-8'), sandbox);
    } catch (e) {}
  }
});

vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8'), sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

const allWindowImageKeys = Object.keys(sandbox.window).filter(k => k.endsWith('_IMAGE'));
console.log('Total Window Image Keys Found:', allWindowImageKeys.length);
console.log('Total Players in mockData:', players.length);

// Helper to normalize strings for fuzzy matching
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[・\s\(\)（）\-\_\.20252026TS配布チケット交換パック]/g, '')
    .replace(/ヴァ/g, 'バ')
    .replace(/ヴィ/g, 'ビ')
    .replace(/ヴェ/g, 'ベ')
    .replace(/ヴォ/g, 'ボ')
    .replace(/ジェ/g, 'ジ')
    .replace(/チェ/g, 'チ');
}

// Build map from player.id -> image variable name
const playerImageMap = {};
const unmapped = [];

players.forEach(p => {
  if (!p || !p.id) return;

  // 1. Direct avatarUrl check if avatarUrl has window var name
  if (p.avatarUrl && p.avatarUrl.startsWith('window.')) {
    const varName = p.avatarUrl.replace('window.', '');
    if (sandbox.window[varName]) {
      playerImageMap[p.id] = varName;
      return;
    }
  }

  // 2. Exact or normalized matching against all window image keys
  const pNorm = normalize(p.name);
  let matchedKey = null;

  for (const key of allWindowImageKeys) {
    const kNorm = normalize(key.replace('_IMAGE', ''));
    if (pNorm && (kNorm === pNorm || kNorm.includes(pNorm) || pNorm.includes(kNorm))) {
      matchedKey = key;
      break;
    }
  }

  if (matchedKey) {
    playerImageMap[p.id] = matchedKey;
  } else {
    unmapped.push(p);
  }
});

console.log(`Successfully mapped ${Object.keys(playerImageMap).length} / ${players.length} players!`);

if (unmapped.length > 0) {
  console.log('\nUnmapped players:');
  unmapped.forEach(p => {
    console.log(`[${p.id}] ${p.name} (reading: ${p.readingName || ''})`);
  });
}

// Output JS code snippet for PLAYER_IMAGE_MAP
fs.writeFileSync(path.join(__dirname, 'generated_player_image_map.json'), JSON.stringify(playerImageMap, null, 2), 'utf-8');
