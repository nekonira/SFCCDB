const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LUIS DIAZ 2026-2027 (p418) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795590336327_52365630.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'luisDiaz2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.LUIS_DIAZ_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. luisDiaz2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p418'")) {
  const p417Idx = mockCode.indexOf("id: 'p417'");
  if (p417Idx === -1) {
    console.error("Could not find p417 in mockData.js!");
    process.exit(1);
  }

  const p417AvatarIdx = mockCode.indexOf("avatarUrl:", p417Idx);
  const p417EndIdx = mockCode.indexOf("}", p417AvatarIdx);

  const headerCode = mockCode.substring(0, p417EndIdx + 1);
  const footerCode = mockCode.substring(p417EndIdx + 1);

  const luisDiazObj = `,
  {
    id: 'p418',
    name: 'ルイス・ディアス(2026-2027)',
    readingName: 'るいすでぃあす',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'コロンビア',
    policy: 'リアクション',
    playStyle: 'ドリブラー',
    playStyleLevel: 'Ⅱ',
    overall: 7440,
    maxOverall: 15721,
    baseStats: { shoot: 1307, pass: 1314, dribble: 1463, defense: 1052, physical: 1161, speed: 934 },
    detailStats: {
      shoot: { finishing: 455, power: 402, composure: 450 },
      pass: { shortPass: 443, longPass: 435, accuracy: 436 },
      dribble: { breakout: 484, keeping: 487, ballTouch: 492 },
      defense: { tackle: 350, interception: 361, marking: 341 },
      physical: { jumping: 395, contact: 358, stamina: 408 },
      speed: { running: 452, agility: 482 }
    },
    maxEnhanced: {
      overall: 15721,
      baseStats: { shoot: 2864, pass: 2883, dribble: 3056, defense: 2561, physical: 2706, speed: 2004 },
      detailStats: {
        shoot: { finishing: 978, power: 913, composure: 973 },
        pass: { shortPass: 966, longPass: 958, accuracy: 959 },
        dribble: { breakout: 1019, keeping: 1022, ballTouch: 1015 },
        defense: { tackle: 861, interception: 860, marking: 840 },
        physical: { jumping: 906, contact: 869, stamina: 931 },
        speed: { running: 987, agility: 1017 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '幻惑の疾走', rank: '金', description: '発動エリア：前左右・中左右　/　発動条件：プレースタイルがドリブラーの選手のドリブル時　/　突破力・キープ力UP　/　発動時にCF・AMの選手の決定力が一定時間UP、ドリブル成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '多彩な足技', rank: '金', description: '発動条件：好調　/　突破力・キープ力・敏捷性UP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' },
      { name: '冷静な破壊者', rank: '銅', description: '発動条件：好調　/　冷静さ・コンタクトUP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + luisDiazObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p418.');
} else {
  console.log('2. p418 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('luisDiaz2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/lucasChevalier2026Image.js"></script>',
    '<script src="./src/data/lucasChevalier2026Image.js"></script>\n  <script src="./src/data/luisDiaz2026Image.js"></script>'
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
  if (!appCode.includes('"p418": "LUIS_DIAZ_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p417": "HARRY_KANE_2026_IMAGE"',
      '"p417": "HARRY_KANE_2026_IMAGE",\n  "p418": "LUIS_DIAZ_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p418 image mapping.`);
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

const p418 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p418');
console.log('5. Verification of p418:', p418 ? `${p418.name} (overall: ${p418.overall}, maxOverall: ${p418.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.LUIS_DIAZ_2026_IMAGE:', sandbox.window.LUIS_DIAZ_2026_IMAGE ? 'LOADED (' + sandbox.window.LUIS_DIAZ_2026_IMAGE.length + ' chars)' : 'MISSING');

