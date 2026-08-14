const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Gen Shoji 2026 (p158) ---');

// Slice up to p157 end object
const p157Idx = code.indexOf("id: 'p157'");
if (p157Idx === -1) {
  console.error("Could not find p157!");
  process.exit(1);
}

const p157AvatarIdx = code.indexOf("avatarUrl:", p157Idx);
const p157EndIdx = code.indexOf("}", p157AvatarIdx);

code = code.substring(0, p157EndIdx + 1);

const shoji2026Obj = `,
  {
    id: 'p158',
    name: '昌子源(2026)',
    readingName: 'しょうじげん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6510,
    maxOverall: 14750,
    baseStats: { shoot: 996, pass: 1117, dribble: 1196, defense: 1295, physical: 1171, speed: 620 },
    detailStats: {
      shoot: { finishing: 311, power: 365, composure: 320 },
      pass: { shortPass: 358, longPass: 380, accuracy: 379 },
      dribble: { breakout: 375, keeping: 397, ballTouch: 424 },
      defense: { tackle: 433, interception: 432, marking: 430 },
      physical: { jumping: 386, contact: 414, stamina: 371 },
      speed: { running: 301, agility: 319 }
    },
    maxEnhanced: {
      overall: 14750,
      baseStats: { shoot: 2493, pass: 2686, dribble: 2729, defense: 2900, physical: 2764, speed: 1666 },
      detailStats: {
        shoot: { finishing: 810, power: 864, composure: 819 },
        pass: { shortPass: 881, longPass: 903, accuracy: 902 },
        dribble: { breakout: 886, keeping: 908, ballTouch: 935 },
        defense: { tackle: 968, interception: 967, marking: 965 },
        physical: { jumping: 921, contact: 949, stamina: 894 },
        speed: { running: 824, agility: 842 }
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
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += shoji2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p158 (Gen Shoji 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p158 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p158');
console.log('p158 verified:', p158 ? p158.name : 'MISSING');
