const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HARRY KANE 2026-2027 (p417) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795589851786_1d3c7f3b.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'harryKane2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.HARRY_KANE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. harryKane2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p417'")) {
  const p416Idx = mockCode.indexOf("id: 'p416'");
  if (p416Idx === -1) {
    console.error("Could not find p416 in mockData.js!");
    process.exit(1);
  }

  const p416AvatarIdx = mockCode.indexOf("avatarUrl:", p416Idx);
  const p416EndIdx = mockCode.indexOf("}", p416AvatarIdx);

  const headerCode = mockCode.substring(0, p416EndIdx + 1);
  const footerCode = mockCode.substring(p416EndIdx + 1);

  const harryKaneObj = `,
  {
    id: 'p417',
    name: 'ハリー・ケイン(2026-2027)',
    readingName: 'はりーけいん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'リアクション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅲ',
    overall: 8028,
    maxOverall: 16359,
    baseStats: { shoot: 1485, pass: 1521, dribble: 1419, defense: 903, physical: 1401, speed: 751 },
    detailStats: {
      shoot: { finishing: 496, power: 490, composure: 499 },
      pass: { shortPass: 513, longPass: 506, accuracy: 502 },
      dribble: { breakout: 437, keeping: 490, ballTouch: 492 },
      defense: { tackle: 300, interception: 309, marking: 294 },
      physical: { jumping: 496, contact: 474, stamina: 431 },
      speed: { running: 372, agility: 379 }
    },
    maxEnhanced: {
      overall: 16359,
      baseStats: { shoot: 3090, pass: 3054, dribble: 3000, defense: 2400, physical: 2982, speed: 1797 },
      detailStats: {
        shoot: { finishing: 1031, power: 1025, composure: 1034 },
        pass: { shortPass: 1024, longPass: 1017, accuracy: 1013 },
        dribble: { breakout: 960, keeping: 1013, ballTouch: 1027 },
        defense: { tackle: 799, interception: 808, marking: 793 },
        physical: { jumping: 1019, contact: 1009, stamina: 954 },
        speed: { running: 895, agility: 902 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ギフトタッチ', rank: '金', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '最優秀選手の証明', rank: '虹', description: '発動条件：常時　/　全パラメーターUP' },
      { name: '狙いすました強振', rank: '銀', description: '発動条件：好調　/　キック力・冷静さUP' },
      { name: '懐の深いボールタッチ', rank: '銀', description: '発動条件：絶好調　/　キープ力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + harryKaneObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p417.');
} else {
  console.log('2. p417 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('harryKane2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/haalandImage.js"></script>',
    '<script src="./src/data/haalandImage.js"></script>\n  <script src="./src/data/harryKane2026Image.js"></script>'
  );
  // Bump cache-busting query params
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
  if (!appCode.includes('"p417": "HARRY_KANE_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p416": "POPO_HAIFU_2026_IMAGE"',
      '"p416": "POPO_HAIFU_2026_IMAGE",\n  "p417": "HARRY_KANE_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p417 image mapping.`);
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

const p417 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p417');
console.log('5. Verification of p417:', p417 ? `${p417.name} (overall: ${p417.overall}, maxOverall: ${p417.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.HARRY_KANE_2026_IMAGE:', sandbox.window.HARRY_KANE_2026_IMAGE ? 'LOADED (' + sandbox.window.HARRY_KANE_2026_IMAGE.length + ' chars)' : 'MISSING');

