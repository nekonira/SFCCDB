const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Endrick 2026 (p271) ---');

// Slice up to p270 end object
const p270Idx = code.indexOf("id: 'p270'");
if (p270Idx === -1) {
  console.error("Could not find p270!");
  process.exit(1);
}

const p270AvatarIdx = code.indexOf("avatarUrl:", p270Idx);
const p270EndIdx = code.indexOf("}", p270AvatarIdx);

code = code.substring(0, p270EndIdx + 1);

const endrick2026Obj = `,
  {
    id: 'p271',
    name: 'エンドリッキ(2026)',
    readingName: 'えんどりっき',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅲ',
    overall: 7246,
    maxOverall: 15470,
    baseStats: { shoot: 1412, pass: 1228, dribble: 1312, defense: 896, physical: 1178, speed: 893 },
    detailStats: {
      shoot: { finishing: 472, power: 472, composure: 468 },
      pass: { shortPass: 416, longPass: 410, accuracy: 402 },
      dribble: { breakout: 440, keeping: 455, ballTouch: 417 },
      defense: { tackle: 304, interception: 302, marking: 290 },
      physical: { jumping: 310, contact: 451, stamina: 417 },
      speed: { running: 451, agility: 442 }
    },
    maxEnhanced: {
      overall: 15470,
      baseStats: { shoot: 3017, pass: 2761, dribble: 2893, defense: 2393, physical: 2759, speed: 1939 },
      detailStats: {
        shoot: { finishing: 1007, power: 1007, composure: 1003 },
        pass: { shortPass: 927, longPass: 921, accuracy: 913 },
        dribble: { breakout: 963, keeping: 978, ballTouch: 952 },
        defense: { tackle: 803, interception: 801, marking: 789 },
        physical: { jumping: 833, contact: 986, stamina: 940 },
        speed: { running: 974, agility: 965 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ターゲットマン', rank: '銀', description: '発動条件：途中出場　/　決定力・キープ力UP' },
      { name: 'パワフルランナー', rank: '銀', description: '発動条件：途中出場　/　コンタクト・走力UP' },
      { name: 'ムービングスナイパー', rank: '銅', description: '発動条件：途中出場　/　冷静さ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += endrick2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p271 (Endrick 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p271 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p271');
console.log('p271 verified:', p271 ? p271.name : 'MISSING');
