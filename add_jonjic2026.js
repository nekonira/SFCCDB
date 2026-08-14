const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding / Updating Matej Jonjic 2026 (p150) ---');

const jonjic2026Obj = `{
    id: 'p150',
    name: 'マテイ・ヨニッチ(2026)',
    readingName: 'まていよにっち',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'クロアチア',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6313,
    maxOverall: 14570,
    baseStats: { shoot: 1033, pass: 1077, dribble: 1031, defense: 1245, physical: 1177, speed: 681 },
    detailStats: {
      shoot: { finishing: 320, power: 381, composure: 332 },
      pass: { shortPass: 341, longPass: 379, accuracy: 357 },
      dribble: { breakout: 321, keeping: 376, ballTouch: 334 },
      defense: { tackle: 465, interception: 387, marking: 393 },
      physical: { jumping: 403, contact: 380, stamina: 394 },
      speed: { running: 312, agility: 369 }
    },
    maxEnhanced: {
      overall: 14570,
      baseStats: { shoot: 2530, pass: 2646, dribble: 2564, defense: 2850, physical: 2770, speed: 1727 },
      detailStats: {
        shoot: { finishing: 819, power: 880, composure: 831 },
        pass: { shortPass: 864, longPass: 902, accuracy: 880 },
        dribble: { breakout: 832, keeping: 887, ballTouch: 845 },
        defense: { tackle: 1000, interception: 922, marking: 928 },
        physical: { jumping: 938, contact: 915, stamina: 917 },
        speed: { running: 835, agility: 892 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: 'ムービングウォール', rank: '銀', description: '発動条件：絶好調　/　コンタクト・スタミナUP' }
    ],
    avatarUrl: ''
  }`;

// Check if p150 already exists in mockData.js
if (code.includes("id: 'p150'")) {
  code = code.replace(/\{\s*id:\s*['"]p150['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, jonjic2026Obj.trim());
} else {
  // Insert before ending array bracket
  const insertPos = code.lastIndexOf('];');
  if (insertPos > 0) {
    code = code.slice(0, insertPos) + ',\n' + jonjic2026Obj.trim() + '\n' + code.slice(insertPos);
  }
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p150 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p150' || (p.name && p.name.includes('マテイ・ヨニッチ(2026)')));
  console.log('SUCCESS! Added / Updated Matej Jonjić 2026 (p150):');
  console.log('Name:', p150.name);
  console.log('Policy:', p150.policy);
  console.log('Overall:', p150.overall, '-> Max:', p150.maxOverall);
  console.log('Base Stats:', p150.baseStats);
  console.log('Max Stats:', p150.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p150.playTendencies);
  console.log('Skill:', p150.skill);
  console.log('Abilities:', p150.abilities);
  console.log(`Total players in mockData.js: ${sandbox.window.INITIAL_PLAYERS.length}`);
} catch (err) {
  console.error('VM eval error:', err.message);
}
