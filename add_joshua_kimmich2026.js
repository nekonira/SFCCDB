const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JOSHUA KIMMICH 2026-2027 (p421) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795591642058_daaaec9d.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'joshuaKimmich2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.JOSHUA_KIMMICH_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. joshuaKimmich2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p421'")) {
  const p420Idx = mockCode.indexOf("id: 'p420'");
  if (p420Idx === -1) {
    console.error("Could not find p420 in mockData.js!");
    process.exit(1);
  }

  const p420AvatarIdx = mockCode.indexOf("avatarUrl:", p420Idx);
  const p420EndIdx = mockCode.indexOf("}", p420AvatarIdx);

  const headerCode = mockCode.substring(0, p420EndIdx + 1);
  const footerCode = mockCode.substring(p420EndIdx + 1);

  const joshuaKimmichObj = `,
  {
    id: 'p421',
    name: 'ヨシュア・キミッヒ(2026-2027)',
    readingName: 'よしゅあきみっひ',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'パサーDM',
    playStyleLevel: 'Ⅱ',
    overall: 7451,
    maxOverall: 15661,
    baseStats: { shoot: 1202, pass: 1468, dribble: 1371, defense: 1312, physical: 1302, speed: 821 },
    detailStats: {
      shoot: { finishing: 396, power: 389, composure: 417 },
      pass: { shortPass: 490, longPass: 491, accuracy: 487 },
      dribble: { breakout: 435, keeping: 448, ballTouch: 488 },
      defense: { tackle: 431, interception: 448, marking: 433 },
      physical: { jumping: 402, contact: 411, stamina: 489 },
      speed: { running: 401, agility: 420 }
    },
    maxEnhanced: {
      overall: 15661,
      baseStats: { shoot: 2747, pass: 3073, dribble: 2904, defense: 2893, physical: 2871, speed: 1843 },
      detailStats: {
        shoot: { finishing: 907, power: 900, composure: 940 },
        pass: { shortPass: 1025, longPass: 1026, accuracy: 1022 },
        dribble: { breakout: 946, keeping: 959, ballTouch: 999 },
        defense: { tackle: 966, interception: 971, marking: 956 },
        physical: { jumping: 913, contact: 934, stamina: 1024 },
        speed: { running: 912, agility: 931 }
      }
    },
    playTendencies: {
      attack: 1, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 2, longPass: -1, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'テレグノシス', rank: '金', description: '発動エリア：中中・後左中右　/　発動条件：CF・AMの選手へのショートパス・ロングパス時　/　ロングパス・キック精度・ショートパスUP　/　成功時に受け手のショートパス発生確率UP' },
    abilities: [
      { name: '精緻な指揮者', rank: '金', description: '発動条件：好調　/　ロングパス・キック精度・ボールタッチUP' },
      { name: '不屈の魂', rank: '銀', description: '発動条件：好調　/　キープ力・スタミナUP' },
      { name: 'リスクヘッジパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・マークUP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + joshuaKimmichObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p421.');
} else {
  console.log('2. p421 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('joshuaKimmich2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/jooMinKyu2026Image.js"></script>',
    '<script src="./src/data/jooMinKyu2026Image.js"></script>\n  <script src="./src/data/joshuaKimmich2026Image.js"></script>'
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
  if (!appCode.includes('"p421": "JOSHUA_KIMMICH_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p420": "JAMAL_MUSIALA_2026_IMAGE"',
      '"p420": "JAMAL_MUSIALA_2026_IMAGE",\n  "p421": "JOSHUA_KIMMICH_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p421 image mapping.`);
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

const p421 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p421');
console.log('5. Verification of p421:', p421 ? `${p421.name} (overall: ${p421.overall}, maxOverall: ${p421.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.JOSHUA_KIMMICH_2026_IMAGE:', sandbox.window.JOSHUA_KIMMICH_2026_IMAGE ? 'LOADED (' + sandbox.window.JOSHUA_KIMMICH_2026_IMAGE.length + ' chars)' : 'MISSING');

