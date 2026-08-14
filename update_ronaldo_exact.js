const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cristiano Ronaldo (p02) to Exact Specified Stats ---');

const exactRonaldo = `{
    id: 'p02',
    name: 'クリスティアーノ・ロナウド',
    readingName: 'くりすてぃあーのろなうど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'リアクション',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7638,
    maxOverall: 15972,
    baseStats: { shoot: 1467, pass: 1310, dribble: 1355, defense: 837, physical: 1287, speed: 706 },
    detailStats: {
      shoot: { finishing: 489, power: 489, composure: 489 },
      pass: { shortPass: 444, longPass: 428, accuracy: 438 },
      dribble: { breakout: 436, keeping: 449, ballTouch: 470 },
      defense: { tackle: 274, interception: 295, marking: 268 },
      physical: { jumping: 502, contact: 447, stamina: 338 },
      speed: { running: 344, agility: 362 }
    },
    maxEnhanced: {
      overall: 15972,
      baseStats: { shoot: 3072, pass: 2843, dribble: 2936, defense: 2334, physical: 2868, speed: 1752 },
      detailStats: {
        shoot: { finishing: 1024, power: 1024, composure: 1024 },
        pass: { shortPass: 955, longPass: 939, accuracy: 949 },
        dribble: { breakout: 959, keeping: 972, ballTouch: 1005 },
        defense: { tackle: 773, interception: 794, marking: 767 },
        physical: { jumping: 1025, contact: 982, stamina: 861 },
        speed: { running: 867, agility: 885 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'コントロールショット', rank: '銀', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'ゴールハンター', rank: '金', description: '発動条件：好調　/　決定力・キック力・冷静さUP' },
      { name: '孤高(SHO)', rank: '銀', description: '発動条件：無し　/　決定力・キック力・冷静さUP' },
      { name: 'パワフルジャンパー', rank: '銅', description: '発動条件：好調　/　ジャンプ・コンタクトUP' }
    ],
    avatarUrl: ''
  }`;

// Replace p02 block in mockData.js
code = code.replace(/\{\s*id:\s*['"]p02['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, exactRonaldo.trim());

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p2 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p02');
  console.log('SUCCESS! Updated Cristiano Ronaldo (p02) to exact user data:');
  console.log('Name:', p2.name);
  console.log('Policy:', p2.policy);
  console.log('Overall:', p2.overall, '-> Max:', p2.maxOverall);
  console.log('Base Stats:', p2.baseStats);
  console.log('Max Stats:', p2.maxEnhanced.baseStats);
  console.log('Play Tendencies:', p2.playTendencies);
  console.log('Skill:', p2.skill);
  console.log('Abilities:', p2.abilities);
} catch (err) {
  console.error('VM eval error:', err.message);
}
