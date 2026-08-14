const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Haruya Fujii 2026 (p163) ---');

// Slice up to p162 end object
const p162Idx = code.indexOf("id: 'p162'");
if (p162Idx === -1) {
  console.error("Could not find p162!");
  process.exit(1);
}

const p162AvatarIdx = code.indexOf("avatarUrl:", p162Idx);
const p162EndIdx = code.indexOf("}", p162AvatarIdx);

code = code.substring(0, p162EndIdx + 1);

const fujii2026Obj = `,
  {
    id: 'p163',
    name: '藤井陽也(2026)',
    readingName: 'ふじいはるや',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'スプリントCB',
    playStyleLevel: 'Ⅱ',
    overall: 6356,
    maxOverall: 14598,
    baseStats: { shoot: 885, pass: 1016, dribble: 1079, defense: 1299, physical: 1072, speed: 819 },
    detailStats: {
      shoot: { finishing: 291, power: 312, composure: 282 },
      pass: { shortPass: 329, longPass: 339, accuracy: 348 },
      dribble: { breakout: 372, keeping: 343, ballTouch: 364 },
      defense: { tackle: 430, interception: 439, marking: 430 },
      physical: { jumping: 398, contact: 334, stamina: 340 },
      speed: { running: 403, agility: 416 }
    },
    maxEnhanced: {
      overall: 14598,
      baseStats: { shoot: 2382, pass: 2585, dribble: 2612, defense: 2904, physical: 2665, speed: 1865 },
      detailStats: {
        shoot: { finishing: 790, power: 811, composure: 781 },
        pass: { shortPass: 852, longPass: 862, accuracy: 871 },
        dribble: { breakout: 883, keeping: 854, ballTouch: 875 },
        defense: { tackle: 965, interception: 974, marking: 965 },
        physical: { jumping: 933, contact: 869, stamina: 863 },
        speed: { running: 926, agility: 939 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'ランニングジャンパー', rank: '銀', description: '発動条件：絶好調　/　ジャンプ・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += fujii2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p163 (Haruya Fujii 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p163 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p163');
console.log('p163 verified:', p163 ? p163.name : 'MISSING');
