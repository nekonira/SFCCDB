const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Tsukasa Shiotani 2026 (p157) ---');

// Slice up to p156 end object
const p156Idx = code.indexOf("id: 'p156'");
if (p156Idx === -1) {
  console.error("Could not find p156!");
  process.exit(1);
}

const p156AvatarIdx = code.indexOf("avatarUrl:", p156Idx);
const p156EndIdx = code.indexOf("}", p156AvatarIdx);

code = code.substring(0, p156EndIdx + 1);

const shiotani2026Obj = `,
  {
    id: 'p157',
    name: '塩谷司(2026)',
    readingName: 'しおたにつかさ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6497,
    maxOverall: 14754,
    baseStats: { shoot: 1052, pass: 1223, dribble: 1035, defense: 1286, physical: 1126, speed: 674 },
    detailStats: {
      shoot: { finishing: 342, power: 357, composure: 353 },
      pass: { shortPass: 384, longPass: 398, accuracy: 441 },
      dribble: { breakout: 335, keeping: 335, ballTouch: 365 },
      defense: { tackle: 426, interception: 429, marking: 431 },
      physical: { jumping: 357, contact: 392, stamina: 377 },
      speed: { running: 329, agility: 345 }
    },
    maxEnhanced: {
      overall: 14754,
      baseStats: { shoot: 2549, pass: 2792, dribble: 2568, defense: 2891, physical: 2719, speed: 1720 },
      detailStats: {
        shoot: { finishing: 841, power: 856, composure: 852 },
        pass: { shortPass: 907, longPass: 921, accuracy: 964 },
        dribble: { breakout: 846, keeping: 846, ballTouch: 876 },
        defense: { tackle: 961, interception: 964, marking: 966 },
        physical: { jumping: 892, contact: 927, stamina: 900 },
        speed: { running: 852, agility: 868 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: '競り合うロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += shiotani2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p157 (Tsukasa Shiotani 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p157 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p157');
console.log('p157 verified:', p157 ? p157.name : 'MISSING');
