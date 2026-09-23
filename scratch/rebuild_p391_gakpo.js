const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, '..', 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Rebuilding Cody Gakpo (p391) complete object in mockData.js ---');

const p391Idx = code.indexOf("id: 'p391'");
if (p391Idx === -1) {
  console.error("ERROR: id 'p391' not found in mockData.js");
  process.exit(1);
}

const p391AvatarIdx = code.indexOf("avatarUrl:", p391Idx);
const p391BlockEnd = code.indexOf("}", p391AvatarIdx);

const cleanP391Block = `id: 'p391',
    name: 'コーディ・ガクポ',
    readingName: 'こーでぃがくぽ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オランダ',
    policy: 'ムービング',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 7187,
    maxOverall: 15399,
    baseStats: {
      shoot: 1312,
      pass: 1251,
      dribble: 1410,
      defense: 866,
      physical: 1218,
      speed: 919
    },
    detailStats: {
      shoot: { finishing: 450, power: 428, composure: 434 },
      pass: { shortPass: 422, longPass: 414, accuracy: 415 },
      dribble: { breakout: 467, keeping: 467, ballTouch: 476 },
      defense: { tackle: 266, interception: 307, marking: 293 },
      physical: { jumping: 402, contact: 411, stamina: 405 },
      speed: { running: 446, agility: 473 }
    },
    maxEnhanced: {
      overall: 15399,
      baseStats: {
        shoot: 2869,
        pass: 2820,
        dribble: 3003,
        defense: 2375,
        physical: 2763,
        speed: 1989
      },
      detailStats: {
        shoot: { finishing: 973, power: 939, composure: 957 },
        pass: { shortPass: 945, longPass: 937, accuracy: 938 },
        dribble: { breakout: 1002, keeping: 1002, ballTouch: 999 },
        defense: { tackle: 777, interception: 806, marking: 792 },
        physical: { jumping: 913, contact: 922, stamina: 928 },
        speed: { running: 981, agility: 1008 }
      }
    },
    playTendencies: {
      attack: 1,
      defense: -1,
      dribble: 1,
      shoot: 0,
      longShoot: 0,
      shortPass: 0,
      longPass: 0,
      throughPass: 0,
      cutIn: -1,
      keep: 0,
      delay: -1,
      rushOut: 2,
      feint: 1,
      press: 0
    },
    skill: {
      name: 'スリップビート',
      rank: '銀',
      description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP'
    },
    abilities: [
      {
        name: '俊敏なドリブラー',
        rank: '銀',
        description: '発動条件：好調　/　突破力・敏捷性UP'
      },
      {
        name: '懐の深いボールタッチ',
        rank: '銀',
        description: '発動条件：絶好調　/　キープ力・ボールタッチUP'
      },
      {
        name: 'ランニングキッカー',
        rank: '銅',
        description: '発動条件：絶好調　/　キック力・走力UP'
      }
    ],
    avatarUrl: ''`;

code = code.substring(0, p391Idx) + cleanP391Block + code.substring(p391BlockEnd);

fs.writeFileSync(mockPath, code, 'utf-8');
console.log('Successfully rebuilt p391 object in mockData.js');

// Verify with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const updatedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p391');
console.log('=== Verified p391 (Cody Gakpo) Object ===');
console.log(JSON.stringify(updatedPlayer, null, 2));
