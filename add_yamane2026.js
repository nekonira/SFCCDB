const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RIKU YAMANE 2026 (p180) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786024010901.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yamane2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAMANE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yamane2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p179Idx = mockCode.indexOf("id: 'p179'");
if (p179Idx === -1) {
  console.error("Could not find p179 in mockData.js!");
  process.exit(1);
}

const p179AvatarIdx = mockCode.indexOf("avatarUrl:", p179Idx);
const p179EndIdx = mockCode.indexOf("}", p179AvatarIdx);

mockCode = mockCode.substring(0, p179EndIdx + 1);

const yamane2026Obj = `,
  {
    id: 'p180',
    name: '山根陸(2026)',
    readingName: 'やまねりく',
    category: 'MF',
    mainPosition: 'DMF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'リアクション',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6366,
    maxOverall: 14509,
    baseStats: { shoot: 1029, pass: 1133, dribble: 1255, defense: 1208, physical: 1138, speed: 843 },
    detailStats: {
      shoot: { finishing: 349, power: 341, composure: 339 },
      pass: { shortPass: 392, longPass: 383, accuracy: 358 },
      dribble: { breakout: 411, keeping: 407, ballTouch: 437 },
      defense: { tackle: 387, interception: 417, marking: 404 },
      physical: { jumping: 369, contact: 355, stamina: 414 },
      speed: { running: 423, agility: 420 }
    },
    maxEnhanced: {
      overall: 14509,
      baseStats: { shoot: 2574, pass: 2738, dribble: 2788, defense: 2789, physical: 2707, speed: 1865 },
      detailStats: {
        shoot: { finishing: 860, power: 852, composure: 862 },
        pass: { shortPass: 927, longPass: 918, accuracy: 893 },
        dribble: { breakout: 922, keeping: 918, ballTouch: 948 },
        defense: { tackle: 922, interception: 940, marking: 927 },
        physical: { jumping: 880, contact: 878, stamina: 949 },
        speed: { running: 934, agility: 931 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奮戦のパスカット', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカットUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'マラソンマン', rank: '銀', description: '発動条件：途中出場　/　スタミナ・走力UP' },
      { name: '絢爛なインターセプト', rank: '銀', description: '発動条件：絶好調　/　ボールタッチ・パスカットUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yamane2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p180 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yamane2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/yamaguchiImage.js"></script>',
    '<script src="./src/data/yamaguchiImage.js"></script>\n  <script src="./src/data/yamane2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p180Check = `  if (player.id === 'p180' || (player.name && (player.name.includes('山根陸') || player.name.includes('山根') || player.name.includes('Riku Yamane') || player.name.includes('Yamane')))) {\n    return window.YAMANE_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p180'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p179' || (player.name && (player.name.includes('ソ・ミヌ') || player.name.includes('ミヌ') || player.name.includes('Seo Min-Woo') || player.name.includes('Seo')))) {
    return window.SEO_MINWOO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p179' || (player.name && (player.name.includes('ソ・ミヌ') || player.name.includes('ミヌ') || player.name.includes('Seo Min-Woo') || player.name.includes('Seo')))) {
    return window.SEO_MINWOO_2026_IMAGE || player.avatarUrl || '';
  }\n${p180Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p180 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p180'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p179' || (player.name && (player.name.includes('ソ・ミヌ') || player.name.includes('ミヌ') || player.name.includes('Seo Min-Woo') || player.name.includes('Seo')))) {
    return window.SEO_MINWOO_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p179' || (player.name && (player.name.includes('ソ・ミヌ') || player.name.includes('ミヌ') || player.name.includes('Seo Min-Woo') || player.name.includes('Seo')))) {
    return window.SEO_MINWOO_2026_IMAGE || player.avatarUrl || '';
  }\n${p180Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p180 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p180 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p180');
console.log('6. Verification of p180:', p180 ? p180.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAMANE_2026_IMAGE:', sandbox.window.YAMANE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== RIKU YAMANE 2026 ADDED SUCCESSFULLY! ===');
