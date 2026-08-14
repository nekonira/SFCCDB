const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding / Updating Julien Célestine 2026 (p156) ---');

const celestine2026Obj = `{
    id: 'p156',
    name: 'ジュリアン・セレスティン(2026)',
    readingName: 'じゅりあんせれすてぃん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6357,
    maxOverall: 14629,
    baseStats: { shoot: 1031, pass: 891, dribble: 1084, defense: 1259, physical: 1216, speed: 720 },
    detailStats: {
      shoot: { finishing: 323, power: 366, composure: 342 },
      pass: { shortPass: 291, longPass: 289, accuracy: 311 },
      dribble: { breakout: 365, keeping: 373, ballTouch: 346 },
      defense: { tackle: 402, interception: 427, marking: 430 },
      physical: { jumping: 437, contact: 406, stamina: 373 },
      speed: { running: 347, agility: 373 }
    },
    maxEnhanced: {
      overall: 14629,
      baseStats: { shoot: 2528, pass: 2460, dribble: 2617, defense: 2864, physical: 2809, speed: 1766 },
      detailStats: {
        shoot: { finishing: 822, power: 865, composure: 841 },
        pass: { shortPass: 814, longPass: 812, accuracy: 834 },
        dribble: { breakout: 876, keeping: 884, ballTouch: 857 },
        defense: { tackle: 937, interception: 962, marking: 965 },
        physical: { jumping: 972, contact: 941, stamina: 896 },
        speed: { running: 870, agility: 896 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' },
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' }
    ],
    avatarUrl: ''
  }`;

// Check if p156 already exists in mockData.js
if (code.includes("id: 'p156'")) {
  code = code.replace(/\{\s*id:\s*['"]p156['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, celestine2026Obj.trim());
} else {
  // Find where window.INITIAL_PLAYERS array ends before SAKATSUKU_DATA
  const lastObjEnd = code.lastIndexOf('}');
  if (lastObjEnd > 0) {
    const arrayEnd = code.indexOf('];', lastObjEnd);
    if (arrayEnd > 0) {
      code = code.slice(0, arrayEnd) + ',\n' + celestine2026Obj.trim() + '\n' + code.slice(arrayEnd);
    }
  }
}

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p156 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p156');
  if (p156) {
    console.log('SUCCESS! Added Julien Célestine 2026 (p156) to mockData.js. Total players: ' + sandbox.window.INITIAL_PLAYERS.length);
  } else {
    console.error('FAILED to find p156 in INITIAL_PLAYERS after addition!');
  }
} catch (err) {
  console.error('VM eval error:', err.message);
}
