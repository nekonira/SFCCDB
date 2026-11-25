const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KIM MIN-JAE 2026-2027 (p426) ===');

// 1. Image conversion to base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity\\brain\\ca1cbd15-ad97-4181-8cd3-0acb982f4e00\\.user_uploaded\\media_1795593266641_75f08300.jpg";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kimMinJae2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;
const imageJsContent = `window.KIM_MIN_JAE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kimMinJae2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

if (!mockCode.includes("id: 'p426'")) {
  const p425Idx = mockCode.indexOf("id: 'p425'");
  if (p425Idx === -1) {
    console.error("Could not find p425 in mockData.js!");
    process.exit(1);
  }

  const p425AvatarIdx = mockCode.indexOf("avatarUrl:", p425Idx);
  const p425EndIdx = mockCode.indexOf("}", p425AvatarIdx);

  const headerCode = mockCode.substring(0, p425EndIdx + 1);
  const footerCode = mockCode.substring(p425EndIdx + 1);

  const kimMinJaeObj = `,
  {
    id: 'p426',
    name: 'キム・ミンジェ(2026-2027)',
    readingName: 'きむみんじぇ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7222,
    maxOverall: 15512,
    baseStats: { shoot: 1034, pass: 1173, dribble: 1242, defense: 1397, physical: 1315, speed: 807 },
    detailStats: {
      shoot: { finishing: 340, power: 364, composure: 330 },
      pass: { shortPass: 402, longPass: 401, accuracy: 370 },
      dribble: { breakout: 402, keeping: 408, ballTouch: 432 },
      defense: { tackle: 476, interception: 452, marking: 469 },
      physical: { jumping: 455, contact: 465, stamina: 395 },
      speed: { running: 414, agility: 393 }
    },
    maxEnhanced: {
      overall: 15512,
      baseStats: { shoot: 2531, pass: 2742, dribble: 2775, defense: 3002, physical: 2908, speed: 1853 },
      detailStats: {
        shoot: { finishing: 839, power: 863, composure: 829 },
        pass: { shortPass: 925, longPass: 924, accuracy: 893 },
        dribble: { breakout: 913, keeping: 919, ballTouch: 943 },
        defense: { tackle: 1011, interception: 987, marking: 1004 },
        physical: { jumping: 990, contact: 1000, stamina: 918 },
        speed: { running: 937, agility: 916 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'エリアの格闘家', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：コンタクト時　/　コンタクト・タックル・マークUP' },
    abilities: [
      { name: '瞬間の球際力', rank: '銀', description: '発動条件：好調　/　パスカット・コンタクトUP' },
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: 'スピードクラッシャー', rank: '銅', description: '発動条件：途中出場　/　タックル・走力UP' }
    ],
    avatarUrl: ''
  }`;

  mockCode = headerCode + kimMinJaeObj + footerCode;
  fs.writeFileSync(mockPath, mockCode, 'utf-8');
  console.log('2. mockData.js updated with p426.');
} else {
  console.log('2. p426 already exists in mockData.js.');
}

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kimMinJae2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/kimJinHyeon2026Image.js"></script>',
    '<script src="./src/data/kimJinHyeon2026Image.js"></script>\n  <script src="./src/data/kimMinJae2026Image.js"></script>'
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
  if (!appCode.includes('"p426": "KIM_MIN_JAE_2026_IMAGE"')) {
    appCode = appCode.replace(
      '"p425": "DAYOT_UPAMECANO_2026_IMAGE"',
      '"p425": "DAYOT_UPAMECANO_2026_IMAGE",\n  "p426": "KIM_MIN_JAE_2026_IMAGE"'
    );
    fs.writeFileSync(appPath, appCode, 'utf-8');
    console.log(`4. ${appRel} updated with p426 image mapping.`);
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

const p426 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p426');
console.log('5. Verification of p426:', p426 ? `${p426.name} (overall: ${p426.overall}, maxOverall: ${p426.maxOverall})` : 'MISSING');
console.log('6. Total INITIAL_PLAYERS:', sandbox.window.INITIAL_PLAYERS.length);
console.log('7. Verification of window.KIM_MIN_JAE_2026_IMAGE:', sandbox.window.KIM_MIN_JAE_2026_IMAGE ? 'LOADED (' + sandbox.window.KIM_MIN_JAE_2026_IMAGE.length + ' chars)' : 'MISSING');

