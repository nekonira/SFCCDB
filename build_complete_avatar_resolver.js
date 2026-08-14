const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== BUILDING COMPLETE 100% BULLETPROOF AVATAR RESOLVER ===');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

// 1. Read mockData.js
const mockDataCode = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.js'), 'utf-8');
vm.runInContext(mockDataCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// 2. Read all image JS files in src/data/
const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));

// Map window variable name -> file name -> base64 content indicator
const imageVarMap = {};
files.forEach(file => {
  const code = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  vm.runInContext(code, sandbox);
  const match = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (match) {
    imageVarMap[file] = match[1];
  }
});

console.log(`Loaded ${players.length} players and ${Object.keys(imageVarMap).length} image JS variables.`);

// Build ID-based map and Name-based map
const playerToVarMap = [];

players.forEach(p => {
  let matchedVar = null;

  // Manual explicit mappings for special/duplicate cases
  if (p.id === 'p115' || p.name === 'レオ・セアラ(J1 BEST11 2025)') matchedVar = 'LEO_CEARA_IMAGE';
  else if (p.id === 'p263' || p.name === 'レオ・セアラ(2026TS)') matchedVar = 'LEO_CEARA_2026_IMAGE';
  else if (p.id === 'p262' || p.name.includes('河本龍将(パック)')) matchedVar = 'KAWAMOTO_PACK_2026_IMAGE';
  else if (p.id === 'p261' || p.name.includes('平塚浪馬(配布)')) matchedVar = 'HIRATSUKA_GIFT_2026_IMAGE';
  else if (p.id === 'p260' || p.name.includes('ルベン・ディアス(配布)')) matchedVar = 'DIAS_GIFT_2026_IMAGE';
  else if (p.id === 'p259' || p.name.includes('ハーランド(配布)')) matchedVar = 'HAALAND_GIFT_2026_IMAGE';
  else if (p.id === 'p112' || p.name.includes('メッシ(配布)')) matchedVar = 'MESSI_HAIFU_IMAGE';
  else if (p.id === 'p113' || p.name.includes('相馬勇紀(J1 BEST11 2025)')) matchedVar = 'SOMA_IMAGE';
  else if (p.id === 'p114' || p.name.includes('ラファエル・エリアス(J1 BEST11 2025)')) matchedVar = 'RAFAEL_ELIAS_IMAGE';
  else if (p.id === 'p117' || p.name.includes('小泉佳穂(J1 BEST11 2025)')) matchedVar = 'KOIZUMI_IMAGE';
  else if (p.id === 'p123' || p.name.includes('早川友基(J1 BEST11 2025)')) matchedVar = 'HAYAKAWA_BEST11_IMAGE';
  else if (p.id === 'p147' || p.name.includes('ソン・ボムグン(K1 BEST11 2025)')) matchedVar = 'SONG_BUM_KEUN_IMAGE';
  else {
    // Search imageVarMap by fuzzy matching file names
    const cleanPlayerName = p.name.replace(/\([^)]+\)/g, '').replace(/[・\s]/g, '').toLowerCase();
    const cleanReading = (p.readingName || '').replace(/[・\s]/g, '').toLowerCase();
    
    for (const [file, varName] of Object.entries(imageVarMap)) {
      const cleanFile = file.replace('Image.js', '').toLowerCase();
      if (
        cleanFile === cleanPlayerName ||
        cleanFile === cleanReading ||
        cleanFile.includes(cleanPlayerName) ||
        cleanPlayerName.includes(cleanFile)
      ) {
        matchedVar = varName;
        break;
      }
    }
  }

  if (!matchedVar) {
    // Try to guess from window objects
    const possibleVarNames = Object.keys(sandbox.window).filter(k => k.endsWith('_IMAGE'));
    const pName = p.name.replace(/\([^)]+\)/g, '').replace(/[・\s]/g, '');
    for (const v of possibleVarNames) {
      if (v.toLowerCase().includes(pName.toLowerCase())) {
        matchedVar = v;
        break;
      }
    }
  }

  playerToVarMap.push({
    id: p.id,
    name: p.name,
    varName: matchedVar || ''
  });
});

let mappedCount = playerToVarMap.filter(x => x.varName !== '').length;
console.log(`Mapped ${mappedCount} / ${players.length} players.`);

const unmapped = playerToVarMap.filter(x => x.varName === '');
if (unmapped.length > 0) {
  console.log('Unmapped players:');
  unmapped.forEach(u => console.log(`- [${u.id}] ${u.name}`));
}

// Write the complete getPlayerAvatarUrl function code
let resolverCode = `const getPlayerAvatarUrl = (player) => {\n  if (!player) return '';\n`;

playerToVarMap.forEach(item => {
  if (item.varName) {
    const escapedName = item.name.replace(/'/g, "\\'");
    resolverCode += `  if (player.id === '${item.id}' || player.name === '${escapedName}') return window.${item.varName} || player.avatarUrl || '';\n`;
  }
});

resolverCode += `  return player.avatarUrl || '';\n};\n`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'playerAvatarResolver.js'), resolverCode, 'utf-8');
console.log('Saved src/data/playerAvatarResolver.js. Size:', fs.statSync(path.join(__dirname, 'src', 'data', 'playerAvatarResolver.js')).size);
