const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING TOUMEIOTOKO TICKET EXCHANGE (p286) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787233401628.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'toumeiotoko2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TOUMEIOTOKO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. toumeiotoko2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p285Idx = mockCode.indexOf("id: 'p285'");
if (p285Idx === -1) {
  console.error("Could not find p285 in mockData.js!");
  process.exit(1);
}

const p285AvatarIdx = mockCode.indexOf("avatarUrl:", p285Idx);
const p285EndIdx = mockCode.indexOf("}", p285AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p285EndIdx + 1);

const toumeiotokoObj = `,
  {
    id: 'p286',
    name: '透明男(チケット交換)',
    readingName: 'とうめいおとこ',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'カウンター',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 5179,
    maxOverall: 12671,
    baseStats: { shoot: 865, pass: 945, dribble: 1045, defense: 1119, physical: 907, speed: 584 },
    detailStats: {
      shoot: { finishing: 297, power: 288, composure: 280 },
      pass: { shortPass: 323, longPass: 316, accuracy: 306 },
      dribble: { breakout: 323, keeping: 356, ballTouch: 366 },
      defense: { tackle: 393, interception: 365, marking: 361 },
      physical: { jumping: 249, contact: 287, stamina: 371 },
      speed: { running: 313, agility: 271 }
    },
    maxEnhanced: {
      overall: 12671,
      baseStats: { shoot: 2119, pass: 2259, dribble: 2287, defense: 2409, physical: 2185, speed: 1412 },
      detailStats: {
        shoot: { finishing: 711, power: 702, composure: 706 },
        pass: { shortPass: 761, longPass: 754, accuracy: 744 },
        dribble: { breakout: 737, keeping: 770, ballTouch: 780 },
        defense: { tackle: 831, interception: 791, marking: 787 },
        physical: { jumping: 663, contact: 713, stamina: 809 },
        speed: { running: 727, agility: 685 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ボールハンター', rank: '銀', description: '発動条件：絶好調　/　タックル・マークUP' },
      { name: 'シルクタッチ', rank: '銅', description: '発動条件：好調　/　ショートパス・ボールタッチUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + toumeiotokoObj, 'utf-8');
console.log('2. mockData.js updated with p286 (Toumei Otoko) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('toumeiotoko2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/suspeita2026Image.js"></script>',
    '<script src="./src/data/suspeita2026Image.js"></script>\n  <script src="./src/data/toumeiotoko2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p286": "TOUMEIOTOKO_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p285": "SUSPEITA_2026_IMAGE"',
    '"p285": "SUSPEITA_2026_IMAGE",\n  "p286": "TOUMEIOTOKO_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p286 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p286": "TOUMEIOTOKO_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p285": "SUSPEITA_2026_IMAGE"',
    '"p285": "SUSPEITA_2026_IMAGE",\n  "p286": "TOUMEIOTOKO_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p286 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p286 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p286');
console.log('6. Verification of p286:', p286 ? `${p286.name} (${p286.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TOUMEIOTOKO_2026_IMAGE:', sandbox.window.TOUMEIOTOKO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== TOUMEIOTOKO TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
