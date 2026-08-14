const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding So Kawahara 2026 (p178) ---');

// Slice up to p177 end object
const p177Idx = code.indexOf("id: 'p177'");
if (p177Idx === -1) {
  console.error("Could not find p177!");
  process.exit(1);
}

const p177AvatarIdx = code.indexOf("avatarUrl:", p177Idx);
const p177EndIdx = code.indexOf("}", p177AvatarIdx);

code = code.substring(0, p177EndIdx + 1);

const kawahara2026Obj = `,
  {
    id: 'p178',
    name: '河原創(2026)',
    readingName: 'かわはらそう',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6471,
    maxOverall: 14625,
    baseStats: { shoot: 1036, pass: 1195, dribble: 1249, defense: 1237, physical: 1129, speed: 796 },
    detailStats: {
      shoot: { finishing: 347, power: 330, composure: 359 },
      pass: { shortPass: 390, longPass: 401, accuracy: 404 },
      dribble: { breakout: 392, keeping: 435, ballTouch: 422 },
      defense: { tackle: 398, interception: 426, marking: 413 },
      physical: { jumping: 332, contact: 350, stamina: 447 },
      speed: { running: 395, agility: 401 }
    },
    maxEnhanced: {
      overall: 14625,
      baseStats: { shoot: 2581, pass: 2800, dribble: 2782, defense: 2818, physical: 2698, speed: 1818 },
      detailStats: {
        shoot: { finishing: 858, power: 841, composure: 882 },
        pass: { shortPass: 925, longPass: 936, accuracy: 939 },
        dribble: { breakout: 903, keeping: 946, ballTouch: 933 },
        defense: { tackle: 933, interception: 949, marking: 936 },
        physical: { jumping: 843, contact: 873, stamina: 982 },
        speed: { running: 906, agility: 912 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '不屈のキッカー', rank: '銀', description: '発動条件：好調　/　キック精度・スタミナUP' },
      { name: '奪取のターゲットマン', rank: '銀', description: '発動条件：好調　/　キープ力・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += kawahara2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p178 (So Kawahara 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p178 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p178');
console.log('p178 verified:', p178 ? p178.name : 'MISSING');
