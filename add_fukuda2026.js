const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Shinnosuke Fukuda 2026 (p174) ---');

// Slice up to p173 end object
const p173Idx = code.indexOf("id: 'p173'");
if (p173Idx === -1) {
  console.error("Could not find p173!");
  process.exit(1);
}

const p173AvatarIdx = code.indexOf("avatarUrl:", p173Idx);
const p173EndIdx = code.indexOf("}", p173AvatarIdx);

code = code.substring(0, p173EndIdx + 1);

const fukuda2026Obj = `,
  {
    id: 'p174',
    name: '福田心之助(2026)',
    readingName: 'ふくだしんのすけ',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6300,
    maxOverall: 14528,
    baseStats: { shoot: 1004, pass: 1120, dribble: 1272, defense: 1042, physical: 1118, speed: 860 },
    detailStats: {
      shoot: { finishing: 314, power: 346, composure: 344 },
      pass: { shortPass: 374, longPass: 374, accuracy: 372 },
      dribble: { breakout: 420, keeping: 429, ballTouch: 423 },
      defense: { tackle: 353, interception: 359, marking: 330 },
      physical: { jumping: 363, contact: 333, stamina: 422 },
      speed: { running: 424, agility: 436 }
    },
    maxEnhanced: {
      overall: 14528,
      baseStats: { shoot: 2501, pass: 2689, dribble: 2805, defense: 2647, physical: 2687, speed: 1930 },
      detailStats: {
        shoot: { finishing: 813, power: 845, composure: 843 },
        pass: { shortPass: 897, longPass: 897, accuracy: 895 },
        dribble: { breakout: 931, keeping: 940, ballTouch: 934 },
        defense: { tackle: 888, interception: 894, marking: 865 },
        physical: { jumping: 874, contact: 856, stamina: 957 },
        speed: { running: 959, agility: 971 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '打開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: '技巧派ドリブラー', rank: '銀', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += fukuda2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p174 (Shinnosuke Fukuda 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p174 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p174');
console.log('p174 verified:', p174 ? p174.name : 'MISSING');
