const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log("=== UPDATING FLORIAN THAUVIN (p378) STATS TO MAX 13890 ===");

const p377Idx = code.indexOf("id: 'p377'");
if (p377Idx === -1) {
  console.error("Could not find p377 in mockData.js!");
  process.exit(1);
}

const p377AvatarIdx = code.indexOf("avatarUrl:", p377Idx);
const p377EndIdx = code.indexOf("}", p377AvatarIdx);

const headPart = code.substring(0, p377EndIdx + 1);

const p378Obj = `,
  {
    id: 'p378',
    name: 'フロリアン・トヴァン',
    readingName: 'ふろりあんとゔぁん',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆2',
    baseRarity: '☆2',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6131,
    maxOverall: 13890,
    baseStats: { shoot: 1261, pass: 1337, dribble: 1141, defense: 752, physical: 979, speed: 838 },
    detailStats: {
      shoot: { finishing: 449, power: 378, composure: 434 },
      pass: { shortPass: 437, longPass: 445, accuracy: 455 },
      dribble: { breakout: 462, keeping: 457, ballTouch: 222 },
      defense: { tackle: 238, interception: 219, marking: 295 },
      physical: { jumping: 274, contact: 328, stamina: 377 },
      speed: { running: 417, agility: 421 }
    },
    maxEnhanced: {
      overall: 13890,
      baseStats: { shoot: 2581, pass: 2673, dribble: 2718, defense: 1999, physical: 2241, speed: 1678 },
      detailStats: {
        shoot: { finishing: 885, power: 814, composure: 882 },
        pass: { shortPass: 897, longPass: 893, accuracy: 883 },
        dribble: { breakout: 903, keeping: 910, ballTouch: 905 },
        defense: { tackle: 670, interception: 674, marking: 655 },
        physical: { jumping: 731, contact: 722, stamina: 788 },
        speed: { running: 813, agility: 865 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '強引な中央突破', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '懐の深いパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・キープ力UP' },
      { name: '技巧派ドリブラー', rank: '銅', description: '発動条件：途中出場　/　突破力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆2', '☆2+', '☆2++', '☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

fs.writeFileSync(mockPath, headPart + p378Obj, 'utf-8');
console.log("Successfully updated p378 stats (Max 13890) in mockData.js.");

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(headPart + p378Obj, sandbox);

const p378 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p378');
console.log("\n--- VERIFIED P378 NEW STATS ---");
console.log("Name:", p378.name);
console.log("Overall:", p378.overall, "MaxOverall:", p378.maxOverall);
console.log("BaseStats:", p378.baseStats);
console.log("DetailStats:", p378.detailStats);
console.log("MaxEnhanced BaseStats:", p378.maxEnhanced.baseStats);
console.log("MaxEnhanced DetailStats:", p378.maxEnhanced.detailStats);
console.log("\n=== STATS UPDATE COMPLETED SUCCESSFULLY ===");
