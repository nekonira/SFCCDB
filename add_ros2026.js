const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Juan Antonio Ros 2026 (p162) ---');

// Slice up to p161 end object
const p161Idx = code.indexOf("id: 'p161'");
if (p161Idx === -1) {
  console.error("Could not find p161!");
  process.exit(1);
}

const p161AvatarIdx = code.indexOf("avatarUrl:", p161Idx);
const p161EndIdx = code.indexOf("}", p161AvatarIdx);

code = code.substring(0, p161EndIdx + 1);

const ros2026Obj = `,
  {
    id: 'p162',
    name: 'フアン・アントニオ・ロス(2026)',
    readingName: 'ふあんあんとにおろす',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スペイン',
    policy: 'ムービング',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6481,
    maxOverall: 14731,
    baseStats: { shoot: 939, pass: 1157, dribble: 1130, defense: 1251, physical: 1173, speed: 732 },
    detailStats: {
      shoot: { finishing: 293, power: 326, composure: 320 },
      pass: { shortPass: 406, longPass: 388, accuracy: 363 },
      dribble: { breakout: 366, keeping: 368, ballTouch: 396 },
      defense: { tackle: 411, interception: 426, marking: 414 },
      physical: { jumping: 411, contact: 378, stamina: 384 },
      speed: { running: 381, agility: 351 }
    },
    maxEnhanced: {
      overall: 14731,
      baseStats: { shoot: 2436, pass: 2726, dribble: 2663, defense: 2856, physical: 2766, speed: 1778 },
      detailStats: {
        shoot: { finishing: 792, power: 825, composure: 819 },
        pass: { shortPass: 929, longPass: 911, accuracy: 886 },
        dribble: { breakout: 877, keeping: 879, ballTouch: 907 },
        defense: { tackle: 946, interception: 961, marking: 949 },
        physical: { jumping: 946, contact: 913, stamina: 907 },
        speed: { running: 904, agility: 874 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += ros2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p162 (Juan Antonio Ros 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p162 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p162');
console.log('p162 verified:', p162 ? p162.name : 'MISSING');
