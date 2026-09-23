const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Verifying p393 (Kobbie Mainoo) integration ---');

const sandbox = { window: {}, console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);

// 1. Load Image JS
const imgJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'kobbieMainoo2026Image.js'), 'utf-8');
vm.runInContext(imgJs, sandbox);
console.log('Image JS loaded, KOBBIE_MAINOO_2026_IMAGE exists:', Boolean(sandbox.window.KOBBIE_MAINOO_2026_IMAGE));

// 2. Load mockData.js
const mockJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'mockData.js'), 'utf-8');
vm.runInContext(mockJs, sandbox);

const players = sandbox.window.INITIAL_PLAYERS;
console.log(`Total players loaded: ${players.length}`);

const player = players.find(p => p.id === 'p393');
console.log('p393 Player details:');
console.log('- Name:', player.name);
console.log('- Nationality:', player.nationality);
console.log('- Position:', player.mainPosition);
console.log('- Rarity:', player.rarity);
console.log('- Policy:', player.policy);
console.log('- PlayStyle:', player.playStyle, `(Level ${player.playStyleLevel})`);
console.log('- Overall:', player.overall, `(Max: ${player.maxOverall})`);
console.log('- BaseStats:', player.baseStats);
console.log('- Skill:', player.skill);
console.log('- Abilities:', player.abilities.map(a => `${a.rank} ${a.name}`).join(', '));

// 3. Check PLAYER_IMAGE_MAP in app.js
const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');
const mapMatch = appJsCode.match(/const PLAYER_IMAGE_MAP=(\{[^}]+\});/);
if (mapMatch) {
  const mapObj = JSON.parse(mapMatch[1]);
  console.log('PLAYER_IMAGE_MAP p393 value:', mapObj['p393']);
}
