const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING TIJJANI REIJNDERS DIST OVERALL (p191) ===');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p191Idx = mockCode.indexOf("id: 'p191'");
if (p191Idx === -1) {
  console.error("Could not find p191 in mockData.js!");
  process.exit(1);
}

const p191AvatarIdx = mockCode.indexOf("avatarUrl:", p191Idx);
const p191EndIdx = mockCode.indexOf("}", p191AvatarIdx);

const beforeP191 = mockCode.substring(0, p191Idx);
const afterP191 = mockCode.substring(p191EndIdx + 1);

const updatedReijndersObj = `id: 'p191',
    name: 'タイアニ・ラインデルス(配布)',
    readingName: 'たいあにらいんでるす',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ムービング',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6826,
    maxOverall: 13168,
    baseStats: { shoot: 1334, pass: 1363, dribble: 1411, defense: 1162, physical: 1201, speed: 914 },
    detailStats: {
      shoot: { finishing: 459, power: 432, composure: 443 },
      pass: { shortPass: 455, longPass: 458, accuracy: 450 },
      dribble: { breakout: 470, keeping: 469, ballTouch: 472 },
      defense: { tackle: 377, interception: 398, marking: 387 },
      physical: { jumping: 376, contact: 392, stamina: 433 },
      speed: { running: 439, agility: 475 }
    },
    maxEnhanced: {
      overall: 13168,
      baseStats: { shoot: 2339, pass: 2404, dribble: 2440, defense: 2167, physical: 2230, speed: 1588 },
      detailStats: {
        shoot: { finishing: 790, power: 763, composure: 786 },
        pass: { shortPass: 810, longPass: 801, accuracy: 793 },
        dribble: { breakout: 813, keeping: 812, ballTouch: 815 },
        defense: { tackle: 720, interception: 729, marking: 718 },
        physical: { jumping: 707, contact: 735, stamina: 788 },
        speed: { running: 770, agility: 818 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '敵陣を切り裂くパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：CFの位置に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '突き刺すパス', rank: '銀', description: '発動条件：途中出場　/　キック力・ショートパスUP' },
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  }`;

mockCode = beforeP191 + updatedReijndersObj + afterP191;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('mockData.js updated with p191 (overall: 6826) in UTF-8.');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p191 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p191');
console.log('Verification of p191:', p191 ? `${p191.name} (overall: ${p191.overall})` : 'MISSING');

console.log('=== UPDATE COMPLETE! ===');
