const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Sei Muroya 2026 (p172) ---');

// Slice up to p171 end object
const p171Idx = code.indexOf("id: 'p171'");
if (p171Idx === -1) {
  console.error("Could not find p171!");
  process.exit(1);
}

const p171AvatarIdx = code.indexOf("avatarUrl:", p171Idx);
const p171EndIdx = code.indexOf("}", p171AvatarIdx);

code = code.substring(0, p171EndIdx + 1);

const muroya2026Obj = `,
  {
    id: 'p172',
    name: '室屋成(2026)',
    readingName: 'むろやせい',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6380,
    maxOverall: 14605,
    baseStats: { shoot: 958, pass: 1136, dribble: 1265, defense: 1216, physical: 1051, speed: 799 },
    detailStats: {
      shoot: { finishing: 309, power: 324, composure: 325 },
      pass: { shortPass: 379, longPass: 378, accuracy: 379 },
      dribble: { breakout: 421, keeping: 419, ballTouch: 425 },
      defense: { tackle: 408, interception: 406, marking: 402 },
      physical: { jumping: 277, contact: 370, stamina: 404 },
      speed: { running: 391, agility: 408 }
    },
    maxEnhanced: {
      overall: 14605,
      baseStats: { shoot: 2455, pass: 2705, dribble: 2798, defense: 2821, physical: 2620, speed: 1869 },
      detailStats: {
        shoot: { finishing: 808, power: 823, composure: 824 },
        pass: { shortPass: 902, longPass: 901, accuracy: 902 },
        dribble: { breakout: 932, keeping: 930, ballTouch: 936 },
        defense: { tackle: 943, interception: 941, marking: 937 },
        physical: { jumping: 788, contact: 893, stamina: 939 },
        speed: { running: 926, agility: 943 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ダイナミックタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '俊敏なマーカー', rank: '銀', description: '発動条件：絶好調　/　パスカット・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += muroya2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p172 (Sei Muroya 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p172 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p172');
console.log('p172 verified:', p172 ? p172.name : 'MISSING');
