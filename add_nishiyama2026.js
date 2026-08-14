const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding / Updating Taiga Nishiyama 2026 (p155) ---');

const nishiyama2026Obj = `{
    id: 'p155',
    name: '西山大雅(2026)',
    readingName: 'にしやまたいが',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6016,
    maxOverall: 14279,
    baseStats: { shoot: 949, pass: 923, dribble: 1054, defense: 1170, physical: 1156, speed: 593 },
    detailStats: {
      shoot: { finishing: 304, power: 333, composure: 312 },
      pass: { shortPass: 317, longPass: 314, accuracy: 292 },
      dribble: { breakout: 342, keeping: 352, ballTouch: 360 },
      defense: { tackle: 378, interception: 389, marking: 403 },
      physical: { jumping: 410, contact: 410, stamina: 336 },
      speed: { running: 280, agility: 313 }
    },
    maxEnhanced: {
      overall: 14279,
      baseStats: { shoot: 2446, pass: 2492, dribble: 2587, defense: 2775, physical: 2749, speed: 1639 },
      detailStats: {
        shoot: { finishing: 803, power: 832, composure: 811 },
        pass: { shortPass: 840, longPass: 837, accuracy: 815 },
        dribble: { breakout: 853, keeping: 863, ballTouch: 871 },
        defense: { tackle: 913, interception: 924, marking: 938 },
        physical: { jumping: 945, contact: 945, stamina: 859 },
        speed: { running: 803, agility: 836 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' }
    ],
    avatarUrl: ''
  }`;

// Check if p155 already exists in mockData.js
if (code.includes("id: 'p155'")) {
  code = code.replace(/\{\s*id:\s*['"]p155['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, nishiyama2026Obj.trim());
} else {
  // Insert before ending array bracket
  const insertPos = code.lastIndexOf('];');
  if (insertPos > 0) {
    code = code.slice(0, insertPos) + ',\n' + nishiyama2026Obj.trim() + '\n' + code.slice(insertPos);
  }
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p155 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p155' || (p.name && p.name.includes('西山大雅(2026)')));
  console.log('SUCCESS! Added / Updated Taiga Nishiyama 2026 (p155):');
  console.log('Name:', p155.name);
  console.log('Policy:', p155.policy);
  console.log('Overall:', p155.overall, '-> Max:', p155.maxOverall);
  console.log('Base Stats:', p155.baseStats);
  console.log('Max Stats:', p155.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p155.playTendencies);
  console.log('Skill:', p155.skill);
  console.log('Abilities:', p155.abilities);
  console.log(`Total players in mockData.js: ${sandbox.window.INITIAL_PLAYERS.length}`);
} catch (err) {
  console.error('VM eval error:', err.message);
}
