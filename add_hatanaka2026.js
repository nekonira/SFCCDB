const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Shinnosuke Hatanaka 2026 (p159) ---');

// Slice up to p158 end object
const p158Idx = code.indexOf("id: 'p158'");
if (p158Idx === -1) {
  console.error("Could not find p158!");
  process.exit(1);
}

const p158AvatarIdx = code.indexOf("avatarUrl:", p158Idx);
const p158EndIdx = code.indexOf("}", p158AvatarIdx);

code = code.substring(0, p158EndIdx + 1);

const hatanaka2026Obj = `,
  {
    id: 'p159',
    name: '畠中槙之輔(2026)',
    readingName: 'はたなかしんのすけ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '組立CB',
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
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '跳躍するロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += hatanaka2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p159 (Shinnosuke Hatanaka 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p159 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p159');
console.log('p159 verified:', p159 ? p159.name : 'MISSING');
