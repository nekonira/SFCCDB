const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

// 1. Load mockData.js
const mockDataContent = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

// 2. Load app.js to extract current PLAYER_IMAGE_MAP
const appJsContent = fs.readFileSync(path.join(rootDir, 'src', 'app.js'), 'utf-8');
const mapMatch = appJsContent.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
const currentMap = eval('(' + mapMatch[1] + ')');

// 3. Scan all Image.js files in src/data
const availableImageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));

console.log('Total Players:', players.length);
console.log('Total Image Files:', availableImageFiles.length);

// Audit Japanese players
const japanesePlayers = players.filter(p => p.nationality === '日本' || /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(p.name));
console.log('Total Japanese Players:', japanesePlayers.length);

const mismatches = [];

japanesePlayers.forEach(p => {
  const currentVar = currentMap[p.id];
  
  // Try to find the exact matching image file by player romaji name or reading
  const pName = p.name.toLowerCase().replace(/[\(（].*?[\)）]/g, '').trim();
  const pReading = (p.readingName || '').toLowerCase().replace(/[\s・\.\-]/g, '').trim();

  // Find candidate image files
  const matchingFiles = availableImageFiles.filter(f => {
    const fLower = f.toLowerCase();
    // match romaji or reading
    return fLower.includes(pReading) || (pReading.length > 3 && fLower.includes(pReading.slice(0, 4)));
  });

  console.log(`[${p.id}] ${p.name} (reading: ${p.readingName || 'N/A'}) -> Mapped: ${currentVar || 'NONE'}`);
});
