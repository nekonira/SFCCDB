const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cristiano Ronaldo (p02) and Onishige Kawamoto (p111) ---');

const authenticRonaldo = `{
    id: 'p02',
    name: 'クリスティアーノ・ロナウド',
    readingName: 'くりすてぃあーのろなうど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: ['LW', 'RW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7969,
    maxOverall: 16269,
    baseStats: { shoot: 1456, pass: 1336, dribble: 1452, defense: 763, physical: 1407, speed: 982 },
    detailStats: {
      shoot: { finishing: 490, power: 471, composure: 495 },
      pass: { shortPass: 436, longPass: 436, accuracy: 464 },
      dribble: { breakout: 491, keeping: 482, ballTouch: 479 },
      defense: { tackle: 283, interception: 255, marking: 225 },
      physical: { jumping: 491, contact: 447, stamina: 469 },
      speed: { running: 491, agility: 491 }
    },
    maxEnhanced: {
      overall: 16269,
      baseStats: { shoot: 3061, pass: 2869, dribble: 3033, defense: 2260, physical: 2988, speed: 2028 },
      detailStats: {
        shoot: { finishing: 1025, power: 1006, composure: 1030 },
        pass: { shortPass: 947, longPass: 947, accuracy: 975 },
        dribble: { breakout: 1014, keeping: 1005, ballTouch: 1014 },
        defense: { tackle: 782, interception: 754, marking: 724 },
        physical: { jumping: 1014, contact: 982, stamina: 992 },
        speed: { running: 1014, agility: 1014 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'アンストッパブルショット', rank: '金', description: 'GKの手を弾く強烈無比なシュート' },
    abilities: [
      { name: '流氷の一撃', rank: '金', description: '一瞬の隙を逃さぬ絶対的な決定力' },
      { name: '孤高', rank: '銀', description: '単独突破時のプレッシャーを跳ね返す' },
      { name: 'スピードランナー', rank: '銀', description: '裏への飛び出し時のスピード向上' }
    ],
    avatarUrl: ''
  }`;

const authenticKawamoto = `{
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
    overall: 6620,
    maxOverall: 14940,
    baseStats: { shoot: 1360, pass: 1180, dribble: 1310, defense: 840, physical: 1220, speed: 820 },
    detailStats: {
      shoot: { finishing: 462, power: 448, composure: 450 },
      pass: { shortPass: 398, longPass: 382, accuracy: 400 },
      dribble: { breakout: 438, keeping: 435, ballTouch: 437 },
      defense: { tackle: 278, interception: 282, marking: 280 },
      physical: { jumping: 425, contact: 410, stamina: 385 },
      speed: { running: 402, agility: 418 }
    },
    maxEnhanced: {
      overall: 14940,
      baseStats: { shoot: 2970, pass: 2750, dribble: 2930, defense: 2280, physical: 2760, speed: 1880 },
      detailStats: {
        shoot: { finishing: 1005, power: 982, composure: 983 },
        pass: { shortPass: 930, longPass: 898, accuracy: 922 },
        dribble: { breakout: 980, keeping: 975, ballTouch: 975 },
        defense: { tackle: 760, interception: 765, marking: 755 },
        physical: { jumping: 935, contact: 910, stamina: 915 },
        speed: { running: 930, agility: 950 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 1, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 1, cutIn: 1, keep: 1,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '鬼神の連撃ボレー', rank: '金', description: '鬼神の如き身のこなしから放たれる決定的な一撃でゴールネットを突き破る' },
    abilities: [
      { name: '東洋の鬼神', rank: '金', description: 'ペナルティエリア内でのシュート精度と決定力が極限まで高まる' },
      { name: '伝説のストライカー', rank: '金', description: '決定的な場面でオフェンス全ステータスが大幅に上昇する' }
    ],
    avatarUrl: ''
  }`;

// Replace p02 block
code = code.replace(/\{\s*id:\s*['"]p02['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, authenticRonaldo.trim());

// Replace p111 block
code = code.replace(/\{\s*id:\s*['"]p111['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, authenticKawamoto.trim());

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p2 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p02');
  const p111 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p111');

  console.log('\n✅ UPDATED p02 (クリスティアーノ・ロナウド):');
  console.log('Overall:', p2.overall, '-> Max:', p2.maxOverall);
  console.log('Skill:', p2.skill);
  console.log('Abilities:', p2.abilities);

  console.log('\n✅ UPDATED p111 (河本鬼茂):');
  console.log('Overall:', p111.overall, '-> Max:', p111.maxOverall);
  console.log('Skill:', p111.skill);
  console.log('Abilities:', p111.abilities);

  console.log(`\n🎉 SUCCESS! Evaluated mockData.js cleanly with ${sandbox.window.INITIAL_PLAYERS.length} players!`);
} catch (err) {
  console.error('VM eval error:', err.message);
}
