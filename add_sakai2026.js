const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Gotoku Sakai 2026 (p164) ---');

// Slice up to p163 end object
const p163Idx = code.indexOf("id: 'p163'");
if (p163Idx === -1) {
  console.error("Could not find p163!");
  process.exit(1);
}

const p163AvatarIdx = code.indexOf("avatarUrl:", p163Idx);
const p163EndIdx = code.indexOf("}", p163AvatarIdx);

code = code.substring(0, p163EndIdx + 1);

const sakai2026Obj = `,
  {
    id: 'p164',
    name: '酒井高徳(2026)',
    readingName: 'さかいごうとく',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6531,
    maxOverall: 14775,
    baseStats: { shoot: 1181, pass: 1186, dribble: 1159, defense: 1309, physical: 1192, speed: 727 },
    detailStats: {
      shoot: { finishing: 387, power: 388, composure: 406 },
      pass: { shortPass: 390, longPass: 394, accuracy: 402 },
      dribble: { breakout: 370, keeping: 383, ballTouch: 406 },
      defense: { tackle: 428, interception: 440, marking: 441 },
      physical: { jumping: 386, contact: 384, stamina: 422 },
      speed: { running: 363, agility: 364 }
    },
    maxEnhanced: {
      overall: 14775,
      baseStats: { shoot: 2678, pass: 2755, dribble: 2692, defense: 2914, physical: 2761, speed: 1797 },
      detailStats: {
        shoot: { finishing: 886, power: 887, composure: 905 },
        pass: { shortPass: 913, longPass: 917, accuracy: 925 },
        dribble: { breakout: 881, keeping: 894, ballTouch: 917 },
        defense: { tackle: 963, interception: 975, marking: 976 },
        physical: { jumping: 897, contact: 907, stamina: 957 },
        speed: { running: 898, agility: 899 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '反撃のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' },
      { name: 'ボールスティーラー', rank: '銀', description: '発動条件：途中出場　/　タックル・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += sakai2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p164 (Gotoku Sakai 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p164 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p164');
console.log('p164 verified:', p164 ? p164.name : 'MISSING');
