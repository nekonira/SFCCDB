const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Repairing mockData.js ---');

// Slice up to p155 object end
const p155Match = code.indexOf("id: 'p155'");
if (p155Match === -1) {
  console.error("Could not find p155!");
  process.exit(1);
}

// Find closing brace after p155
const p155EndIdx = code.indexOf("}", p155Match);
code = code.substring(0, p155EndIdx + 1);

const celestine2026Obj = `,
  {
    id: 'p156',
    name: 'ジュリアン・セレスティン(2026)',
    readingName: 'じゅりあんせれすてぃん',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6357,
    maxOverall: 14629,
    baseStats: { shoot: 1031, pass: 891, dribble: 1084, defense: 1259, physical: 1216, speed: 720 },
    detailStats: {
      shoot: { finishing: 323, power: 366, composure: 342 },
      pass: { shortPass: 291, longPass: 289, accuracy: 311 },
      dribble: { breakout: 365, keeping: 373, ballTouch: 346 },
      defense: { tackle: 402, interception: 427, marking: 430 },
      physical: { jumping: 437, contact: 406, stamina: 373 },
      speed: { running: 347, agility: 373 }
    },
    maxEnhanced: {
      overall: 14629,
      baseStats: { shoot: 2528, pass: 2460, dribble: 2617, defense: 2864, physical: 2809, speed: 1766 },
      detailStats: {
        shoot: { finishing: 822, power: 865, composure: 841 },
        pass: { shortPass: 814, longPass: 812, accuracy: 834 },
        dribble: { breakout: 876, keeping: 884, ballTouch: 857 },
        defense: { tackle: 937, interception: 962, marking: 965 },
        physical: { jumping: 972, contact: 941, stamina: 896 },
        speed: { running: 870, agility: 896 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '高さを生かしてハイボールやクロスをヘディングで確実に跳ね返す' },
      { name: 'ストロングマーカー', rank: '銀', description: 'フィジカルを生かしたタイトなマークで相手FWに自由を与えない' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += celestine2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Rebuilt mockData.js with UTF-8 encoding. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p156 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p156');
console.log('p156 verified:', p156.name);
