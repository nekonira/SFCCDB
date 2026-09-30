const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

console.log('=== Safely Updating Stats for p105: ジョアン・ガルシア ===');

const p105Start = mockCode.indexOf("id: 'p105'");
const p106Start = mockCode.indexOf("id: 'p106'");

if (p105Start === -1 || p106Start === -1) {
  console.error("p105 or p106 not found!");
  process.exit(1);
}

const updatedP105 = `id: 'p105',
    name: 'ジョアン・ガルシア',
    readingName: 'じょあんがるしあ',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ムービング',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 6931,
    maxOverall: 15251,
    baseStats: { shoot: 903, pass: 1097, dribble: 1034, defense: 1364, physical: 1158, speed: 775 },
    detailStats: {
      shoot: { finishing: 291, power: 294, composure: 318 },
      pass: { shortPass: 355, longPass: 373, accuracy: 369 },
      dribble: { breakout: 364, keeping: 329, ballTouch: 341 },
      defense: { tackle: 442, interception: 468, marking: 454 },
      physical: { jumping: 420, contact: 386, stamina: 352 },
      speed: { running: 349, agility: 426 }
    },
    maxEnhanced: {
      overall: 15251,
      baseStats: { shoot: 2364, pass: 2702, dribble: 2495, defense: 2969, physical: 2751, speed: 1797 },
      detailStats: {
        shoot: { finishing: 778, power: 781, composure: 805 },
        pass: { shortPass: 890, longPass: 908, accuracy: 904 },
        dribble: { breakout: 851, keeping: 816, ballTouch: 828 },
        defense: { tackle: 977, interception: 1003, marking: 989 },
        physical: { jumping: 955, contact: 921, stamina: 875 },
        speed: { running: 860, agility: 937 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/{セービング・反応速度UP' },
    abilities: [
      { name: '上空の守護神', rank: '銀', description: '発動条件：好調　/　セービング・ジャンプUP' },
      { name: '冷静沈着', rank: '銀', description: '発動条件：途中出場　/　反応速度・1VS1UP' }
    ],
    avatarUrl: ''
  },
  `;

// Replace from p105Start to p106Start
mockCode = mockCode.substring(0, p105Start) + updatedP105 + mockCode.substring(p106Start);

fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('✅ Safely replaced p105 in mockData.js');

// Verify using VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);

const p105 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p105');
if (p105) {
  console.log('🎉 VM EVALUATION VERIFICATION SUCCESSFUL!');
  console.log('ID:', p105.id);
  console.log('Name:', p105.name);
  console.log('Overall:', p105.overall, '-> Max Overall:', p105.maxOverall);
  console.log('Base Defense:', p105.baseStats.defense);
  console.log('  Detail Defense:', p105.detailStats.defense);
  console.log('Max Defense:', p105.maxEnhanced.baseStats.defense);
  console.log('  Detail Defense:', p105.maxEnhanced.detailStats.defense);
} else {
  console.error('❌ Failed to evaluate p105 in mockData.js');
}
