const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Rei Umeki 2026 (p173) ---');

// Slice up to p172 end object
const p172Idx = code.indexOf("id: 'p172'");
if (p172Idx === -1) {
  console.error("Could not find p172!");
  process.exit(1);
}

const p172AvatarIdx = code.indexOf("avatarUrl:", p172Idx);
const p172EndIdx = code.indexOf("}", p172AvatarIdx);

code = code.substring(0, p172EndIdx + 1);

const umeki2026Obj = `,
  {
    id: 'p173',
    name: '梅木怜(2026)',
    readingName: 'うめきれい',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6369,
    maxOverall: 14600,
    baseStats: { shoot: 968, pass: 1120, dribble: 1153, defense: 1134, physical: 966, speed: 880 },
    detailStats: {
      shoot: { finishing: 316, power: 333, composure: 319 },
      pass: { shortPass: 357, longPass: 391, accuracy: 372 },
      dribble: { breakout: 428, keeping: 340, ballTouch: 385 },
      defense: { tackle: 402, interception: 370, marking: 362 },
      physical: { jumping: 286, contact: 286, stamina: 394 },
      speed: { running: 415, agility: 465 }
    },
    maxEnhanced: {
      overall: 14600,
      baseStats: { shoot: 2465, pass: 2689, dribble: 2686, defense: 2739, physical: 2535, speed: 1950 },
      detailStats: {
        shoot: { finishing: 815, power: 832, composure: 818 },
        pass: { shortPass: 880, longPass: 914, accuracy: 895 },
        dribble: { breakout: 939, keeping: 851, ballTouch: 896 },
        defense: { tackle: 937, interception: 905, marking: 897 },
        physical: { jumping: 797, contact: 809, stamina: 929 },
        speed: { running: 950, agility: 1000 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '展開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・キープ力・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: 'アジャイルクラッシャー', rank: '銀', description: '発動条件：好調　/　タックル・敏捷性UP' },
      { name: 'ピッチの分断者', rank: '銀', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += umeki2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p173 (Rei Umeki 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p173 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p173');
console.log('p173 verified:', p173 ? p173.name : 'MISSING');
