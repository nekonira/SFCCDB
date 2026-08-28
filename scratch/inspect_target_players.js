const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const mockDataContent = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

const appJsContent = fs.readFileSync(path.join(rootDir, 'src', 'app.js'), 'utf-8');
const mapMatch = appJsContent.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
const currentMap = eval('(' + mapMatch[1] + ')');

console.log('=== TARGET PLAYERS INSPECTION ===');

players.forEach(p => {
  if (p.name.includes('ヴィニシウス') || p.name.includes('佐々木') || p.name.includes('Sasaki') || p.name.includes('Vinicius') || p.name.includes('Asahi')) {
    console.log(`[${p.id}] ${p.name.padEnd(25)} (reading: ${p.readingName || 'N/A'}) -> Mapped: ${currentMap[p.id] || 'NONE'}`);
  }
});

console.log('\n=== AVAILABLE IMAGE FILES MATCHING PATTERNS ===');
const imageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));
imageFiles.forEach(f => {
  const fLower = f.toLowerCase();
  if (fLower.includes('sasaki') || fLower.includes('vinicius') || fLower.includes('marcus') || fLower.includes('asahi')) {
    const code = fs.readFileSync(path.join(dataDir, f), 'utf-8');
    const m = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
    console.log(`File: ${f} -> Var: ${m ? m[1] : 'UNKNOWN'}`);
  }
});
