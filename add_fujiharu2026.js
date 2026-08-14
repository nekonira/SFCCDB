const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Hiroki Fujiharu 2026 (p171) ---');

// Slice up to p170 end object
const p170Idx = code.indexOf("id: 'p170'");
if (p170Idx === -1) {
  console.error("Could not find p170!");
  process.exit(1);
}

const p170AvatarIdx = code.indexOf("avatarUrl:", p170Idx);
const p170EndIdx = code.indexOf("}", p170AvatarIdx);

code = code.substring(0, p170EndIdx + 1);

const fujiharu2026Obj = `,
  {
    id: 'p171',
    name: '藤春廣輝(2026)',
    readingName: 'ふじはるひろき',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6181,
    maxOverall: 14409,
    baseStats: { shoot: 1009, pass: 1125, dribble: 1155, defense: 1111, physical: 1045, speed: 797 },
    detailStats: {
      shoot: { finishing: 368, power: 310, composure: 331 },
      pass: { shortPass: 360, longPass: 399, accuracy: 366 },
      dribble: { breakout: 423, keeping: 360, ballTouch: 372 },
      defense: { tackle: 348, interception: 388, marking: 375 },
      physical: { jumping: 333, contact: 300, stamina: 412 },
      speed: { running: 414, agility: 383 }
    },
    maxEnhanced: {
      overall: 14409,
      baseStats: { shoot: 2506, pass: 2694, dribble: 2688, defense: 2716, physical: 2614, speed: 1867 },
      detailStats: {
        shoot: { finishing: 867, power: 809, composure: 830 },
        pass: { shortPass: 883, longPass: 922, accuracy: 889 },
        dribble: { breakout: 934, keeping: 871, ballTouch: 883 },
        defense: { tackle: 883, interception: 923, marking: 910 },
        physical: { jumping: 844, contact: 823, stamina: 947 },
        speed: { running: 949, agility: 918 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '展開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・キープ力・ロングパスUP　/　成功時に自身のロングパス発生確率UP' },
    abilities: [
      { name: '高速マーカー', rank: '銀', description: '発動条件：途中出場　/　パスカット・走力UP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += fujiharu2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p171 (Hiroki Fujiharu 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p171 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p171');
console.log('p171 verified:', p171 ? p171.name : 'MISSING');
