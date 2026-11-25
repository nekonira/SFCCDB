const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING NATHANIEL BROWN 2026-2027 (p423) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795592435027_6df43e52.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'nathanielBrown2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.NATHANIEL_BROWN_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. nathanielBrown2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p423'")) {
  const p422Idx = mockCode.indexOf("id: 'p422'");
  if (p422Idx === -1) {
    console.error("Could not find p422 in mockData.js!");
    process.exit(1);
  }

  const p422AvatarIdx = mockCode.indexOf("avatarUrl:", p422Idx);
  const p422EndIdx = mockCode.indexOf("}", p422AvatarIdx);

  const headerCode = mockCode.substring(0, p422EndIdx + 1);
  const footerCode = mockCode.substring(p422EndIdx + 1);

  const brownObj = `,
  {
    id: 'p423',
    name: 'ナサニエル・ブラウン(2026-2027)',
    readingName: 'なさにえるぶらうん',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: ['AM'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 7203,
    maxOverall: 15480,
    baseStats: { shoot: 1185, pass: 1289, dribble: 1374, defense: 1355, physical: 1193, speed: 914 },
    detailStats: {
      shoot: { finishing: 404, power: 383, composure: 398 },
      pass: { shortPass: 435, longPass: 428, accuracy: 426 },
      dribble: { breakout: 469, keeping: 437, ballTouch: 468 },
      defense: { tackle: 480, interception: 441, marking: 434 },
      physical: { jumping: 372, contact: 409, stamina: 412 },
      speed: { running: 459, agility: 455 }
    },
    maxEnhanced: {
      overall: 15480,
      baseStats: { shoot: 2682, pass: 2858, dribble: 2907, defense: 2960, physical: 2762, speed: 1984 },
      detailStats: {
        shoot: { finishing: 903, power: 882, composure: 897 },
        pass: { shortPass: 958, longPass: 951, accuracy: 949 },
        dribble: { breakout: 980, keeping: 948, ballTouch: 979 },
        defense: { tackle: 1015, interception: 976, marking: 969 },
        physical: { jumping: 883, contact: 932, stamina: 947 },
        speed: { running: 994, agility: 990 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '極上のショートパス', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：前中・中中のエリアに居る選手へのショートパス時　/　ショートパス・キック精度UP' },
    abilities: [
      { name: 'スピード溢れる突破', rank: '金', description: '発動条件：好調　/　突破力・走力・敏捷性UP' },
      { name: 'ハードスティール', rank: '銀', description: '発動条件：絶好調　/　キープ力・タックルUP' },
      { name: 'ムービングウォール', rank: '銅', description: '発動条件：絶好調　/　コンタクト・スタミナUP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + brownObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p423.');
} else {
  console.log('2. p423 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('nathanielBrown2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/naomichiUedaImage.js"></script>',
    '<script src="./src/data/naomichiUedaImage.js"></script>\n  <script src="./src/data/nathanielBrown2026Image.js"></script>'
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
  if (!appCode.includes('"p423": "NATHANIEL_BROWN_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p422": "ALEKSANDAR_PAVLOVIC_2026_IMAGE"',
      '"p422": "ALEKSANDAR_PAVLOVIC_2026_IMAGE",\n  "p423": "NATHANIEL_BROWN_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p423 image mapping.`);
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

const p423 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p423');
console.log('5. Verification of p423:', p423 ? `${p423.name} (overall: ${p423.overall}, maxOverall: ${p423.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.NATHANIEL_BROWN_2026_IMAGE:', sandbox.window.NATHANIEL_BROWN_2026_IMAGE ? 'LOADED (' + sandbox.window.NATHANIEL_BROWN_2026_IMAGE.length + ' chars)' : 'MISSING');

