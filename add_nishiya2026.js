const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Yuki Nishiya 2026 (p175) ---');

// Slice up to p174 end object
const p174Idx = code.indexOf("id: 'p174'");
if (p174Idx === -1) {
  console.error("Could not find p174!");
  process.exit(1);
}

const p174AvatarIdx = code.indexOf("avatarUrl:", p174Idx);
const p174EndIdx = code.indexOf("}", p174AvatarIdx);

code = code.substring(0, p174EndIdx + 1);

const nishiya2026Obj = `,
  {
    id: 'p175',
    name: '西谷優希(2026)',
    readingName: 'にしやゆうき',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6212,
    maxOverall: 14389,
    baseStats: { shoot: 971, pass: 1110, dribble: 1133, defense: 1179, physical: 1139, speed: 749 },
    detailStats: {
      shoot: { finishing: 292, power: 374, composure: 305 },
      pass: { shortPass: 395, longPass: 370, accuracy: 345 },
      dribble: { breakout: 329, keeping: 402, ballTouch: 402 },
      defense: { tackle: 397, interception: 384, marking: 398 },
      physical: { jumping: 351, contact: 391, stamina: 397 },
      speed: { running: 385, agility: 364 }
    },
    maxEnhanced: {
      overall: 14389,
      baseStats: { shoot: 2516, pass: 2715, dribble: 2666, defense: 2760, physical: 2708, speed: 1771 },
      detailStats: {
        shoot: { finishing: 803, power: 885, composure: 828 },
        pass: { shortPass: 930, longPass: 905, accuracy: 880 },
        dribble: { breakout: 840, keeping: 913, ballTouch: 913 },
        defense: { tackle: 932, interception: 907, marking: 921 },
        physical: { jumping: 862, contact: 914, stamina: 932 },
        speed: { running: 896, agility: 875 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '反撃のパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・タックルUP' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += nishiya2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p175 (Yuki Nishiya 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p175 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p175');
console.log('p175 verified:', p175 ? p175.name : 'MISSING');
