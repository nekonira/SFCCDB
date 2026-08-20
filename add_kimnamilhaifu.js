const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING KIM NAM-IL HAIFU (p278) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8b50a9b4-c50b-431d-a7b7-e99775d959f8\\.user_uploaded\\media_1787230833907.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kimnamilhaifuImage.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KIM_NAMIL_HAIFU_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kimnamilhaifuImage.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p277Idx = mockCode.indexOf("id: 'p277'");
if (p277Idx === -1) {
  console.error("Could not find p277 in mockData.js!");
  process.exit(1);
}

const p277AvatarIdx = mockCode.indexOf("avatarUrl:", p277Idx);
const p277EndIdx = mockCode.indexOf("}", p277AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p277EndIdx + 1);

const kimnamilObj = `,
  {
    id: 'p278',
    name: 'キム・ナミル(配布)',
    readingName: 'きむなみる',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ムービング',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 5491,
    maxOverall: 12893,
    baseStats: { shoot: 880, pass: 938, dribble: 969, defense: 1167, physical: 1059, speed: 572 },
    detailStats: {
      shoot: { finishing: 312, power: 293, composure: 275 },
      pass: { shortPass: 319, longPass: 307, accuracy: 312 },
      dribble: { breakout: 313, keeping: 324, ballTouch: 332 },
      defense: { tackle: 370, interception: 396, marking: 401 },
      physical: { jumping: 357, contact: 353, stamina: 349 },
      speed: { running: 273, agility: 299 }
    },
    maxEnhanced: {
      overall: 12893,
      baseStats: { shoot: 2152, pass: 2270, dribble: 2229, defense: 2475, physical: 2355, speed: 1412 },
      detailStats: {
        shoot: { finishing: 732, power: 713, composure: 707 },
        pass: { shortPass: 763, longPass: 751, accuracy: 756 },
        dribble: { breakout: 733, keeping: 744, ballTouch: 752 },
        defense: { tackle: 814, interception: 828, marking: 833 },
        physical: { jumping: 777, contact: 785, stamina: 793 },
        speed: { running: 693, agility: 719 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: '不屈のパサー', rank: '銅', description: '発動条件：途中出場　/　ショートパス・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + kimnamilObj, 'utf-8');
console.log('2. mockData.js updated with p278 (Kim Nam-Il Haifu) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kimnamilhaifuImage.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/chanathip2026Image.js"></script>',
    '<script src="./src/data/chanathip2026Image.js"></script>\n  <script src="./src/data/kimnamilhaifuImage.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p278": "KIM_NAMIL_HAIFU_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p277": "CHANATHIP_2026_IMAGE"',
    '"p277": "CHANATHIP_2026_IMAGE",\n  "p278": "KIM_NAMIL_HAIFU_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p278 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p278": "KIM_NAMIL_HAIFU_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p277": "CHANATHIP_2026_IMAGE"',
    '"p277": "CHANATHIP_2026_IMAGE",\n  "p278": "KIM_NAMIL_HAIFU_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p278 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p278 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p278');
console.log('6. Verification of p278:', p278 ? `${p278.name} (${p278.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KIM_NAMIL_HAIFU_IMAGE:', sandbox.window.KIM_NAMIL_HAIFU_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== KIM NAM-IL HAIFU ADDED SUCCESSFULLY! ===');
