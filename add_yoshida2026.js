const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Adding Yutaka Yoshida 2026 (p168) ---');

// Slice up to p167 end object
const p167Idx = code.indexOf("id: 'p167'");
if (p167Idx === -1) {
  console.error("Could not find p167!");
  process.exit(1);
}

const p167AvatarIdx = code.indexOf("avatarUrl:", p167Idx);
const p167EndIdx = code.indexOf("}", p167AvatarIdx);

code = code.substring(0, p167EndIdx + 1);

const yoshida2026Obj = `,
  {
    id: 'p168',
    name: '吉田豊(2026)',
    readingName: 'よしだゆたか',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: '守備的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 6312,
    maxOverall: 14550,
    baseStats: { shoot: 902, pass: 1093, dribble: 1156, defense: 1171, physical: 1215, speed: 783 },
    detailStats: {
      shoot: { finishing: 278, power: 320, composure: 304 },
      pass: { shortPass: 367, longPass: 365, accuracy: 361 },
      dribble: { breakout: 382, keeping: 374, ballTouch: 400 },
      defense: { tackle: 389, interception: 393, marking: 389 },
      physical: { jumping: 366, contact: 418, stamina: 431 },
      speed: { running: 400, agility: 383 }
    },
    maxEnhanced: {
      overall: 14550,
      baseStats: { shoot: 2399, pass: 2662, dribble: 2689, defense: 2776, physical: 2784, speed: 1853 },
      detailStats: {
        shoot: { finishing: 777, power: 819, composure: 803 },
        pass: { shortPass: 890, longPass: 888, accuracy: 884 },
        dribble: { breakout: 893, keeping: 885, ballTouch: 911 },
        defense: { tackle: 924, interception: 928, marking: 924 },
        physical: { jumping: 877, contact: 941, stamina: 966 },
        speed: { running: 935, agility: 918 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

code += yoshida2026Obj;

fs.writeFileSync(mockPath, code, 'utf-8');

// Test node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

console.log('SUCCESS! Added p168 (Yutaka Yoshida 2026) to mockData.js. Total players:', sandbox.window.INITIAL_PLAYERS.length);
const p168 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p168');
console.log('p168 verified:', p168 ? p168.name : 'MISSING');
