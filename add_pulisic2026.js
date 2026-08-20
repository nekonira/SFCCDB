const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING CHRISTIAN PULISIC (p275) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8b50a9b4-c50b-431d-a7b7-e99775d959f8\\.user_uploaded\\media_1787229059919.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'pulisic2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.PULISIC_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. pulisic2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p274Idx = mockCode.indexOf("id: 'p274'");
if (p274Idx === -1) {
  console.error("Could not find p274 in mockData.js!");
  process.exit(1);
}

const p274AvatarIdx = mockCode.indexOf("avatarUrl:", p274Idx);
const p274EndIdx = mockCode.indexOf("}", p274AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p274EndIdx + 1);

const pulisicObj = `,
  {
    id: 'p275',
    name: 'クリスティアン・プリシッチ',
    readingName: 'くりすてぃあんぷりしっち',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'アメリカ合衆国',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6617,
    maxOverall: 15169,
    baseStats: { shoot: 1322, pass: 1302, dribble: 1384, defense: 878, physical: 1044, speed: 844 },
    detailStats: {
      shoot: { finishing: 460, power: 419, composure: 443 },
      pass: { shortPass: 435, longPass: 433, accuracy: 434 },
      dribble: { breakout: 458, keeping: 460, ballTouch: 466 },
      defense: { tackle: 302, interception: 295, marking: 281 },
      physical: { jumping: 306, contact: 363, stamina: 375 },
      speed: { running: 405, agility: 439 }
    },
    maxEnhanced: {
      overall: 15169,
      baseStats: { shoot: 2879, pass: 2871, dribble: 2977, defense: 2387, physical: 2589, speed: 1914 },
      detailStats: {
        shoot: { finishing: 983, power: 930, composure: 966 },
        pass: { shortPass: 958, longPass: 956, accuracy: 957 },
        dribble: { breakout: 993, keeping: 995, ballTouch: 989 },
        defense: { tackle: 813, interception: 794, marking: 780 },
        physical: { jumping: 817, contact: 874, stamina: 898 },
        speed: { running: 940, agility: 974 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: '切り裂くドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・走力UP' },
    abilities: [
      { name: '失わないドリブラー', rank: '銀', description: '発動条件：絶好調　/　突破力・キープ力UP' },
      { name: 'ゴール前の落ち着き', rank: '銀', description: '発動条件：好調　/　決定力・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + pulisicObj, 'utf-8');
console.log('2. mockData.js updated with p275 (Christian Pulisic) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('pulisic2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/honda2026Image.js"></script>',
    '<script src="./src/data/honda2026Image.js"></script>\n  <script src="./src/data/pulisic2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p275": "PULISIC_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p274": "HONDA_2026_IMAGE"',
    '"p274": "HONDA_2026_IMAGE",\n  "p275": "PULISIC_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p275 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p275": "PULISIC_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p274": "HONDA_2026_IMAGE"',
    '"p274": "HONDA_2026_IMAGE",\n  "p275": "PULISIC_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p275 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p275 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p275');
console.log('6. Verification of p275:', p275 ? `${p275.name} (${p275.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.PULISIC_2026_IMAGE:', sandbox.window.PULISIC_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== CHRISTIAN PULISIC ADDED SUCCESSFULLY! ===');
