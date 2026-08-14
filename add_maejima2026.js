const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Yota Maejima 2026 (p170) ---');

// Slice up to p169 end object
const p169Idx = code.indexOf("id: 'p169'");
if (p169Idx === -1) {
  console.error("Could not find p169!");
  process.exit(1);
}

const p169AvatarIdx = code.indexOf("avatarUrl:", p169Idx);
const p169EndIdx = code.indexOf("}", p169AvatarIdx);

code = code.substring(0, p169EndIdx + 1);

const maejima2026Obj = `,
  {
    id: 'p170',
    name: '前嶋洋太(2026)',
    readingName: 'まえじまようた',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6252,
    maxOverall: 14469,
    baseStats: { shoot: 958, pass: 1115, dribble: 1286, defense: 1125, physical: 1099, speed: 813 },
    detailStats: {
      shoot: { finishing: 310, power: 305, composure: 343 },
      pass: { shortPass: 368, longPass: 368, accuracy: 379 },
      dribble: { breakout: 428, keeping: 420, ballTouch: 438 },
      defense: { tackle: 390, interception: 372, marking: 363 },
      physical: { jumping: 365, contact: 323, stamina: 411 },
      speed: { running: 378, agility: 435 }
    },
    maxEnhanced: {
      overall: 14469,
      baseStats: { shoot: 2455, pass: 2684, dribble: 2819, defense: 2730, physical: 2668, speed: 1883 },
      detailStats: {
        shoot: { finishing: 809, power: 804, composure: 842 },
        pass: { shortPass: 891, longPass: 891, accuracy: 902 },
        dribble: { breakout: 939, keeping: 931, ballTouch: 949 },
        defense: { tackle: 925, interception: 907, marking: 898 },
        physical: { jumping: 876, contact: 846, stamina: 946 },
        speed: { running: 913, agility: 970 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：途中出場　/　ボールタッチ・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += maejima2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p170 (Yota Maejima 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p170 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p170');
console.log('p170 verified:', p170 ? p170.name : 'MISSING');
