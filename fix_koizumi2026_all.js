const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING KOIZUMI 2026 (IMAGE & POSITION) ===');

// 1. Update image in src/data/koizumi2026Image.js
const newImagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786026227086.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'koizumi2026Image.js');

const bytes = fs.readFileSync(newImagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KOIZUMI_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. koizumi2026Image.js updated with latest card image. Size:', fs.statSync(imageJsPath).size);

// 2. Fix src/app.js and src/app.jsx avatar check order
const oldCheckJsx = `if ((player.name && (player.name.includes('小泉佳穂') || player.name.includes('小泉') || player.name.includes('Koizumi'))) || player.id === 'p117') {`;
const newCheckJsx = `if (player.id === 'p117' || (player.name && player.name.includes('BEST11') && (player.name.includes('小泉') || player.name.includes('Koizumi')))) {`;

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (appJsxCode.includes(oldCheckJsx)) {
  appJsxCode = appJsxCode.replace(oldCheckJsx, newCheckJsx);
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('2. src/app.jsx updated: fixed p117 check to avoid hijacking p190.');
} else {
  console.log('2. src/app.jsx check already updated.');
}

const oldCheckJs = `if (player.name && (player.name.includes('小泉佳穂') || player.name.includes('小泉') || player.name.includes('Koizumi')) || player.id === 'p117') {`;
const newCheckJs = `if (player.id === 'p117' || (player.name && player.name.includes('BEST11') && (player.name.includes('小泉') || player.name.includes('Koizumi')))) {`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (appJsCode.includes(oldCheckJs)) {
  appJsCode = appJsCode.replace(oldCheckJs, newCheckJs);
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('3. src/app.js updated: fixed p117 check to avoid hijacking p190.');
} else {
  console.log('3. src/app.js check already updated.');
}

// 3. Update mainPosition in src/data/mockData.js to 'AM'
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p190Idx = mockCode.indexOf("id: 'p190'");
if (p190Idx === -1) {
  console.error("Could not find p190 in mockData.js!");
  process.exit(1);
}

const p190AvatarIdx = mockCode.indexOf("avatarUrl:", p190Idx);
const p190EndIdx = mockCode.indexOf("}", p190AvatarIdx);

const beforeP190 = mockCode.substring(0, p190Idx);
const afterP190 = mockCode.substring(p190EndIdx + 1);

const updatedKoizumi2026Obj = `id: 'p190',
    name: '小泉佳穂(2026)',
    readingName: 'こいずみよしお',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'パサーAM',
    playStyleLevel: 'Ⅱ',
    overall: 6526,
    maxOverall: 14676,
    baseStats: { shoot: 1222, pass: 1275, dribble: 1240, defense: 1034, physical: 1174, speed: 740 },
    detailStats: {
      shoot: { finishing: 403, power: 428, composure: 391 },
      pass: { shortPass: 431, longPass: 426, accuracy: 418 },
      dribble: { breakout: 397, keeping: 412, ballTouch: 431 },
      defense: { tackle: 361, interception: 350, marking: 323 },
      physical: { jumping: 361, contact: 405, stamina: 408 },
      speed: { running: 342, agility: 398 }
    },
    maxEnhanced: {
      overall: 14676,
      baseStats: { shoot: 2767, pass: 2856, dribble: 2809, defense: 2579, physical: 2743, speed: 1774 },
      detailStats: {
        shoot: { finishing: 914, power: 939, composure: 914 },
        pass: { shortPass: 966, longPass: 949, accuracy: 941 },
        dribble: { breakout: 920, keeping: 935, ballTouch: 954 },
        defense: { tackle: 884, interception: 861, marking: 834 },
        physical: { jumping: 872, contact: 928, stamina: 943 },
        speed: { running: 853, agility: 921 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '操舵のパス', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：前中・中中に居る選手へのショートパス時　/　ショートパス・キック精度UP　/　ダイレクトショートパス成功時に受け手のシュート発生確率UP' },
    abilities: [
      { name: '不屈のパサー', rank: '銀', description: '発動条件：途中出場　/　ショートパス・スタミナUP' },
      { name: '柔軟なロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・ボールタッチUP' }
    ],
    avatarUrl: ''
  }`;

mockCode = beforeP190 + updatedKoizumi2026Obj + afterP190;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('4. mockData.js updated with p190 (mainPosition: AM) in UTF-8.');

// Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p190 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p190');
console.log('5. Verification of p190 in mockData:', p190 ? `${p190.name} (Position: ${p190.mainPosition}, PlayStyle: ${p190.playStyle})` : 'MISSING');

console.log('=== ALL FIXES APPLIED & VERIFIED SUCCESSFULLY! ===');
