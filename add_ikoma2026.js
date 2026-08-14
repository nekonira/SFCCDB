const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Kei Ikoma 2026 (p166) ---');

// Slice up to p165 end object
const p165Idx = code.indexOf("id: 'p165'");
if (p165Idx === -1) {
  console.error("Could not find p165!");
  process.exit(1);
}

const p165AvatarIdx = code.indexOf("avatarUrl:", p165Idx);
const p165EndIdx = code.indexOf("}", p165AvatarIdx);

code = code.substring(0, p165EndIdx + 1);

const ikoma2026Obj = `,
  {
    id: 'p166',
    name: '生駒稀生(2026)',
    readingName: 'いこまけい',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 5936,
    maxOverall: 14173,
    baseStats: { shoot: 1146, pass: 1097, dribble: 1121, defense: 1219, physical: 1078, speed: 659 },
    detailStats: {
      shoot: { finishing: 372, power: 405, composure: 369 },
      pass: { shortPass: 386, longPass: 376, accuracy: 335 },
      dribble: { breakout: 370, keeping: 370, ballTouch: 381 },
      defense: { tackle: 398, interception: 419, marking: 402 },
      physical: { jumping: 368, contact: 415, stamina: 295 },
      speed: { running: 313, agility: 346 }
    },
    maxEnhanced: {
      overall: 14173,
      baseStats: { shoot: 2643, pass: 2666, dribble: 2654, defense: 2824, physical: 2647, speed: 1729 },
      detailStats: {
        shoot: { finishing: 871, power: 904, composure: 868 },
        pass: { shortPass: 909, longPass: 899, accuracy: 858 },
        dribble: { breakout: 881, keeping: 881, ballTouch: 892 },
        defense: { tackle: 933, interception: 954, marking: 937 },
        physical: { jumping: 879, contact: 938, stamina: 830 },
        speed: { running: 848, agility: 881 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += ikoma2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p166 (Kei Ikoma 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p166 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p166');
console.log('p166 verified:', p166 ? p166.name : 'MISSING');
