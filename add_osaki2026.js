const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Koshi Osaki 2026 (p169) ---');

// Slice up to p168 end object
const p168Idx = code.indexOf("id: 'p168'");
if (p168Idx === -1) {
  console.error("Could not find p168!");
  process.exit(1);
}

const p168AvatarIdx = code.indexOf("avatarUrl:", p168Idx);
const p168EndIdx = code.indexOf("}", p168AvatarIdx);

code = code.substring(0, p168EndIdx + 1);

const osaki2026Obj = `,
  {
    id: 'p169',
    name: '大崎航詩(2026)',
    readingName: 'おおさきこうし',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6277,
    maxOverall: 14513,
    baseStats: { shoot: 1063, pass: 1112, dribble: 1110, defense: 1196, physical: 1196, speed: 756 },
    detailStats: {
      shoot: { finishing: 347, power: 364, composure: 352 },
      pass: { shortPass: 379, longPass: 364, accuracy: 369 },
      dribble: { breakout: 361, keeping: 353, ballTouch: 396 },
      defense: { tackle: 402, interception: 412, marking: 382 },
      physical: { jumping: 394, contact: 380, stamina: 422 },
      speed: { running: 363, agility: 393 }
    },
    maxEnhanced: {
      overall: 14513,
      baseStats: { shoot: 2560, pass: 2681, dribble: 2643, defense: 2801, physical: 2765, speed: 1826 },
      detailStats: {
        shoot: { finishing: 846, power: 863, composure: 851 },
        pass: { shortPass: 902, longPass: 887, accuracy: 892 },
        dribble: { breakout: 872, keeping: 864, ballTouch: 907 },
        defense: { tackle: 937, interception: 947, marking: 917 },
        physical: { jumping: 905, contact: 903, stamina: 957 },
        speed: { running: 898, agility: 928 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '無限のアジリティ', rank: '銀', description: '発動条件：好調　/　スタミナ・敏捷性UP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += osaki2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p169 (Koshi Osaki 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p169 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p169');
console.log('p169 verified:', p169 ? p169.name : 'MISSING');
