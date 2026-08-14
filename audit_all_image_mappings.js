const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== AUDITING ALL PLAYERS AND IMAGE VARIABLES ===');

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

const imageVars = {};
files.forEach(file => {
  const code = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  vm.runInContext(code, sandbox);
  const match = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (match) {
    const varName = match[1];
    imageVars[file] = varName;
  }
});

console.log(`Found ${players.length} players in mockData.js.`);
console.log(`Found ${files.length} image JS files in src/data/.`);

// List players and match to image variables
const unmappedPlayers = [];
const mappedPlayers = [];

players.forEach(p => {
  // Let's check potential variable names
  // e.g., pele -> PELE_IMAGE, messi -> MESSI_MLS_IMAGE or MESSI_HAIFU_IMAGE, etc.
  let foundVar = null;
  
  // Try matching
  for (const [file, varName] of Object.entries(imageVars)) {
    const baseName = file.replace('Image.js', '').toLowerCase();
    const pName = p.name.toLowerCase();
    const reading = (p.readingName || '').toLowerCase();
    
    // Check if filename relates to player
    if (
      (p.id === 'p115' && file === 'leoCearaImage.js') ||
      (p.id === 'p263' && file === 'leoCeara2026Image.js') ||
      (p.id === 'p262' && file === 'kawamotoPack2026Image.js') ||
      (p.id === 'p261' && file === 'hiratsukaGift2026Image.js') ||
      (p.id === 'p260' && file === 'diasGift2026Image.js') ||
      baseName === pName ||
      baseName === reading
    ) {
      foundVar = varName;
      break;
    }
  }
  
  if (foundVar) {
    mappedPlayers.push({ player: p, varName });
  } else {
    unmappedPlayers.push(p);
  }
});

console.log(`\nMapped: ${mappedPlayers.length}, Unmapped: ${unmappedPlayers.length}`);
if (unmappedPlayers.length > 0) {
  console.log('\nSample unmapped players:');
  unmappedPlayers.slice(0, 30).forEach(p => {
    console.log(`[${p.id}] "${p.name}" (reading: "${p.readingName}")`);
  });
}
