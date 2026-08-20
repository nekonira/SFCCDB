const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JUNICHIRO IIJIMA TICKET EXCHANGE (p280) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8b50a9b4-c50b-431d-a7b7-e99775d959f8\\.user_uploaded\\media_1787231800617.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'iijima2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.IIJIMA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. iijima2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p279Idx = mockCode.indexOf("id: 'p279'");
if (p279Idx === -1) {
  console.error("Could not find p279 in mockData.js!");
  process.exit(1);
}

const p279AvatarIdx = mockCode.indexOf("avatarUrl:", p279Idx);
const p279EndIdx = mockCode.indexOf("}", p279AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p279EndIdx + 1);

const iijimaObj = `,
  {
    id: 'p280',
    name: '飯島潤一郎(チケット交換)',
    readingName: 'いいじまじゅんいちろう',
    category: 'GK',
    mainPosition: 'GK',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ムービング',
    playStyle: 'オーソドックスGK',
    playStyleLevel: 'Ⅱ',
    overall: 5130,
    maxOverall: 11582,
    baseStats: { shoot: 682, pass: 485, dribble: 601, defense: 1065, physical: 999, speed: 652 },
    detailStats: {
      shoot: { finishing: 195, power: 279, composure: 208 },
      pass: { shortPass: 158, longPass: 169, accuracy: 158 },
      dribble: { breakout: 198, keeping: 195, ballTouch: 208 },
      defense: { tackle: 367, interception: 354, marking: 344 },
      physical: { jumping: 408, contact: 404, stamina: 187 },
      speed: { running: 284, agility: 368 }
    },
    maxEnhanced: {
      overall: 11582,
      baseStats: { shoot: 1852, pass: 1799, dribble: 1771, defense: 2379, physical: 2301, speed: 1480 },
      detailStats: {
        shoot: { finishing: 585, power: 669, composure: 598 },
        pass: { shortPass: 596, longPass: 607, accuracy: 596 },
        dribble: { breakout: 588, keeping: 585, ballTouch: 598 },
        defense: { tackle: 805, interception: 792, marking: 782 },
        physical: { jumping: 846, contact: 842, stamina: 613 },
        speed: { running: 698, agility: 782 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -2, shoot: -1, longShoot: -1,
      shortPass: -1, longPass: 1, throughPass: -1, cutIn: -1, keep: -1,
      delay: -1, rushOut: -1, feint: -1, press: -1
    },
    skill: { name: '驚異的なセービング', rank: '銅', description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP' },
    abilities: [
      { name: '全方向の守護', rank: '銀', description: '発動条件：絶好調　/　反応速度・ジャンプUP' },
      { name: '強靭な守護神', rank: '銅', description: '発動条件：好調　/　セービング・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + iijimaObj, 'utf-8');
console.log('2. mockData.js updated with p280 (Junichiro Iijima) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('iijima2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/ahnjunghwanhaifuImage.js"></script>',
    '<script src="./src/data/ahnjunghwanhaifuImage.js"></script>\n  <script src="./src/data/iijima2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP and isHaifuPlayer in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('チケット交換')) {
  appJsxCode = appJsxCode.replace(
    "name.includes('配布')",
    "name.includes('配布') || name.includes('チケット交換') || name.includes('交換')"
  );
}

if (!appJsxCode.includes('"p280": "IIJIMA_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p279": "AHN_JUNGHWAN_HAIFU_IMAGE"',
    '"p279": "AHN_JUNGHWAN_HAIFU_IMAGE",\n  "p280": "IIJIMA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p280 avatar map and Ticket Exchange check.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('チケット交換')) {
  appJsCode = appJsCode.replace(
    "name.includes('配布')",
    "name.includes('配布') || name.includes('チケット交換') || name.includes('交換')"
  );
}

if (!appJsCode.includes('"p280": "IIJIMA_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p279": "AHN_JUNGHWAN_HAIFU_IMAGE"',
    '"p279": "AHN_JUNGHWAN_HAIFU_IMAGE",\n  "p280": "IIJIMA_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p280 avatar map and Ticket Exchange check.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p280 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p280');
console.log('6. Verification of p280:', p280 ? `${p280.name} (${p280.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.IIJIMA_2026_IMAGE:', sandbox.window.IIJIMA_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== JUNICHIRO IIJIMA TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
