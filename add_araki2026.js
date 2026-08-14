const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding / Updating Hayato Araki 2026 (p149) ---');

const araki2026Obj = `{
    id: 'p149',
    name: '荒木隼人(2026)',
    readingName: 'あらきはやと',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6431,
    maxOverall: 14684,
    baseStats: { shoot: 1068, pass: 1072, dribble: 1049, defense: 1257, physical: 1244, speed: 659 },
    detailStats: {
      shoot: { finishing: 358, power: 368, composure: 342 },
      pass: { shortPass: 356, longPass: 356, accuracy: 360 },
      dribble: { breakout: 334, keeping: 340, ballTouch: 375 },
      defense: { tackle: 403, interception: 428, marking: 426 },
      physical: { jumping: 410, contact: 440, stamina: 394 },
      speed: { running: 333, agility: 326 }
    },
    maxEnhanced: {
      overall: 14684,
      baseStats: { shoot: 2565, pass: 2641, dribble: 2582, defense: 2862, physical: 2837, speed: 1705 },
      detailStats: {
        shoot: { finishing: 857, power: 867, composure: 841 },
        pass: { shortPass: 879, longPass: 879, accuracy: 883 },
        dribble: { breakout: 845, keeping: 851, ballTouch: 886 },
        defense: { tackle: 938, interception: 963, marking: 961 },
        physical: { jumping: 945, contact: 975, stamina: 917 },
        speed: { running: 856, agility: 849 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' }
    ],
    avatarUrl: ''
  }`;

// Check if p149 already exists in mockData.js
if (code.includes("id: 'p149'")) {
  code = code.replace(/\{\s*id:\s*['"]p149['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, araki2026Obj.trim());
} else {
  // Insert before ending array bracket
  const insertPos = code.lastIndexOf('];');
  if (insertPos > 0) {
    code = code.slice(0, insertPos) + ',\n' + araki2026Obj.trim() + '\n' + code.slice(insertPos);
  }
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p149 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p149' || (p.name && p.name.includes('荒木隼人(2026)')));
  console.log('SUCCESS! Added / Updated Hayato Araki 2026 (p149):');
  console.log('Name:', p149.name);
  console.log('Policy:', p149.policy);
  console.log('Overall:', p149.overall, '-> Max:', p149.maxOverall);
  console.log('Base Stats:', p149.baseStats);
  console.log('Max Stats:', p149.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p149.playTendencies);
  console.log('Skill:', p149.skill);
  console.log('Abilities:', p149.abilities);
  console.log(`Total players in mockData.js: ${sandbox.window.INITIAL_PLAYERS.length}`);
} catch (err) {
  console.error('VM eval error:', err.message);
}
