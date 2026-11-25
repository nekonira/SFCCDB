const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JAMAL MUSIALA 2026-2027 (p420) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795591259394_4bca66df.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'jamalMusiala2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.JAMAL_MUSIALA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. jamalMusiala2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p420'")) {
  const p419Idx = mockCode.indexOf("id: 'p419'");
  if (p419Idx === -1) {
    console.error("Could not find p419 in mockData.js!");
    process.exit(1);
  }

  const p419AvatarIdx = mockCode.indexOf("avatarUrl:", p419Idx);
  const p419EndIdx = mockCode.indexOf("}", p419AvatarIdx);

  const headerCode = mockCode.substring(0, p419EndIdx + 1);
  const footerCode = mockCode.substring(p419EndIdx + 1);

  const jamalMusialaObj = `,
  {
    id: 'p420',
    name: 'ジャマル・ムシアラ(2026-2027)',
    readingName: 'じゃまるむしあら',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅱ',
    overall: 7589,
    maxOverall: 15732,
    baseStats: { shoot: 1336, pass: 1341, dribble: 1497, defense: 1195, physical: 1184, speed: 963 },
    detailStats: {
      shoot: { finishing: 465, power: 422, composure: 449 },
      pass: { shortPass: 446, longPass: 456, accuracy: 439 },
      dribble: { breakout: 500, keeping: 502, ballTouch: 495 },
      defense: { tackle: 391, interception: 407, marking: 397 },
      physical: { jumping: 423, contact: 382, stamina: 379 },
      speed: { running: 465, agility: 498 }
    },
    maxEnhanced: {
      overall: 15732,
      baseStats: { shoot: 2881, pass: 2922, dribble: 3066, defense: 2740, physical: 2753, speed: 1997 },
      detailStats: {
        shoot: { finishing: 976, power: 933, composure: 972 },
        pass: { shortPass: 981, longPass: 979, accuracy: 962 },
        dribble: { breakout: 1023, keeping: 1025, ballTouch: 1018 },
        defense: { tackle: 914, interception: 918, marking: 908 },
        physical: { jumping: 934, contact: 905, stamina: 914 },
        speed: { running: 976, agility: 1021 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'ショックウェーブ', rank: '金', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '突破からの打開', rank: '金', description: '発動条件：好調　/　ショートパス・突破力・キープ力UP' },
      { name: '俊敏なタッチ', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・敏捷性UP' },
      { name: '冷静なフィニッシュ', rank: '銅', description: '発動条件：絶好調　/　決定力・冷静さUP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + jamalMusialaObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p420.');
} else {
  console.log('2. p420 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('jamalMusiala2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/jeonByeongGwan2026Image.js"></script>',
    '<script src="./src/data/jamalMusiala2026Image.js"></script>\n  <script src="./src/data/jeonByeongGwan2026Image.js"></script>'
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
  if (!appCode.includes('"p420": "JAMAL_MUSIALA_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p419": "MICHAEL_OLISE_2026_IMAGE"',
      '"p419": "MICHAEL_OLISE_2026_IMAGE",\n  "p420": "JAMAL_MUSIALA_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p420 image mapping.`);
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

const p420 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p420');
console.log('5. Verification of p420:', p420 ? `${p420.name} (overall: ${p420.overall}, maxOverall: ${p420.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.JAMAL_MUSIALA_2026_IMAGE:', sandbox.window.JAMAL_MUSIALA_2026_IMAGE ? 'LOADED (' + sandbox.window.JAMAL_MUSIALA_2026_IMAGE.length + ' chars)' : 'MISSING');

