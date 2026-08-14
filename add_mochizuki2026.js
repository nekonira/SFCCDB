const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Henry Hiroki Mochizuki 2026 (p165) ---');

// Slice up to p164 end object
const p164Idx = code.indexOf("id: 'p164'");
if (p164Idx === -1) {
  console.error("Could not find p164!");
  process.exit(1);
}

const p164AvatarIdx = code.indexOf("avatarUrl:", p164Idx);
const p164EndIdx = code.indexOf("}", p164AvatarIdx);

code = code.substring(0, p164EndIdx + 1);

const mochizuki2026Obj = `,
  {
    id: 'p165',
    name: '望月ヘンリー海輝(2026)',
    readingName: 'もちづきへんりーひろき',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: '守備的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 6292,
    maxOverall: 14501,
    baseStats: { shoot: 940, pass: 1016, dribble: 1093, defense: 1136, physical: 1300, speed: 849 },
    detailStats: {
      shoot: { finishing: 280, power: 381, composure: 279 },
      pass: { shortPass: 336, longPass: 388, accuracy: 292 },
      dribble: { breakout: 391, keeping: 361, ballTouch: 341 },
      defense: { tackle: 390, interception: 377, marking: 369 },
      physical: { jumping: 456, contact: 436, stamina: 408 },
      speed: { running: 424, agility: 425 }
    },
    maxEnhanced: {
      overall: 14501,
      baseStats: { shoot: 2437, pass: 2585, dribble: 2626, defense: 2741, physical: 2869, speed: 1919 },
      detailStats: {
        shoot: { finishing: 779, power: 880, composure: 778 },
        pass: { shortPass: 859, longPass: 911, accuracy: 815 },
        dribble: { breakout: 902, keeping: 872, ballTouch: 852 },
        defense: { tackle: 925, interception: 912, marking: 904 },
        physical: { jumping: 967, contact: 959, stamina: 943 },
        speed: { running: 959, agility: 960 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'パワフルジャンパー', rank: '銀', description: '発動条件：好調　/　ジャンプ・コンタクトUP' },
      { name: 'スピードランナー', rank: '銀', description: '圧倒的な走力でピッチを駆け上がり局面を優位にする' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += mochizuki2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p165 (Henry Hiroki Mochizuki 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p165 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p165');
console.log('p165 verified:', p165 ? p165.name : 'MISSING');
