const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Onishige Kawamoto (p111) to Exact Specified Stats ---');

const exactKawamoto = `{
    id: 'p111',
    name: '河本鬼茂',
    readingName: 'かわもとおにしげ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 6156,
    maxOverall: 12089,
    baseStats: { shoot: 1240, pass: 987, dribble: 1161, defense: 934, physical: 1171, speed: 813 },
    detailStats: {
      shoot: { finishing: 416, power: 387, composure: 437 },
      pass: { shortPass: 328, longPass: 260, accuracy: 399 },
      dribble: { breakout: 348, keeping: 425, ballTouch: 388 },
      defense: { tackle: 328, interception: 292, marking: 314 },
      physical: { jumping: 425, contact: 407, stamina: 339 },
      speed: { running: 387, agility: 426 }
    },
    maxEnhanced: {
      overall: 12089,
      baseStats: { shoot: 2305, pass: 1980, dribble: 2202, defense: 1891, physical: 2212, speed: 1499 },
      detailStats: {
        shoot: { finishing: 771, power: 742, composure: 792 },
        pass: { shortPass: 659, longPass: 591, accuracy: 730 },
        dribble: { breakout: 691, keeping: 768, ballTouch: 743 },
        defense: { tackle: 647, interception: 611, marking: 633 },
        physical: { jumping: 768, contact: 762, stamina: 682 },
        speed: { running: 730, agility: 769 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '決めきる力', rank: '銀', description: '発動条件：途中出場　/　決定力・スタミナUP' },
      { name: 'ムービングターゲット', rank: '銅', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  }`;

// Replace p111 block in mockData.js
code = code.replace(/\{\s*id:\s*['"]p111['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, exactKawamoto.trim());

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p111 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p111');
  console.log('SUCCESS! Updated Onishige Kawamoto (p111) to exact user data:');
  console.log('Name:', p111.name);
  console.log('Policy:', p111.policy);
  console.log('Overall:', p111.overall, '-> Max:', p111.maxOverall);
  console.log('Base Stats:', p111.baseStats);
  console.log('Max Stats:', p111.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p111.playTendencies);
  console.log('Skill:', p111.skill);
  console.log('Abilities:', p111.abilities);
} catch (err) {
  console.error('VM eval error:', err.message);
}
