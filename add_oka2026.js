const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding / Updating Teppei Oka 2026 (p152) ---');

const oka2026Obj = `{
    id: 'p152',
    name: '岡哲平(2026)',
    readingName: 'おかてっぺい',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6239,
    maxOverall: 14501,
    baseStats: { shoot: 903, pass: 1120, dribble: 1010, defense: 1161, physical: 1175, speed: 757 },
    detailStats: {
      shoot: { finishing: 279, power: 317, composure: 307 },
      pass: { shortPass: 375, longPass: 392, accuracy: 353 },
      dribble: { breakout: 306, keeping: 326, ballTouch: 378 },
      defense: { tackle: 392, interception: 385, marking: 384 },
      physical: { jumping: 419, contact: 406, stamina: 350 },
      speed: { running: 381, agility: 376 }
    },
    maxEnhanced: {
      overall: 14501,
      baseStats: { shoot: 2400, pass: 2689, dribble: 2543, defense: 2766, physical: 2768, speed: 1803 },
      detailStats: {
        shoot: { finishing: 778, power: 816, composure: 806 },
        pass: { shortPass: 898, longPass: 915, accuracy: 876 },
        dribble: { breakout: 817, keeping: 837, ballTouch: 889 },
        defense: { tackle: 927, interception: 920, marking: 919 },
        physical: { jumping: 954, contact: 941, stamina: 873 },
        speed: { running: 904, agility: 899 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'エアバトラー', rank: '銀', description: '空中戦の強さを発揮し競り合いで相手を圧倒する' },
      { name: 'リスクヘッジロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・マークUP' }
    ],
    avatarUrl: ''
  }`;

// Check if p152 already exists in mockData.js
if (code.includes("id: 'p152'")) {
  code = code.replace(/\{\s*id:\s*['"]p152['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, oka2026Obj.trim());
} else {
  // Insert before ending array bracket
  const insertPos = code.lastIndexOf('];');
  if (insertPos > 0) {
    code = code.slice(0, insertPos) + ',\n' + oka2026Obj.trim() + '\n' + code.slice(insertPos);
  }
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p152 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p152' || (p.name && p.name.includes('岡哲平(2026)')));
  console.log('SUCCESS! Added / Updated Teppei Oka 2026 (p152):');
  console.log('Name:', p152.name);
  console.log('Policy:', p152.policy);
  console.log('Overall:', p152.overall, '-> Max:', p152.maxOverall);
  console.log('Base Stats:', p152.baseStats);
  console.log('Max Stats:', p152.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p152.playTendencies);
  console.log('Skill:', p152.skill);
  console.log('Abilities:', p152.abilities);
  console.log(`Total players in mockData.js: ${sandbox.window.INITIAL_PLAYERS.length}`);
} catch (err) {
  console.error('VM eval error:', err.message);
}
