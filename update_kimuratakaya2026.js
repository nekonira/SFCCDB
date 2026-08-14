const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING TAKAYA KIMURA 2026 (p196) ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p196Idx = mockCode.indexOf("id: 'p196'");
if (p196Idx === -1) {
  console.error("Could not find p196 in mockData.js!");
  process.exit(1);
}

const p196AvatarIdx = mockCode.indexOf("avatarUrl:", p196Idx);
const p196EndIdx = mockCode.indexOf("}", p196AvatarIdx);

const beforeP196 = mockCode.substring(0, p196Idx);
const afterP196 = mockCode.substring(p196EndIdx + 1);

const updatedKimuraTakayaObj = `id: 'p196',
    name: '木村太哉(2026)',
    readingName: 'きむらたかや',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 6385,
    maxOverall: 14474,
    baseStats: { shoot: 1151, pass: 1147, dribble: 1214, defense: 1070, physical: 1149, speed: 839 },
    detailStats: {
      shoot: { finishing: 390, power: 352, composure: 409 },
      pass: { shortPass: 374, longPass: 395, accuracy: 378 },
      dribble: { breakout: 406, keeping: 399, ballTouch: 409 },
      defense: { tackle: 341, interception: 370, marking: 359 },
      physical: { jumping: 405, contact: 378, stamina: 366 },
      speed: { running: 405, agility: 434 }
    },
    maxEnhanced: {
      overall: 14474,
      baseStats: { shoot: 2696, pass: 2728, dribble: 2783, defense: 2615, physical: 2718, speed: 1873 },
      detailStats: {
        shoot: { finishing: 901, power: 863, composure: 932 },
        pass: { shortPass: 909, longPass: 918, accuracy: 901 },
        dribble: { breakout: 929, keeping: 922, ballTouch: 932 },
        defense: { tackle: 864, interception: 881, marking: 870 },
        physical: { jumping: 916, contact: 901, stamina: 901 },
        speed: { running: 916, agility: 957 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '冷静な突破', rank: '銀', description: '発動条件：絶好調　/　冷静さ・突破力UP' }
    ],
    avatarUrl: ''
  }`;

mockCode = beforeP196 + updatedKimuraTakayaObj + afterP196;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('mockData.js updated with p196 (corrected stats) in UTF-8.');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p196 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p196');
console.log('Verification of p196:', p196 ? `${p196.name} (overall: ${p196.overall}, maxOverall: ${p196.maxOverall})` : 'MISSING');

console.log('=== UPDATE COMPLETE! ===');
