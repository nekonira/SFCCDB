const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const map = JSON.parse(fs.readFileSync(path.join(rootDir, 'scratch', 'truthful_player_image_map.json'), 'utf-8'));

map['p269'] = 'YAMAMOTO_OUTA_2026_TS_IMAGE';
map['p270'] = 'ALISSON_2026_IMAGE';
map['p271'] = 'ENDRICK_2026_IMAGE';
map['p272'] = 'GREENWOOD_2026_IMAGE';
map['p320'] = 'KOSUKEONOSE_2025_IMAGE';
map['p376'] = 'SIMON_IMAGE';

fs.writeFileSync(path.join(rootDir, 'scratch', 'truthful_player_image_map.json'), JSON.stringify(map, null, 2), 'utf-8');

const mockDataContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

console.log('--- VERIFYING JAPANESE PLAYERS IN TRUTHFUL MAP ---');
const jnp = players.filter(p => p.nationality === '日本' || /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(p.name));

jnp.forEach(p => {
  console.log(`[${p.id}] ${p.name.padEnd(25)} -> ${map[p.id]}`);
});
