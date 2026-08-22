const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING HIROTO TANIGUCHI (p352) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\ed78896c-4c3e-43da-85df-033f522a1b1f\\.user_uploaded\\media_1787421756674.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'taniguchiHiroto2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TANIGUCHI_HIROTO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. taniguchiHiroto2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p351Idx = mockCode.indexOf("id: 'p351'");
if (p351Idx === -1) {
  console.error("Could not find p351 in mockData.js!");
  process.exit(1);
}

const p351AvatarIdx = mockCode.indexOf("avatarUrl:", p351Idx);
const p351EndIdx = mockCode.indexOf("}", p351AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p351EndIdx + 1);

const taniguchiObj = `,
  {
    id: 'p352',
    name: '谷口栄斗',
    readingName: 'たにぐち・ひろと',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6133,
    maxOverall: 14404,
    baseStats: { shoot: 1108, pass: 918, dribble: 1006, defense: 1221, physical: 1167, speed: 619 },
    detailStats: {
      shoot: { finishing: 358, power: 397, composure: 353 },
      pass: { shortPass: 321, longPass: 314, accuracy: 283 },
      dribble: { breakout: 333, keeping: 325, ballTouch: 348 },
      defense: { tackle: 409, interception: 398, marking: 414 },
      physical: { jumping: 397, contact: 383, stamina: 387 },
      speed: { running: 290, agility: 329 }
    },
    maxEnhanced: {
      overall: 14404,
      baseStats: { shoot: 2605, pass: 2487, dribble: 2539, defense: 2826, physical: 2760, speed: 1665 },
      detailStats: {
        shoot: { finishing: 857, power: 896, composure: 852 },
        pass: { shortPass: 844, longPass: 837, accuracy: 806 },
        dribble: { breakout: 844, keeping: 836, ballTouch: 859 },
        defense: { tackle: 944, interception: 933, marking: 949 },
        physical: { jumping: 932, contact: 918, stamina: 910 },
        speed: { running: 813, agility: 852 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'インターセプター', rank: '銀', description: '発動条件：好調　/　パスカット・マークUP' },
      { name: 'エアバトラー', rank: '銀', description: '発動条件：絶好調　/　タックル・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + taniguchiObj, 'utf-8');
console.log('2. mockData.js updated with p352 (Hiroto Taniguchi) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('taniguchiHiroto2026Image.js')) {
  if (indexContent.includes('sasakiSho2026Image.js')) {
    indexContent = indexContent.replace(
      '<script src="./src/data/sasakiSho2026Image.js"></script>',
      '<script src="./src/data/sasakiSho2026Image.js"></script>\n  <script src="./src/data/taniguchiHiroto2026Image.js"></script>'
    );
  } else {
    indexContent = indexContent.replace(
      '</head>',
      '  <script src="./src/data/taniguchiHiroto2026Image.js"></script>\n</head>'
    );
  }
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p352": "TANIGUCHI_HIROTO_2026_IMAGE"')) {
  if (appJsxCode.includes('"p351": "SASAKI_SHO_2026_IMAGE"')) {
    appJsxCode = appJsxCode.replace(
      '"p351": "SASAKI_SHO_2026_IMAGE"',
      '"p351": "SASAKI_SHO_2026_IMAGE",\n  "p352": "TANIGUCHI_HIROTO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p352 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p352": "TANIGUCHI_HIROTO_2026_IMAGE"')) {
  if (appJsCode.includes('"p351": "SASAKI_SHO_2026_IMAGE"')) {
    appJsCode = appJsCode.replace(
      '"p351": "SASAKI_SHO_2026_IMAGE"',
      '"p351": "SASAKI_SHO_2026_IMAGE",\n  "p352": "TANIGUCHI_HIROTO_2026_IMAGE"'
    );
  }
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p352 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p352 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p352');
console.log('6. Verification of p352:', p352 ? `${p352.name} (Overall: ${p352.overall}, maxOverall: ${p352.maxOverall}, Rarity: ${p352.rarity})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TANIGUCHI_HIROTO_2026_IMAGE:', sandbox.window.TANIGUCHI_HIROTO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== HIROTO TANIGUCHI ADDED SUCCESSFULLY! ===');
