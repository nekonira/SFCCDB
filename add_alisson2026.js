const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Alisson 2026 (p270) ---');

// Slice up to p269 end object
const p269Idx = code.indexOf("id: 'p269'");
if (p269Idx === -1) {
  console.error("Could not find p269!");
  process.exit(1);
}

const p269AvatarIdx = code.indexOf("avatarUrl:", p269Idx);
const p269EndIdx = code.indexOf("}", p269AvatarIdx);

code = code.substring(0, p269EndIdx + 1);

const alisson2026Obj = `,
  {
    id: 'p270',
    name: 'アリソン(2026)',
    readingName: 'ありそん',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 7543,
    maxOverall: 15928,
    baseStats: { shoot: 1054, pass: 1234, dribble: 1080, defense: 1434, physical: 1204, speed: 811 },
    detailStats: {
      shoot: { finishing: 350, power: 333, composure: 371 },
      pass: { shortPass: 400, longPass: 419, accuracy: 415 },
      dribble: { breakout: 379, keeping: 355, ballTouch: 346 },
      defense: { tackle: 468, interception: 483, marking: 483 },
      physical: { jumping: 453, contact: 457, stamina: 294 },
      speed: { running: 378, agility: 433 }
    },
    maxEnhanced: {
      overall: 15928,
      baseStats: { shoot: 2515, pass: 2839, dribble: 2541, defense: 3039, physical: 2797, speed: 1833 },
      detailStats: {
        shoot: { finishing: 837, power: 820, composure: 858 },
        pass: { shortPass: 935, longPass: 954, accuracy: 950 },
        dribble: { breakout: 866, keeping: 842, ballTouch: 833 },
        defense: { tackle: 1003, interception: 1018, marking: 1018 },
        physical: { jumping: 988, contact: 992, stamina: 817 },
        speed: { running: 889, agility: 944 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: 'エレガントセーブ', rank: '銀', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '守護神', rank: '金', description: '発動条件：好調　/　セービング・反応速度・コンタクトUP' },
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' },
      { name: '高性能ロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・キック精度UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += alisson2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p270 (Alisson 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p270 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p270');
console.log('p270 verified:', p270 ? p270.name : 'MISSING');
