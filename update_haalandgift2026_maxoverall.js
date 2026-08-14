const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING ERLING HAALAND GIFT 2026 (p259) MAX OVERALL ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p259Idx = mockCode.indexOf("id: 'p259'");
const altP259Idx = mockCode.indexOf('"id": "p259"');
const targetP259Idx = p259Idx !== -1 ? p259Idx : altP259Idx;

if (targetP259Idx === -1) {
  console.error("Could not find p259 in mockData.js!");
  process.exit(1);
}

const p259AvatarIdx = mockCode.indexOf("avatarUrl:", targetP259Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP259Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP259Idx);
const p259EndIdx = mockCode.indexOf("}", p259AvatarIdx);

// Find start of p259 object ({ id: 'p259')
const p259StartIdx = mockCode.lastIndexOf("{", targetP259Idx);

const newP259Obj = `{
    id: 'p259',
    name: 'アーリング・ハーランド(配布)',
    readingName: 'あーりんぐ・はーらんど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ノルウェー',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6748,
    maxOverall: 12421,
    baseStats: { shoot: 1363, pass: 991, dribble: 1319, defense: 766, physical: 1301, speed: 898 },
    detailStats: {
      shoot: { finishing: 463, power: 463, composure: 437 },
      pass: { shortPass: 349, longPass: 297, accuracy: 345 },
      dribble: { breakout: 452, keeping: 440, ballTouch: 427 },
      defense: { tackle: 307, interception: 238, marking: 221 },
      physical: { jumping: 448, contact: 462, stamina: 391 },
      speed: { running: 474, agility: 424 }
    },
    maxEnhanced: {
      overall: 12421,
      baseStats: { shoot: 2428, pass: 1984, dribble: 2360, defense: 1723, physical: 2342, speed: 1584 },
      detailStats: {
        shoot: { finishing: 818, power: 818, composure: 792 },
        pass: { shortPass: 680, longPass: 628, accuracy: 676 },
        dribble: { breakout: 795, keeping: 783, ballTouch: 782 },
        defense: { tackle: 626, interception: 557, marking: 540 },
        physical: { jumping: 791, contact: 817, stamina: 734 },
        speed: { running: 817, agility: 767 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '相手DFのプレッシャーを物ともせず強烈なシュートを叩き込む' },
      { name: 'アジャイルキッカー', rank: '銅', description: '発動条件：途中出場　/　キック力・敏捷性UP' }
    ],
    avatarUrl: ''
  }`;

mockCode = mockCode.substring(0, p259StartIdx) + newP259Obj + mockCode.substring(p259EndIdx + 1);
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('Updated mockData.js with p259 maxOverall = 12421.');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p259 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p259');
console.log('Verification of updated p259:', p259 ? p259.name : 'MISSING');
if (p259) {
  console.log('   Overall:', p259.overall, '| MaxOverall:', p259.maxOverall);
}
