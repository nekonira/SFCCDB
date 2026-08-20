const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING P. RAMANBELA TICKET EXCHANGE (p288) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787233812663.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'pramanbela2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.P_RAMANBELA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. pramanbela2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p287Idx = mockCode.indexOf("id: 'p287'");
if (p287Idx === -1) {
  console.error("Could not find p287 in mockData.js!");
  process.exit(1);
}

const p287AvatarIdx = mockCode.indexOf("avatarUrl:", p287Idx);
const p287EndIdx = mockCode.indexOf("}", p287AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p287EndIdx + 1);

const pramanbelaObj = `,
  {
    id: 'p288',
    name: 'P・ラマンベラ(チケット交換)',
    readingName: 'ぴー・らまんべら',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '南アフリカ',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 5100,
    maxOverall: 12336,
    baseStats: { shoot: 912, pass: 911, dribble: 1061, defense: 733, physical: 817, speed: 708 },
    detailStats: {
      shoot: { finishing: 304, power: 304, composure: 304 },
      pass: { shortPass: 320, longPass: 282, accuracy: 309 },
      dribble: { breakout: 390, keeping: 316, ballTouch: 355 },
      defense: { tackle: 240, interception: 251, marking: 242 },
      physical: { jumping: 276, contact: 250, stamina: 291 },
      speed: { running: 357, agility: 351 }
    },
    maxEnhanced: {
      overall: 12336,
      baseStats: { shoot: 2178, pass: 2189, dribble: 2363, defense: 1951, physical: 2071, speed: 1584 },
      detailStats: {
        shoot: { finishing: 730, power: 718, composure: 730 },
        pass: { shortPass: 746, longPass: 708, accuracy: 735 },
        dribble: { breakout: 828, keeping: 754, ballTouch: 781 },
        defense: { tackle: 654, interception: 653, marking: 644 },
        physical: { jumping: 690, contact: 664, stamina: 717 },
        speed: { running: 795, agility: 789 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なドリブラー', rank: '銀', description: '発動条件：好調　/　突破力・敏捷性UP' },
      { name: '懐の深いパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・キープ力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + pramanbelaObj, 'utf-8');
console.log('2. mockData.js updated with p288 (P. Ramanbela) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('pramanbela2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/musair2026Image.js"></script>',
    '<script src="./src/data/musair2026Image.js"></script>\n  <script src="./src/data/pramanbela2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p288": "P_RAMANBELA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p287": "MUSAIR_2026_IMAGE"',
    '"p287": "MUSAIR_2026_IMAGE",\n  "p288": "P_RAMANBELA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p288 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p288": "P_RAMANBELA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p287": "MUSAIR_2026_IMAGE"',
    '"p287": "MUSAIR_2026_IMAGE",\n  "p288": "P_RAMANBELA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p288 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p288 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p288');
console.log('6. Verification of p288:', p288 ? `${p288.name} (${p288.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.P_RAMANBELA_2026_IMAGE:', sandbox.window.P_RAMANBELA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== P. RAMANBELA TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
