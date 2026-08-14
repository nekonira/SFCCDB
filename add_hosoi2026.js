const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Kyo Hosoi 2026 (p161) ---');

// Slice up to p160 end object
const p160Idx = code.indexOf("id: 'p160'");
if (p160Idx === -1) {
  console.error("Could not find p160!");
  process.exit(1);
}

const p160AvatarIdx = code.indexOf("avatarUrl:", p160Idx);
const p160EndIdx = code.indexOf("}", p160AvatarIdx);

code = code.substring(0, p160EndIdx + 1);

const hosoi2026Obj = `,
  {
    id: 'p161',
    name: '細井響(2026)',
    readingName: 'ほそいきょう',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '組立CB',
    playStyleLevel: 'Ⅱ',
    overall: 6226,
    maxOverall: 14470,
    baseStats: { shoot: 866, pass: 1161, dribble: 1089, defense: 1174, physical: 1152, speed: 687 },
    detailStats: {
      shoot: { finishing: 284, power: 293, composure: 289 },
      pass: { shortPass: 380, longPass: 404, accuracy: 377 },
      dribble: { breakout: 372, keeping: 349, ballTouch: 368 },
      defense: { tackle: 395, interception: 380, marking: 399 },
      physical: { jumping: 391, contact: 378, stamina: 383 },
      speed: { running: 323, agility: 364 }
    },
    maxEnhanced: {
      overall: 14470,
      baseStats: { shoot: 2363, pass: 2730, dribble: 2622, defense: 2779, physical: 2745, speed: 1733 },
      detailStats: {
        shoot: { finishing: 783, power: 792, composure: 788 },
        pass: { shortPass: 903, longPass: 927, accuracy: 900 },
        dribble: { breakout: 883, keeping: 860, ballTouch: 879 },
        defense: { tackle: 930, interception: 915, marking: 934 },
        physical: { jumping: 926, contact: 913, stamina: 906 },
        speed: { running: 846, agility: 887 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '奮戦のタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'リスクヘッジロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・マークUP' },
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += hosoi2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p161 (Kyo Hosoi 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p161 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p161');
console.log('p161 verified:', p161 ? p161.name : 'MISSING');
