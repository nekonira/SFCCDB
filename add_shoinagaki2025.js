const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SHO INAGAKI (p321) ===');

// 1. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p320Idx = mockCode.indexOf("id: 'p320'");
if (p320Idx === -1) {
  console.error("Could not find p320 in mockData.js!");
  process.exit(1);
}

const p320AvatarIdx = mockCode.indexOf("avatarUrl:", p320Idx);
const p320EndIdx = mockCode.indexOf("}", p320AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p320EndIdx + 1);

const inagakiObj = `,
  {
    id: 'p321',
    name: '稲垣祥',
    readingName: 'いながき・しょう',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6273,
    maxOverall: 14416,
    baseStats: { shoot: 1133, pass: 1061, dribble: 1163, defense: 1121, physical: 1155, speed: 782 },
    detailStats: {
      shoot: { finishing: 377, power: 380, composure: 376 },
      pass: { shortPass: 369, longPass: 341, accuracy: 351 },
      dribble: { breakout: 386, keeping: 377, ballTouch: 400 },
      defense: { tackle: 357, interception: 409, marking: 355 },
      physical: { jumping: 347, contact: 346, stamina: 462 },
      speed: { running: 372, agility: 410 }
    },
    maxEnhanced: {
      overall: 14416,
      baseStats: { shoot: 2678, pass: 2666, dribble: 2696, defense: 2702, physical: 2724, speed: 1804 },
      detailStats: {
        shoot: { finishing: 888, power: 891, composure: 899 },
        pass: { shortPass: 904, longPass: 876, accuracy: 886 },
        dribble: { breakout: 897, keeping: 888, ballTouch: 911 },
        defense: { tackle: 892, interception: 932, marking: 878 },
        physical: { jumping: 858, contact: 869, stamina: 997 },
        speed: { running: 883, agility: 921 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：前中・中全・後全　/　発動条件：パスカット時　/　パスカット・タックルUP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '絢爛なインターセプト', rank: '銀', description: '発動条件：好調　/　ボールタッチ・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + inagakiObj, 'utf-8');
console.log('2. mockData.js updated with p321 (Sho Inagaki) in UTF-8.');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p321 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p321');
console.log('3. Verification of p321:', p321 ? `${p321.name} (Overall: ${p321.overall}, maxOverall: ${p321.maxOverall}, Rarity: ${p321.rarity})` : 'MISSING');

console.log('=== SHO INAGAKI ADDED SUCCESSFULLY! ===');
