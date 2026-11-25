const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ALEKSANDAR PAVLOVIC 2026-2027 (p422) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795592062890_81e2fb54.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'aleksandarPavlovic2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.ALEKSANDAR_PAVLOVIC_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. aleksandarPavlovic2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p422'")) {
  const p421Idx = mockCode.indexOf("id: 'p421'");
  if (p421Idx === -1) {
    console.error("Could not find p421 in mockData.js!");
    process.exit(1);
  }

  const p421AvatarIdx = mockCode.indexOf("avatarUrl:", p421Idx);
  const p421EndIdx = mockCode.indexOf("}", p421AvatarIdx);

  const headerCode = mockCode.substring(0, p421EndIdx + 1);
  const footerCode = mockCode.substring(p421EndIdx + 1);

  const pavlovicObj = `,
  {
    id: 'p422',
    name: 'アレクサンダル・パブロヴィッチ(2026-2027)',
    readingName: 'あれくさんだるぱぶろゔぃっち',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 7154,
    maxOverall: 15305,
    baseStats: { shoot: 1059, pass: 1439, dribble: 1373, defense: 1276, physical: 1306, speed: 810 },
    detailStats: {
      shoot: { finishing: 336, power: 346, composure: 377 },
      pass: { shortPass: 484, longPass: 484, accuracy: 471 },
      dribble: { breakout: 433, keeping: 444, ballTouch: 496 },
      defense: { tackle: 408, interception: 443, marking: 425 },
      physical: { jumping: 424, contact: 399, stamina: 483 },
      speed: { running: 393, agility: 417 }
    },
    maxEnhanced: {
      overall: 15305,
      baseStats: { shoot: 2604, pass: 3044, dribble: 2906, defense: 2857, physical: 2875, speed: 1832 },
      detailStats: {
        shoot: { finishing: 847, power: 857, composure: 900 },
        pass: { shortPass: 1019, longPass: 1019, accuracy: 1006 },
        dribble: { breakout: 944, keeping: 955, ballTouch: 1007 },
        defense: { tackle: 943, interception: 966, marking: 948 },
        physical: { jumping: 935, contact: 922, stamina: 1018 },
        speed: { running: 904, agility: 928 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '華麗なる一閃', rank: '銀', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '柔軟なキッカー', rank: '銀', description: '発動条件：絶好調　/　キック精度・ボールタッチUP' },
      { name: '懐の深いロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・キープ力UP' },
      { name: '長短のキック', rank: '銅', description: '発動条件：好調　/　ショートパス・ロングパスUP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + pavlovicObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p422.');
} else {
  console.log('2. p422 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('aleksandarPavlovic2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/alexsandroImage.js"></script>',
    '<script src="./src/data/aleksandarPavlovic2026Image.js"></script>\n  <script src="./src/data/alexsandroImage.js"></script>'
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
  if (!appCode.includes('"p422": "ALEKSANDAR_PAVLOVIC_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p421": "JOSHUA_KIMMICH_2026_IMAGE"',
      '"p421": "JOSHUA_KIMMICH_2026_IMAGE",\n  "p422": "ALEKSANDAR_PAVLOVIC_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p422 image mapping.`);
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

const p422 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p422');
console.log('5. Verification of p422:', p422 ? `${p422.name} (overall: ${p422.overall}, maxOverall: ${p422.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.ALEKSANDAR_PAVLOVIC_2026_IMAGE:', sandbox.window.ALEKSANDAR_PAVLOVIC_2026_IMAGE ? 'LOADED (' + sandbox.window.ALEKSANDAR_PAVLOVIC_2026_IMAGE.length + ' chars)' : 'MISSING');

