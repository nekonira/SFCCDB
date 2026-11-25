const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DAYOT UPAMECANO 2026-2027 (p425) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795592992307_2e12858d.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'dayotUpamecano2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.DAYOT_UPAMECANO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. dayotUpamecano2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p425'")) {
  const p424Idx = mockCode.indexOf("id: 'p424'");
  if (p424Idx === -1) {
    console.error("Could not find p424 in mockData.js!");
    process.exit(1);
  }

  const p424AvatarIdx = mockCode.indexOf("avatarUrl:", p424Idx);
  const p424EndIdx = mockCode.indexOf("}", p424AvatarIdx);

  const headerCode = mockCode.substring(0, p424EndIdx + 1);
  const footerCode = mockCode.substring(p424EndIdx + 1);

  const upamecanoObj = `,
  {
    id: 'p425',
    name: 'ダヨ・ウパメカノ(2026-2027)',
    readingName: 'だよ・うぱめかの',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'リアクション',
    playStyle: 'スプリントCB',
    playStyleLevel: 'Ⅱ',
    overall: 7466,
    maxOverall: 15765,
    baseStats: { shoot: 995, pass: 1293, dribble: 1274, defense: 1459, physical: 1313, speed: 854 },
    detailStats: {
      shoot: { finishing: 292, power: 364, composure: 339 },
      pass: { shortPass: 447, longPass: 446, accuracy: 400 },
      dribble: { breakout: 415, keeping: 419, ballTouch: 440 },
      defense: { tackle: 483, interception: 487, marking: 489 },
      physical: { jumping: 450, contact: 480, stamina: 383 },
      speed: { running: 456, agility: 398 }
    },
    maxEnhanced: {
      overall: 15765,
      baseStats: { shoot: 2492, pass: 2862, dribble: 2807, defense: 3064, physical: 2906, speed: 1900 },
      detailStats: {
        shoot: { finishing: 791, power: 863, composure: 838 },
        pass: { shortPass: 970, longPass: 969, accuracy: 923 },
        dribble: { breakout: 926, keeping: 930, ballTouch: 951 },
        defense: { tackle: 1018, interception: 1022, marking: 1024 },
        physical: { jumping: 985, contact: 1015, stamina: 906 },
        speed: { running: 979, agility: 921 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '逆襲の初動', rank: '金', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '守りの哲学', rank: '金', description: '発動条件：好調　/　タックル・パスカット・マークUP' },
      { name: 'パワーアジリティ', rank: '銀', description: '発動条件：好調　/　コンタクト・敏捷性UP' },
      { name: '快速のロングパサー', rank: '銅', description: '発動条件：絶好調　/　ロングパス・走力UP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + upamecanoObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p425.');
} else {
  console.log('2. p425 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('dayotUpamecano2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/daniOlmo2026Image.js"></script>',
    '<script src="./src/data/daniOlmo2026Image.js"></script>\n  <script src="./src/data/dayotUpamecano2026Image.js"></script>'
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
  if (!appCode.includes('"p425": "DAYOT_UPAMECANO_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p424": "KONRAD_LAIMER_2026_IMAGE"',
      '"p424": "KONRAD_LAIMER_2026_IMAGE",\n  "p425": "DAYOT_UPAMECANO_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p425 image mapping.`);
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

const p425 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p425');
console.log('5. Verification of p425:', p425 ? `${p425.name} (overall: ${p425.overall}, maxOverall: ${p425.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.DAYOT_UPAMECANO_2026_IMAGE:', sandbox.window.DAYOT_UPAMECANO_2026_IMAGE ? 'LOADED (' + sandbox.window.DAYOT_UPAMECANO_2026_IMAGE.length + ' chars)' : 'MISSING');

