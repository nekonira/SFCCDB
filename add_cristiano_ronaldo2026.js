const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING CRISTIANO RONALDO (2026) (p408) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\2267caac-99b8-4455-be84-1ae3774f4ede\\.user_uploaded\\media_1793172020932.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'cristianoRonaldo2026Image.js');

if (!fs.existsSync(imagePath)) {
  console.error("Uploaded image not found:", imagePath);
  process.exit(1);
}

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.CRISTIANO_RONALDO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. cristianoRonaldo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p407Idx = mockCode.indexOf("id: 'p407'");
if (p407Idx === -1) {
  console.error("Could not find p407 in mockData.js!");
  process.exit(1);
}

const p407AvatarIdx = mockCode.indexOf("avatarUrl:", p407Idx);
const p407EndIdx = mockCode.indexOf("}", p407AvatarIdx);

const headerCode = mockCode.substring(0, p407EndIdx + 1);

const ronaldoObj = `,
  {
    id: 'p408',
    name: 'クリスティアーノ・ロナウド(2026)',
    readingName: 'くりすてぃあーの・ろなうど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'カウンター',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅲ',
    overall: 7778,
    maxOverall: 15972,
    baseStats: { shoot: 1487, pass: 1403, dribble: 1470, defense: 792, physical: 1417, speed: 963 },
    detailStats: {
      shoot: { finishing: 502, power: 487, composure: 498 },
      pass: { shortPass: 452, longPass: 444, accuracy: 507 },
      dribble: { breakout: 501, keeping: 487, ballTouch: 482 },
      defense: { tackle: 264, interception: 264, marking: 264 },
      physical: { jumping: 509, contact: 476, stamina: 432 },
      speed: { running: 488, agility: 475 }
    },
    maxEnhanced: {
      overall: 15972,
      baseStats: { shoot: 3092, pass: 2936, dribble: 3051, defense: 2289, physical: 2998, speed: 2009 },
      detailStats: {
        shoot: { finishing: 1037, power: 1022, composure: 1033 },
        pass: { shortPass: 963, longPass: 955, accuracy: 1018 },
        dribble: { breakout: 1024, keeping: 1010, ballTouch: 1017 },
        defense: { tackle: 763, interception: 763, marking: 763 },
        physical: { jumping: 1032, contact: 1011, stamina: 955 },
        speed: { running: 1011, agility: 998 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: 'アンストッパブルショット', rank: '金', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: 'カピタォン・アルティリェイロ', rank: '金', description: '発動条件：キャプテンに指定　/　CF・LW・RWのカウンター選手が冷静さ・突破力UP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: '跳躍のステップ', rank: '銀', description: '発動条件：好調　/　ジャンプ・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + ronaldoObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p408.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('cristianoRonaldo2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/cristianoRonaldoKyoseiNoManatakiCardImage.js"></script>',
    '<script src="./src/data/cristianoRonaldo2026Image.js"></script>\n  <script src="./src/data/cristianoRonaldoKyoseiNoManatakiCardImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with cristianoRonaldo2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p408":"CRISTIANO_RONALDO_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p407":"GRANIT_XHAKA_2026_IMAGE"',
    '"p407":"GRANIT_XHAKA_2026_IMAGE","p408":"CRISTIANO_RONALDO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p408 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p408": "CRISTIANO_RONALDO_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p407": "GRANIT_XHAKA_2026_IMAGE"',
    '"p407": "GRANIT_XHAKA_2026_IMAGE",\n    "p408": "CRISTIANO_RONALDO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p408 image mapping.');
}

// 5. Update index.html cache busters
const newTimestamp = Date.now().toString();
indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/app\.js\?v=\d+/, `app.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/main\.js\?v=\d+/, `main.js?v=${newTimestamp}`);
fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('6. index.html cache busters updated with', newTimestamp);

// 6. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p408 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p408');
console.log('7. Verification of p408 in mockData:', p408 ? `${p408.name} (${p408.nationality}, ${p408.mainPosition}, ${p408.overall} -> ${p408.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.CRISTIANO_RONALDO_2026_IMAGE:', sandbox.window.CRISTIANO_RONALDO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== CRISTIANO RONALDO (2026) ADDED SUCCESSFULLY! ===');
