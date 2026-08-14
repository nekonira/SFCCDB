const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding / Updating Yugo Tatsuta 2026 (p151) ---');

const tatsuta2026Obj = `{
    id: 'p151',
    name: '立田悠悟(2026)',
    readingName: 'たつたゆうご',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6268,
    maxOverall: 14524,
    baseStats: { shoot: 1027, pass: 1084, dribble: 1118, defense: 1196, physical: 1231, speed: 666 },
    detailStats: {
      shoot: { finishing: 316, power: 381, composure: 330 },
      pass: { shortPass: 376, longPass: 368, accuracy: 340 },
      dribble: { breakout: 366, keeping: 371, ballTouch: 381 },
      defense: { tackle: 433, interception: 362, marking: 401 },
      physical: { jumping: 431, contact: 411, stamina: 389 },
      speed: { running: 320, agility: 346 }
    },
    maxEnhanced: {
      overall: 14524,
      baseStats: { shoot: 2524, pass: 2653, dribble: 2651, defense: 2801, physical: 2824, speed: 1712 },
      detailStats: {
        shoot: { finishing: 815, power: 880, composure: 829 },
        pass: { shortPass: 899, longPass: 891, accuracy: 863 },
        dribble: { breakout: 877, keeping: 882, ballTouch: 892 },
        defense: { tackle: 968, interception: 897, marking: 936 },
        physical: { jumping: 966, contact: 946, stamina: 912 },
        speed: { running: 843, agility: 869 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  }`;

// Check if p151 already exists in mockData.js
if (code.includes("id: 'p151'")) {
  code = code.replace(/\{\s*id:\s*['"]p151['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, tatsuta2026Obj.trim());
} else {
  // Insert before ending array bracket
  const insertPos = code.lastIndexOf('];');
  if (insertPos > 0) {
    code = code.slice(0, insertPos) + ',\n' + tatsuta2026Obj.trim() + '\n' + code.slice(insertPos);
  }
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p151 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p151' || (p.name && p.name.includes('立田悠悟(2026)')));
  console.log('SUCCESS! Added / Updated Yugo Tatsuta 2026 (p151):');
  console.log('Name:', p151.name);
  console.log('Policy:', p151.policy);
  console.log('Overall:', p151.overall, '-> Max:', p151.maxOverall);
  console.log('Base Stats:', p151.baseStats);
  console.log('Max Stats:', p151.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p151.playTendencies);
  console.log('Skill:', p151.skill);
  console.log('Abilities:', p151.abilities);
  console.log(`Total players in mockData.js: ${sandbox.window.INITIAL_PLAYERS.length}`);
} catch (err) {
  console.error('VM eval error:', err.message);
}
