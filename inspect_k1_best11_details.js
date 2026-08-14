const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const dataDir = path.join(__dirname, 'src', 'data');

const mockCode = fs.readFileSync(mockPath, 'utf-8');
const appJsx = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Detailed Inspection of K1 BEST11 2025 Players ---');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const players = sandbox.window.INITIAL_PLAYERS || [];
const k1Players = players.filter(p => (p.name && p.name.includes('K1')) || (p.note && p.note.includes('K1')));

console.log(`Found ${k1Players.length} K1 BEST11 2025 players in mockData.js:`);

const allImageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));

k1Players.forEach(p => {
  console.log(`\nPlayer [${p.id}]: ${p.name}`);
  console.log(`  Position: ${p.mainPosition}, Category: ${p.category}, Policy: ${p.policy}`);
  console.log(`  PlayStyle: ${p.playStyle} (LV.${p.playStyleLevel})`);
  console.log(`  Overall: ${p.overall} (Max: ${p.maxOverall})`);
  console.log(`  Skill:`, p.skill);
  console.log(`  Abilities:`, p.abilities);
  console.log(`  AvatarUrl in player object: '${p.avatarUrl}'`);

  // Check matching image variable in app.jsx / window
  const cleanName = p.name.replace(/\(.*\)/, '').trim();
  console.log(`  Clean Name: '${cleanName}'`);

  // Check if image file exists in src/data
  const matchingFiles = allImageFiles.filter(f => f.toLowerCase().includes(p.id.toLowerCase()) || f.toLowerCase().includes(p.name.toLowerCase().substring(0, 3)));
  console.log(`  Matching Image Files:`, matchingFiles.join(', ') || 'None');
});
