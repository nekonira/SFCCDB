const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Yasufumi Nishimura 2026 (p176) ---');

// Slice up to p175 end object
const p175Idx = code.indexOf("id: 'p175'");
if (p175Idx === -1) {
  console.error("Could not find p175!");
  process.exit(1);
}

const p175AvatarIdx = code.indexOf("avatarUrl:", p175Idx);
const p175EndIdx = code.indexOf("}", p175AvatarIdx);

code = code.substring(0, p175EndIdx + 1);

const nishimura2026Obj = `,
  {
    id: 'p176',
    name: '西村恭史(2026)',
    readingName: 'にしむらやすふみ',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6038,
    maxOverall: 14217,
    baseStats: { shoot: 876, pass: 1053, dribble: 1092, defense: 1146, physical: 1144, speed: 792 },
    detailStats: {
      shoot: { finishing: 276, power: 325, composure: 275 },
      pass: { shortPass: 349, longPass: 352, accuracy: 352 },
      dribble: { breakout: 369, keeping: 353, ballTouch: 370 },
      defense: { tackle: 378, interception: 384, marking: 384 },
      physical: { jumping: 383, contact: 371, stamina: 390 },
      speed: { running: 396, agility: 396 }
    },
    maxEnhanced: {
      overall: 14217,
      baseStats: { shoot: 2421, pass: 2658, dribble: 2625, defense: 2727, physical: 2713, speed: 1814 },
      detailStats: {
        shoot: { finishing: 787, power: 836, composure: 798 },
        pass: { shortPass: 884, longPass: 887, accuracy: 887 },
        dribble: { breakout: 880, keeping: 864, ballTouch: 881 },
        defense: { tackle: 913, interception: 907, marking: 907 },
        physical: { jumping: 894, contact: 894, stamina: 925 },
        speed: { running: 907, agility: 907 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' },
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += nishimura2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p176 (Yasufumi Nishimura 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p176 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p176');
console.log('p176 verified:', p176 ? p176.name : 'MISSING');
