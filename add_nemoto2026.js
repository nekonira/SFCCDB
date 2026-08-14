const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Kenta Nemoto 2026 (p160) ---');

// Slice up to p159 end object
const p159Idx = code.indexOf("id: 'p159'");
if (p159Idx === -1) {
  console.error("Could not find p159!");
  process.exit(1);
}

const p159AvatarIdx = code.indexOf("avatarUrl:", p159Idx);
const p159EndIdx = code.indexOf("}", p159AvatarIdx);

code = code.substring(0, p159EndIdx + 1);

const nemoto2026Obj = `,
  {
    id: 'p160',
    name: '根本健太(2026)',
    readingName: 'ねもとけんた',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6414,
    maxOverall: 14664,
    baseStats: { shoot: 923, pass: 1101, dribble: 1050, defense: 1258, physical: 1171, speed: 727 },
    detailStats: {
      shoot: { finishing: 287, power: 339, composure: 297 },
      pass: { shortPass: 365, longPass: 384, accuracy: 352 },
      dribble: { breakout: 334, keeping: 345, ballTouch: 371 },
      defense: { tackle: 401, interception: 419, marking: 438 },
      physical: { jumping: 386, contact: 397, stamina: 388 },
      speed: { running: 371, agility: 356 }
    },
    maxEnhanced: {
      overall: 14664,
      baseStats: { shoot: 2420, pass: 2670, dribble: 2583, defense: 2863, physical: 2764, speed: 1773 },
      detailStats: {
        shoot: { finishing: 786, power: 838, composure: 796 },
        pass: { shortPass: 888, longPass: 907, accuracy: 875 },
        dribble: { breakout: 845, keeping: 856, ballTouch: 882 },
        defense: { tackle: 936, interception: 954, marking: 973 },
        physical: { jumping: 921, contact: 932, stamina: 911 },
        speed: { running: 894, agility: 879 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += nemoto2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p160 (Kenta Nemoto 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p160 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p160');
console.log('p160 verified:', p160 ? p160.name : 'MISSING');
