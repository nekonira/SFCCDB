const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Updating Keita Yoshioka 2026 (p154) to Corrected Stats ---');

const yoshiokaUpdatedObj = `{
    id: 'p154',
    name: '喜岡佳太(2026)',
    readingName: 'よしおかけいた',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6007,
    maxOverall: 14269,
    baseStats: { shoot: 870, pass: 927, dribble: 1017, defense: 1171, physical: 1183, speed: 632 },
    detailStats: {
      shoot: { finishing: 276, power: 276, composure: 318 },
      pass: { shortPass: 338, longPass: 306, accuracy: 283 },
      dribble: { breakout: 353, keeping: 322, ballTouch: 342 },
      defense: { tackle: 391, interception: 391, marking: 389 },
      physical: { jumping: 411, contact: 397, stamina: 375 },
      speed: { running: 313, agility: 319 }
    },
    maxEnhanced: {
      overall: 14269,
      baseStats: { shoot: 2367, pass: 2496, dribble: 2550, defense: 2776, physical: 2776, speed: 1678 },
      detailStats: {
        shoot: { finishing: 775, power: 775, composure: 817 },
        pass: { shortPass: 861, longPass: 829, accuracy: 806 },
        dribble: { breakout: 864, keeping: 833, ballTouch: 853 },
        defense: { tackle: 926, interception: 926, marking: 924 },
        physical: { jumping: 946, contact: 932, stamina: 898 },
        speed: { running: 836, agility: 842 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ダイナミックタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'エアバトラー', rank: '銀', description: '空中戦の強さを発揮し競り合いで相手を圧倒する' },
      { name: 'エンドレスマーカー', rank: '銀', description: '発動条件：好調　/　マーク・スタミナUP' }
    ],
    avatarUrl: ''
  }`;

// Replace p154 block in mockData.js
code = code.replace(/\{\s*id:\s*['"]p154['"][\s\S]*?avatarUrl:\s*['"][^'"]*['"]\s*\}/, yoshiokaUpdatedObj.trim());

fs.writeFileSync(mockPath, code, 'utf-8');

// Verify Node VM evaluation
const sandbox = { window: {} };
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const p154 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p154');
  console.log('SUCCESS! Updated Keita Yoshioka 2026 (p154):');
  console.log('Name:', p154.name);
  console.log('Overall:', p154.overall, '-> Max:', p154.maxOverall);
  console.log('Base Stats:', p154.baseStats);
  console.log('Max Stats:', p154.maxEnhanced.baseStats);
} catch (err) {
  console.error('VM eval error:', err.message);
}
