const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

// 1. Load index.html script files
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

// Also scan all files in src/data in case index.html didn't include some
const allDataFiles = fs.readdirSync(path.join(__dirname, '..', 'src', 'data')).filter(f => f.endsWith('Image.js'));
allDataFiles.forEach(fileName => {
  const filePath = path.join(__dirname, '..', 'src', 'data', fileName);
  try {
    vm.runInContext(fs.readFileSync(filePath, 'utf-8'), sandbox);
  } catch (e) {}
});

vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8'), sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

const allWindowImageKeys = Object.keys(sandbox.window).filter(k => k.endsWith('_IMAGE'));
console.log('Total Window Image Keys Found:', allWindowImageKeys.length);
console.log('Total Players:', players.length);

// Print keys that exist in window
fs.writeFileSync(path.join(__dirname, 'all_window_keys.json'), JSON.stringify(allWindowImageKeys, null, 2));

// Map every single player ID to its corresponding window Image key
const fullMap = {};
const missing = [];

players.forEach(p => {
  const pid = p.id;
  
  // Try to find matching image key
  // 1. Try explicit matching based on player name/reading/key pattern
  let foundKey = null;

  // Search window keys
  for (const k of allWindowImageKeys) {
    const kClean = k.toLowerCase().replace(/_image$/, '').replace(/_/g, '');
    const pNameClean = p.name.toLowerCase().replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '');
    const pReadClean = (p.readingName || '').toLowerCase().replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '');

    if (kClean === pNameClean || kClean === pReadClean) {
      foundKey = k;
      break;
    }
  }

  if (!foundKey) {
    // Try broader search
    for (const k of allWindowImageKeys) {
      const kClean = k.toLowerCase().replace(/_image$/, '').replace(/_/g, '');
      const pNameClean = p.name.toLowerCase().replace(/[・\s\(\)（）\-\_\.20252026ts配布チケット交換パック]/g, '');
      if (kClean.includes(pNameClean) || pNameClean.includes(kClean)) {
        foundKey = k;
        break;
      }
    }
  }

  if (foundKey) {
    fullMap[pid] = foundKey;
  } else {
    missing.push(p);
  }
});

console.log(`Mapped ${Object.keys(fullMap).length} / ${players.length} players!`);

if (missing.length > 0) {
  console.log(`Missing ${missing.length} players:`);
  missing.forEach(p => console.log(`[${p.id}] ${p.name}`));
}

fs.writeFileSync(path.join(__dirname, 'full_player_image_map.json'), JSON.stringify(fullMap, null, 2));
