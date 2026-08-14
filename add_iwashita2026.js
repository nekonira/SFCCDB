const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding / Updating Wataru Iwashita 2026 (p153) ---');

const iwashita2026Obj = `{
    id: 'p153',
    name: '岩下航(2026)',
    readingName: 'いわしたわたる',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6062,
    maxOverall: 14300,
    baseStats: { shoot: 990, pass: 1112, dribble: 1098, defense: 1116, physical: 1173, speed: 784 },
    detailStats: {
      shoot: { finishing: 328, power: 345, composure: 317 },
      pass: { shortPass: 374, longPass: 374, accuracy: 364 },
      dribble: { breakout: 383, keeping: 355, ballTouch: 360 },
      defense: { tackle: 390, interception: 378, marking: 348 },
      physical: { jumping: 368, contact: 385, stamina: 420 },
      speed: { running: 388, agility: 396 }
    },
    maxEnhanced: {
      overall: 14300,
      baseStats: { shoot: 2487, pass: 2681, dribble: 2631, defense: 2721, physical: 2766, speed: 1830 },
      detailStats: {
        shoot: { finishing: 827, power: 844, composure: 816 },
        pass: { shortPass: 897, longPass: 897, accuracy: 887 },
        dribble: { breakout: 894, keeping: 866, ballTouch: 871 },
        defense: { tackle: 925, interception: 913, marking: 883 },
        physical: { jumping: 903, contact: 920, stamina: 943 },
        speed: { running: 911, agility: 919 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ムービングウォール', rank: '銀', description: '発動条件：絶好調　/　コンタクト・スタミナUP' },
      { name: 'アジャイルクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・敏捷性UP' }
    ],
    avatarUrl: ''
  }`;

// Check if p153 already exists in mockData.js
if (code.includes("id: 'p153'")) {
  code = code.replace(/\{\s*id:\s*['"]p153['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, iwashita2026Obj.trim());
} else {
  // Insert before ending array bracket
  const insertPos = code.lastIndexOf('];');
  if (insertPos > 0) {
    code = code.slice(0, insertPos) + ',\n' + iwashita2026Obj.trim() + '\n' + code.slice(insertPos);
  }
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p153 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p153' || (p.name && p.name.includes('岩下航(2026)')));
  console.log('SUCCESS! Added / Updated Wataru Iwashita 2026 (p153):');
  console.log('Name:', p153.name);
  console.log('Policy:', p153.policy);
  console.log('Overall:', p153.overall, '-> Max:', p153.maxOverall);
  console.log('Base Stats:', p153.baseStats);
  console.log('Max Stats:', p153.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p153.playTendencies);
  console.log('Skill:', p153.skill);
  console.log('Abilities:', p153.abilities);
  console.log(`Total players in mockData.js: ${sandbox.window.INITIAL_PLAYERS.length}`);
} catch (err) {
  console.error('VM eval error:', err.message);
}
