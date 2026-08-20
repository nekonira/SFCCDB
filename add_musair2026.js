const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MUSAIR TICKET EXCHANGE (p287) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787233580939.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'musair2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MUSAIR_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. musair2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p286Idx = mockCode.indexOf("id: 'p286'");
if (p286Idx === -1) {
  console.error("Could not find p286 in mockData.js!");
  process.exit(1);
}

const p286AvatarIdx = mockCode.indexOf("avatarUrl:", p286Idx);
const p286EndIdx = mockCode.indexOf("}", p286AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p286EndIdx + 1);

const musairObj = `,
  {
    id: 'p287',
    name: 'ムサイール(チケット交換)',
    readingName: 'むさいーる',
    category: 'MF',
    mainPosition: 'OMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'UAE',
    policy: 'リアクション',
    playStyle: 'セントラルAM',
    playStyleLevel: 'Ⅱ',
    overall: 5234,
    maxOverall: 12907,
    baseStats: { shoot: 1041, pass: 1027, dribble: 1022, defense: 915, physical: 1070, speed: 638 },
    detailStats: {
      shoot: { finishing: 334, power: 392, composure: 315 },
      pass: { shortPass: 335, longPass: 342, accuracy: 350 },
      dribble: { breakout: 316, keeping: 351, ballTouch: 355 },
      defense: { tackle: 314, interception: 303, marking: 298 },
      physical: { jumping: 362, contact: 391, stamina: 317 },
      speed: { running: 316, agility: 322 }
    },
    maxEnhanced: {
      overall: 12907,
      baseStats: { shoot: 2295, pass: 2317, dribble: 2300, defense: 2169, physical: 2348, speed: 1478 },
      detailStats: {
        shoot: { finishing: 748, power: 806, composure: 741 },
        pass: { shortPass: 773, longPass: 768, accuracy: 776 },
        dribble: { breakout: 742, keeping: 777, ballTouch: 781 },
        defense: { tackle: 740, interception: 717, marking: 712 },
        physical: { jumping: 776, contact: 817, stamina: 755 },
        speed: { running: 730, agility: 748 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: 'コントロールトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力・コンタクトUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '力強いボールキープ', rank: '銀', description: '発動条件：好調　/　キープ力・コンタクトUP' },
      { name: '柔と剛のタッチ', rank: '銅', description: '発動条件：好調　/　キック力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + musairObj, 'utf-8');
console.log('2. mockData.js updated with p287 (Musair) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('musair2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/toumeiotoko2026Image.js"></script>',
    '<script src="./src/data/toumeiotoko2026Image.js"></script>\n  <script src="./src/data/musair2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p287": "MUSAIR_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p286": "TOUMEIOTOKO_2026_IMAGE"',
    '"p286": "TOUMEIOTOKO_2026_IMAGE",\n  "p287": "MUSAIR_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p287 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p287": "MUSAIR_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p286": "TOUMEIOTOKO_2026_IMAGE"',
    '"p286": "TOUMEIOTOKO_2026_IMAGE",\n  "p287": "MUSAIR_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p287 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p287 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p287');
console.log('6. Verification of p287:', p287 ? `${p287.name} (${p287.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.MUSAIR_2026_IMAGE:', sandbox.window.MUSAIR_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MUSAIR TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
