const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MICHAEL OLISE 2026-2027 (p419) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795590962273_509fbd52.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'michaelOlise2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.MICHAEL_OLISE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. michaelOlise2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p419'")) {
  const p418Idx = mockCode.indexOf("id: 'p418'");
  if (p418Idx === -1) {
    console.error("Could not find p418 in mockData.js!");
    process.exit(1);
  }

  const p418AvatarIdx = mockCode.indexOf("avatarUrl:", p418Idx);
  const p418EndIdx = mockCode.indexOf("}", p418AvatarIdx);

  const headerCode = mockCode.substring(0, p418EndIdx + 1);
  const footerCode = mockCode.substring(p418EndIdx + 1);

  const michaelOliseObj = `,
  {
    id: 'p419',
    name: 'ミカエル・オリーズ(2026-2027)',
    readingName: 'みかえるおりーず',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'ワイドストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7480,
    maxOverall: 15699,
    baseStats: { shoot: 1415, pass: 1438, dribble: 1431, defense: 980, physical: 1111, speed: 865 },
    detailStats: {
      shoot: { finishing: 475, power: 453, composure: 487 },
      pass: { shortPass: 480, longPass: 480, accuracy: 478 },
      dribble: { breakout: 469, keeping: 475, ballTouch: 487 },
      defense: { tackle: 310, interception: 342, marking: 328 },
      physical: { jumping: 313, contact: 393, stamina: 405 },
      speed: { running: 416, agility: 449 }
    },
    maxEnhanced: {
      overall: 15699,
      baseStats: { shoot: 2972, pass: 3007, dribble: 3024, defense: 2489, physical: 2656, speed: 1935 },
      detailStats: {
        shoot: { finishing: 998, power: 964, composure: 1010 },
        pass: { shortPass: 1003, longPass: 1003, accuracy: 1001 },
        dribble: { breakout: 1004, keeping: 1010, ballTouch: 1010 },
        defense: { tackle: 821, interception: 841, marking: 827 },
        physical: { jumping: 824, contact: 904, stamina: 928 },
        speed: { running: 951, agility: 984 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '流星の弾道', rank: '金', description: '発動エリア：前左中右　/　発動条件：シュート時　/　決定力、キック力UP' },
    abilities: [
      { name: '変幻自在のドリブラー', rank: '金', description: '発動条件：好調　/　突破力・キープ力・ボールタッチUP' },
      { name: 'ムービングスナイパー', rank: '銀', description: '発動条件：好調　/　冷静さ・敏捷性UP' },
      { name: '精緻なパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・キック精度UP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + michaelOliseObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p419.');
} else {
  console.log('2. p419 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('michaelOlise2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/mikelOyarzabal2026Image.js"></script>',
    '<script src="./src/data/michaelOlise2026Image.js"></script>\n  <script src="./src/data/mikelOyarzabal2026Image.js"></script>'
  );
  const ts = Date.now().toString();
  indexContent = indexContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${ts}`);
  indexContent = indexContent.replace(/app\.js\?v=\d+/, `app.js?v=${ts}`);
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag and cache busters.');
}

// 4. Update src/app.jsx & src/app.js
for (const appRel of ['src/app.jsx', 'src/app.js']) {
  const appPath = path.join(__dirname, appRel);
  let appCode = fs.readFileSync(appPath, 'utf-8');
  if (!appCode.includes('"p419": "MICHAEL_OLISE_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p418": "LUIS_DIAZ_2026_IMAGE"',
      '"p418": "LUIS_DIAZ_2026_IMAGE",\n  "p419": "MICHAEL_OLISE_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p419 image mapping.`);
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockDataPart1.js'), 'utf-8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockDataPart2.js'), 'utf-8'), sandbox);
vm.runInContext(fs.readFileSync(mockPath, 'utf-8'), sandbox);
vm.runInContext(fs.readFileSync(imageJsPath, 'utf-8'), sandbox);

const p419 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p419');
console.log('5. Verification of p419:', p419 ? `${p419.name} (overall: ${p419.overall}, maxOverall: ${p419.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.MICHAEL_OLISE_2026_IMAGE:', sandbox.window.MICHAEL_OLISE_2026_IMAGE ? 'LOADED (' + sandbox.window.MICHAEL_OLISE_2026_IMAGE.length + ' chars)' : 'MISSING');

