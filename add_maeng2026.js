const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Maeng Seong-Ung 2026 (p177) ---');

// Slice up to p176 end object
const p176Idx = code.indexOf("id: 'p176'");
if (p176Idx === -1) {
  console.error("Could not find p176!");
  process.exit(1);
}

const p176AvatarIdx = code.indexOf("avatarUrl:", p176Idx);
const p176EndIdx = code.indexOf("}", p176AvatarIdx);

code = code.substring(0, p176EndIdx + 1);

const maeng2026Obj = `,
  {
    id: 'p177',
    name: 'メン・ソンウン(2026)',
    readingName: 'めんそんうん',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 5956,
    maxOverall: 14132,
    baseStats: { shoot: 1019, pass: 1012, dribble: 1167, defense: 1185, physical: 1056, speed: 785 },
    detailStats: {
      shoot: { finishing: 320, power: 384, composure: 315 },
      pass: { shortPass: 399, longPass: 360, accuracy: 253 },
      dribble: { breakout: 363, keeping: 404, ballTouch: 400 },
      defense: { tackle: 403, interception: 396, marking: 386 },
      physical: { jumping: 344, contact: 332, stamina: 380 },
      speed: { running: 405, agility: 380 }
    },
    maxEnhanced: {
      overall: 14132,
      baseStats: { shoot: 2564, pass: 2617, dribble: 2700, defense: 2766, physical: 2625, speed: 1807 },
      detailStats: {
        shoot: { finishing: 831, power: 895, composure: 838 },
        pass: { shortPass: 934, longPass: 895, accuracy: 788 },
        dribble: { breakout: 874, keeping: 915, ballTouch: 911 },
        defense: { tackle: 938, interception: 919, marking: 909 },
        physical: { jumping: 855, contact: 855, stamina: 915 },
        speed: { running: 916, agility: 891 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' },
      { name: '不屈の魂', rank: '銀', description: '発動条件：好調　/　キープ力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += maeng2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p177 (Maeng Seong-Ung 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p177 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p177');
console.log('p177 verified:', p177 ? p177.name : 'MISSING');
