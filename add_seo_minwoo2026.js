const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SEO MIN-WOO 2026 (p179) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786023894896.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'seoMinwoo2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SEO_MINWOO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. seoMinwoo2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p178Idx = mockCode.indexOf("id: 'p178'");
if (p178Idx === -1) {
  console.error("Could not find p178 in mockData.js!");
  process.exit(1);
}

const p178AvatarIdx = mockCode.indexOf("avatarUrl:", p178Idx);
const p178EndIdx = mockCode.indexOf("}", p178AvatarIdx);

mockCode = mockCode.substring(0, p178EndIdx + 1);

const seoMinwoo2026Obj = `,
  {
    id: 'p179',
    name: 'ソ・ミヌ(2026)',
    readingName: 'そみぬ',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'カウンター',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6281,
    maxOverall: 14400,
    baseStats: { shoot: 1238, pass: 1162, dribble: 1105, defense: 1138, physical: 1151, speed: 714 },
    detailStats: {
      shoot: { finishing: 424, power: 416, composure: 398 },
      pass: { shortPass: 395, longPass: 391, accuracy: 376 },
      dribble: { breakout: 350, keeping: 344, ballTouch: 411 },
      defense: { tackle: 324, interception: 420, marking: 394 },
      physical: { jumping: 327, contact: 412, stamina: 412 },
      speed: { running: 347, agility: 367 }
    },
    maxEnhanced: {
      overall: 14400,
      baseStats: { shoot: 2783, pass: 2767, dribble: 2638, defense: 2719, physical: 2720, speed: 1736 },
      detailStats: {
        shoot: { finishing: 935, power: 927, composure: 921 },
        pass: { shortPass: 930, longPass: 926, accuracy: 911 },
        dribble: { breakout: 861, keeping: 855, ballTouch: 922 },
        defense: { tackle: 859, interception: 943, marking: 917 },
        physical: { jumping: 838, contact: 935, stamina: 947 },
        speed: { running: 858, agility: 878 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '決めきる力', rank: '銀', description: '発動条件：途中出場　/　決定力・スタミナUP' },
      { name: '突き刺すパス', rank: '銀', description: '発動条件：途中出場　/　キック力・ショートパスUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += seoMinwoo2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p179 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('seoMinwoo2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/shiotani2026Image.js"></script>',
    '<script src="./src/data/seoMinwoo2026Image.js"></script>\n  <script src="./src/data/shiotani2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p179Check = `  if (player.id === 'p179' || (player.name && (player.name.includes('ソ・ミヌ') || player.name.includes('ミヌ') || player.name.includes('Seo Min-Woo') || player.name.includes('Seo')))) {\n    return window.SEO_MINWOO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p179'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {
    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {
    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';
  }\n${p179Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p179 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p179'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {
    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p178' || (player.name && (player.name.includes('河原創') || player.name.includes('河原') || player.name.includes('Kawahara')))) {
    return window.KAWAHARA_2026_IMAGE || player.avatarUrl || '';
  }\n${p179Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p179 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p179 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p179');
console.log('6. Verification of p179:', p179 ? p179.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SEO_MINWOO_2026_IMAGE:', sandbox.window.SEO_MINWOO_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== SEO MIN-WOO 2026 ADDED SUCCESSFULLY! ===');
