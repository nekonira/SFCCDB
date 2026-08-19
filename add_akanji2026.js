const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Manuel Akanji 2026 (p273) ---');

// Slice up to p272 end object
const p272Idx = code.indexOf("id: 'p272'");
if (p272Idx === -1) {
  console.error("Could not find p272!");
  process.exit(1);
}

const p272AvatarIdx = code.indexOf("avatarUrl:", p272Idx);
const p272EndIdx = code.indexOf("}", p272AvatarIdx);

code = code.substring(0, p272EndIdx + 1);

const akanji2026Obj = `,
  {
    id: 'p273',
    name: 'マヌエル・アカンジ(2026)',
    readingName: 'まぬえるあかんじ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'スイス',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6897,
    maxOverall: 15166,
    baseStats: { shoot: 960, pass: 1154, dribble: 1166, defense: 1302, physical: 1357, speed: 828 },
    detailStats: {
      shoot: { finishing: 275, power: 357, composure: 328 },
      pass: { shortPass: 404, longPass: 392, accuracy: 358 },
      dribble: { breakout: 377, keeping: 377, ballTouch: 412 },
      defense: { tackle: 436, interception: 434, marking: 432 },
      physical: { jumping: 423, contact: 471, stamina: 463 },
      speed: { running: 424, agility: 404 }
    },
    maxEnhanced: {
      overall: 15166,
      baseStats: { shoot: 2457, pass: 2723, dribble: 2699, defense: 2907, physical: 2950, speed: 1874 },
      detailStats: {
        shoot: { finishing: 774, power: 856, composure: 827 },
        pass: { shortPass: 927, longPass: 915, accuracy: 881 },
        dribble: { breakout: 888, keeping: 888, ballTouch: 923 },
        defense: { tackle: 971, interception: 969, marking: 967 },
        physical: { jumping: 958, contact: 1006, stamina: 986 },
        speed: { running: 947, agility: 927 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ハードタックラー', rank: '銀', description: '発動条件：好調　/　タックル・コンタクトUP' },
      { name: 'ピッチの分断者', rank: '銀', description: '発動条件：絶好調決　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

// Fix typo in description if any: 発動条件：絶好調
akanji2026Obj_clean = akanji2026Obj.replace('発動条件：絶好調決', '発動条件：絶好調');

code += akanji2026Obj_clean;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p273 (Akanji 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p273 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p273');
console.log('p273 verified:', p273 ? p273.name : 'MISSING');
