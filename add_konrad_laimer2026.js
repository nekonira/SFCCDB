const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KONRAD LAIMER 2026-2027 (p424) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795592732507_5c62f694.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'konradLaimer2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.KONRAD_LAIMER_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. konradLaimer2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p424'")) {
  const p423Idx = mockCode.indexOf("id: 'p423'");
  if (p423Idx === -1) {
    console.error("Could not find p423 in mockData.js!");
    process.exit(1);
  }

  const p423AvatarIdx = mockCode.indexOf("avatarUrl:", p423Idx);
  const p423EndIdx = mockCode.indexOf("}", p423AvatarIdx);

  const headerCode = mockCode.substring(0, p423EndIdx + 1);
  const footerCode = mockCode.substring(p423EndIdx + 1);

  const laimerObj = `,
  {
    id: 'p424',
    name: 'コンラート・ライマー(2026-2027)',
    readingName: 'こんらーとらいまー',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'オーストリア',
    policy: 'リアクション',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 7089,
    maxOverall: 15322,
    baseStats: { shoot: 1152, pass: 1312, dribble: 1285, defense: 1330, physical: 1326, speed: 857 },
    detailStats: {
      shoot: { finishing: 392, power: 378, composure: 382 },
      pass: { shortPass: 444, longPass: 440, accuracy: 428 },
      dribble: { breakout: 445, keeping: 420, ballTouch: 420 },
      defense: { tackle: 485, interception: 435, marking: 410 },
      physical: { jumping: 404, contact: 437, stamina: 485 },
      speed: { running: 440, agility: 417 }
    },
    maxEnhanced: {
      overall: 15322,
      baseStats: { shoot: 2649, pass: 2881, dribble: 2818, defense: 2935, physical: 2895, speed: 1927 },
      detailStats: {
        shoot: { finishing: 891, power: 877, composure: 881 },
        pass: { shortPass: 967, longPass: 963, accuracy: 951 },
        dribble: { breakout: 956, keeping: 931, ballTouch: 931 },
        defense: { tackle: 1020, interception: 970, marking: 945 },
        physical: { jumping: 915, contact: 960, stamina: 1020 },
        speed: { running: 975, agility: 952 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '逆襲', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・突破力UP　/　成功時に自身のドリブル発生確率UP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: '疾走するパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・走力UP' },
      { name: 'すり抜けるロングパサー', rank: '銅', description: '発動条件：好調　/　ロングパス・突破力UP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + laimerObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p424.');
} else {
  console.log('2. p424 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('konradLaimer2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/konnoKazuya2026Image.js"></script>',
    '<script src="./src/data/konnoKazuya2026Image.js"></script>\n  <script src="./src/data/konradLaimer2026Image.js"></script>'
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
  if (!appCode.includes('"p424": "KONRAD_LAIMER_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p423": "NATHANIEL_BROWN_2026_IMAGE"',
      '"p423": "NATHANIEL_BROWN_2026_IMAGE",\n  "p424": "KONRAD_LAIMER_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p424 image mapping.`);
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

const p424 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p424');
console.log('5. Verification of p424:', p424 ? `${p424.name} (overall: ${p424.overall}, maxOverall: ${p424.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.KONRAD_LAIMER_2026_IMAGE:', sandbox.window.KONRAD_LAIMER_2026_IMAGE ? 'LOADED (' + sandbox.window.KONRAD_LAIMER_2026_IMAGE.length + ' chars)' : 'MISSING');

