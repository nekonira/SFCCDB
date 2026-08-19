const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Mason Greenwood 2026 (p272) ---');

// Slice up to p271 end object
const p271Idx = code.indexOf("id: 'p271'");
if (p271Idx === -1) {
  console.error("Could not find p271!");
  process.exit(1);
}

const p271AvatarIdx = code.indexOf("avatarUrl:", p271Idx);
const p271EndIdx = code.indexOf("}", p271AvatarIdx);

code = code.substring(0, p271EndIdx + 1);

const greenwood2026Obj = `,
  {
    id: 'p272',
    name: 'メイソン・グリーンウッド(2026)',
    readingName: 'めいそんぐりーんうっど',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ジャマイカ',
    policy: 'ムービング',
    playStyle: 'ワイドストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 6907,
    maxOverall: 15086,
    baseStats: { shoot: 1303, pass: 1250, dribble: 1326, defense: 915, physical: 1124, speed: 853 },
    detailStats: {
      shoot: { finishing: 453, power: 401, composure: 449 },
      pass: { shortPass: 428, longPass: 411, accuracy: 411 },
      dribble: { breakout: 448, keeping: 441, ballTouch: 437 },
      defense: { tackle: 282, interception: 322, marking: 311 },
      physical: { jumping: 378, contact: 365, stamina: 381 },
      speed: { running: 423, agility: 430 }
    },
    maxEnhanced: {
      overall: 15086,
      baseStats: { shoot: 2860, pass: 2819, dribble: 2919, defense: 2424, physical: 2669, speed: 1923 },
      detailStats: {
        shoot: { finishing: 976, power: 912, composure: 972 },
        pass: { shortPass: 951, longPass: 934, accuracy: 934 },
        dribble: { breakout: 983, keeping: 976, ballTouch: 960 },
        defense: { tackle: 793, interception: 821, marking: 810 },
        physical: { jumping: 889, contact: 876, stamina: 904 },
        speed: { running: 958, agility: 965 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: 'スリップビート', rank: '銀', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: 'スピードランナー', rank: '銀', description: '発動条件：好調　/　走力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += greenwood2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p272 (Greenwood 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p272 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p272');
console.log('p272 verified:', p272 ? p272.name : 'MISSING');
