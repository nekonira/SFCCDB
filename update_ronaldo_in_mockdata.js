const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Cristiano Ronaldo (p02) to Authentic Registered Stats ---');

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

// Replace p02 player block in mockData.js
code = code.replace(/\{\s*id:\s*['"]p02['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, authenticRonaldo);

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p2 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p02');
  console.log('SUCCESS! Updated Cristiano Ronaldo (p02):');
  console.log('Name:', p2.name);
  console.log('Overall:', p2.overall, '-> Max:', p2.maxOverall);
  console.log('Skill:', p2.skill);
  console.log('Abilities:', p2.abilities);
} catch (err) {
  console.error('VM eval error:', err.message);
}
