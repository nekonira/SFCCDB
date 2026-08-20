const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ARGANTCHUEV TICKET EXCHANGE (p284) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787232878939.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'argantchuev2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.ARGANTCHUEV_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. argantchuev2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p283Idx = mockCode.indexOf("id: 'p283'");
if (p283Idx === -1) {
  console.error("Could not find p283 in mockData.js!");
  process.exit(1);
}

const p283AvatarIdx = mockCode.indexOf("avatarUrl:", p283Idx);
const p283EndIdx = mockCode.indexOf("}", p283AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p283EndIdx + 1);

const argantchuevObj = `,
  {
    id: 'p284',
    name: 'アルガンチューワ(チケット交換)',
    readingName: 'あるがんちゅーわ',
    category: 'DF',
    mainPosition: 'RFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ウズベキスタン',
    policy: 'カウンター',
    playStyle: '攻撃的RFB',
    playStyleLevel: 'Ⅱ',
    overall: 5142,
    maxOverall: 12527,
    baseStats: { shoot: 878, pass: 856, dribble: 1104, defense: 882, physical: 865, speed: 748 },
    detailStats: {
      shoot: { finishing: 300, power: 280, composure: 298 },
      pass: { shortPass: 269, longPass: 331, accuracy: 256 },
      dribble: { breakout: 419, keeping: 349, ballTouch: 336 },
      defense: { tackle: 265, interception: 339, marking: 278 },
      physical: { jumping: 269, contact: 226, stamina: 370 },
      speed: { running: 388, agility: 360 }
    },
    maxEnhanced: {
      overall: 12527,
      baseStats: { shoot: 2084, pass: 2134, dribble: 2346, defense: 2196, physical: 2143, speed: 1624 },
      detailStats: {
        shoot: { finishing: 702, power: 682, composure: 700 },
        pass: { shortPass: 695, longPass: 757, accuracy: 682 },
        dribble: { breakout: 833, keeping: 763, ballTouch: 750 },
        defense: { tackle: 703, interception: 777, marking: 716 },
        physical: { jumping: 683, contact: 652, stamina: 808 },
        speed: { running: 826, agility: 798 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '打開のドリブル', rank: '銅', description: '発動エリア：中左右・後左右　/　発動条件：ドリブル時　/　突破力・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' },
      { name: 'スピードランナー', rank: '銅', description: '発動条件：途中出場　/　走力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + argantchuevObj, 'utf-8');
console.log('2. mockData.js updated with p284 (Argantchuev) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('argantchuev2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/burrows2026Image.js"></script>',
    '<script src="./src/data/burrows2026Image.js"></script>\n  <script src="./src/data/argantchuev2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p284": "ARGANTCHUEV_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p283": "BURROWS_2026_IMAGE"',
    '"p283": "BURROWS_2026_IMAGE",\n  "p284": "ARGANTCHUEV_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p284 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p284": "ARGANTCHUEV_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p283": "BURROWS_2026_IMAGE"',
    '"p283": "BURROWS_2026_IMAGE",\n  "p284": "ARGANTCHUEV_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p284 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p284 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p284');
console.log('6. Verification of p284:', p284 ? `${p284.name} (${p284.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.ARGANTCHUEV_2026_IMAGE:', sandbox.window.ARGANTCHUEV_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== ARGANTCHUEV TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
