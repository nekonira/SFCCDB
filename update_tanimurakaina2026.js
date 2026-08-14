const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING KAINA TANIMURA 2026 (p257) STATS ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p257Idx = mockCode.indexOf("id: 'p257'");
const altP257Idx = mockCode.indexOf('"id": "p257"');
const targetP257Idx = p257Idx !== -1 ? p257Idx : altP257Idx;

if (targetP257Idx === -1) {
  console.error("Could not find p257 in mockData.js!");
  process.exit(1);
}

const p257AvatarIdx = mockCode.indexOf("avatarUrl:", targetP257Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP257Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP257Idx);
const p257EndIdx = mockCode.indexOf("}", p257AvatarIdx);

// Find start of p257 object ({ id: 'p257')
const p257StartIdx = mockCode.lastIndexOf("{", targetP257Idx);

const newP257Obj = `{
    id: 'p257',
    name: '谷村海那(2026)',
    readingName: 'たにむら・かいな',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6330,
    maxOverall: 14555,
    baseStats: { shoot: 1147, pass: 1016, dribble: 1143, defense: 964, physical: 1251, speed: 762 },
    detailStats: {
      shoot: { finishing: 369, power: 374, composure: 404 },
      pass: { shortPass: 377, longPass: 321, accuracy: 318 },
      dribble: { breakout: 377, keeping: 391, ballTouch: 375 },
      defense: { tackle: 400, interception: 293, marking: 271 },
      physical: { jumping: 455, contact: 422, stamina: 374 },
      speed: { running: 378, agility: 384 }
    },
    maxEnhanced: {
      overall: 14555,
      baseStats: { shoot: 2779, pass: 2549, dribble: 2724, defense: 2461, physical: 2832, speed: 1808 },
      detailStats: {
        shoot: { finishing: 931, power: 909, composure: 939 },
        pass: { shortPass: 888, longPass: 832, accuracy: 829 },
        dribble: { breakout: 900, keeping: 914, ballTouch: 910 },
        defense: { tackle: 899, interception: 792, marking: 770 },
        physical: { jumping: 978, contact: 957, stamina: 897 },
        speed: { running: 901, agility: 907 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'パワーヘッド', rank: '銀', description: '発動条件：途中出場　/　決定力・ジャンプUP' },
      { name: '保持からの一撃', rank: '銀', description: '発動条件：途中出場　/　キック力・キープ力UP' }
    ],
    avatarUrl: ''
  }`;

mockCode = mockCode.substring(0, p257StartIdx) + newP257Obj + mockCode.substring(p257EndIdx + 1);
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('Updated mockData.js with new p257 stats.');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p257 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p257');
console.log('Verification of updated p257:', p257 ? p257.name : 'MISSING');
if (p257) {
  console.log('   Overall:', p257.overall, '| MaxOverall:', p257.maxOverall);
  console.log('   baseStats:', JSON.stringify(p257.baseStats));
  console.log('   maxEnhanced baseStats:', JSON.stringify(p257.maxEnhanced.baseStats));
}
