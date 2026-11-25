const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MANUEL NEUER 2026-2027 (p427) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795593554340_2b7af85d.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'manuelNeuer2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.MANUEL_NEUER_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. manuelNeuer2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p427'")) {
  const p426Idx = mockCode.indexOf("id: 'p426'");
  if (p426Idx === -1) {
    console.error("Could not find p426 in mockData.js!");
    process.exit(1);
  }

  const p426AvatarIdx = mockCode.indexOf("avatarUrl:", p426Idx);
  const p426EndIdx = mockCode.indexOf("}", p426AvatarIdx);

  const headerCode = mockCode.substring(0, p426EndIdx + 1);
  const footerCode = mockCode.substring(p426EndIdx + 1);

  const neuerObj = `,
  {
    id: 'p427',
    name: 'マヌエル・ノイアー(2026-2027)',
    readingName: 'まぬえるのいあー',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ドイツ',
    policy: 'リアクション',
    playStyle: 'スイーパーGK',
    playStyleLevel: 'Ⅲ',
    overall: 7682,
    maxOverall: 15921,
    baseStats: { shoot: 981, pass: 1457, dribble: 1087, defense: 1487, physical: 1317, speed: 848 },
    detailStats: {
      shoot: { finishing: 305, power: 348, composure: 328 },
      pass: { shortPass: 482, longPass: 490, accuracy: 485 },
      dribble: { breakout: 348, keeping: 365, ballTouch: 374 },
      defense: { tackle: 491, interception: 497, marking: 499 },
      physical: { jumping: 482, contact: 487, stamina: 348 },
      speed: { running: 400, agility: 448 }
    },
    maxEnhanced: {
      overall: 15921,
      baseStats: { shoot: 2442, pass: 3062, dribble: 2548, defense: 3092, physical: 2910, speed: 1870 },
      detailStats: {
        shoot: { finishing: 792, power: 835, composure: 815 },
        pass: { shortPass: 1017, longPass: 1025, accuracy: 1020 },
        dribble: { breakout: 835, keeping: 852, ballTouch: 861 },
        defense: { tackle: 1026, interception: 1032, marking: 1034 },
        physical: { jumping: 1017, contact: 1022, stamina: 871 },
        speed: { running: 911, agility: 959 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '難攻不落', rank: '金', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: 'ヘクセラー・カピテーン', rank: '金', description: '発動条件：キャプテンに指定　/　GK・LFB・RFB・CBのリアクション選手がコンタクト・走力UP' },
      { name: '広域の守護神', rank: '銀', description: '発動条件：好調　/　セービング・1VS1UP' },
      { name: '反撃のロングキック', rank: '銀', description: '発動条件：絶好調　/　反応速度・ロングパスUP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + neuerObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p427.');
} else {
  console.log('2. p427 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('manuelNeuer2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/majideCardImage.js"></script>',
    '<script src="./src/data/majideCardImage.js"></script>\n  <script src="./src/data/manuelNeuer2026Image.js"></script>'
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
  if (!appCode.includes('"p427": "MANUEL_NEUER_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p426": "KIM_MIN_JAE_2026_IMAGE"',
      '"p426": "KIM_MIN_JAE_2026_IMAGE",\n  "p427": "MANUEL_NEUER_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p427 image mapping.`);
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

const p427 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p427');
console.log('5. Verification of p427:', p427 ? `${p427.name} (overall: ${p427.overall}, maxOverall: ${p427.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.MANUEL_NEUER_2026_IMAGE:', sandbox.window.MANUEL_NEUER_2026_IMAGE ? 'LOADED (' + sandbox.window.MANUEL_NEUER_2026_IMAGE.length + ' chars)' : 'MISSING');

