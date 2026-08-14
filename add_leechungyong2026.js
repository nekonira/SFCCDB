const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LEE CHUNG YONG 2026 (p213) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\e536f7dd-c90e-4781-98c2-370755852efb\\media__1786032047281.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'leeChungYong2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LEE_CHUNG_YONG_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. leeChungYong2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p212Idx = mockCode.indexOf("id: 'p212'");
if (p212Idx === -1) {
  console.error("Could not find p212 in mockData.js!");
  process.exit(1);
}

const p212AvatarIdx = mockCode.indexOf("avatarUrl:", p212Idx);
const p212EndIdx = mockCode.indexOf("}", p212AvatarIdx);

mockCode = mockCode.substring(0, p212EndIdx + 1);

const leeChungYong2026Obj = `,
  {
    id: 'p213',
    name: 'イ・チュンヨン(2026)',
    readingName: 'い・ちゅんよん',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ワイドストライカーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6319,
    maxOverall: 14499,
    baseStats: { shoot: 1226, pass: 1128, dribble: 1239, defense: 1089, physical: 974, speed: 720 },
    detailStats: {
      shoot: { finishing: 427, power: 381, composure: 418 },
      pass: { shortPass: 395, longPass: 382, accuracy: 351 },
      dribble: { breakout: 380, keeping: 401, ballTouch: 458 },
      defense: { tackle: 361, interception: 367, marking: 361 },
      physical: { jumping: 332, contact: 339, stamina: 303 },
      speed: { running: 360, agility: 360 }
    },
    maxEnhanced: {
      overall: 14499,
      baseStats: { shoot: 2783, pass: 2697, dribble: 2832, defense: 2598, physical: 2519, speed: 1790 },
      detailStats: {
        shoot: { finishing: 950, power: 892, composure: 941 },
        pass: { shortPass: 918, longPass: 905, accuracy: 874 },
        dribble: { breakout: 915, keeping: 936, ballTouch: 981 },
        defense: { tackle: 872, interception: 866, marking: 860 },
        physical: { jumping: 843, contact: 850, stamina: 826 },
        speed: { running: 895, agility: 895 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 2, longShoot: 1,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 2, keep: 0,
      delay: -1, rushOut: 1, feint: 1, press: 0
    },
    skill: { name: '疾走のトラップ', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：トラップ時　/　ボールタッチ・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '冷静なボールタッチ', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ボールタッチUP' },
      { name: '切り裂くパサー', rank: '銀', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += leeChungYong2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p213 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('leeChungYong2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/leeChungYong2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p213Check = `  if (player.id === 'p213' || (player.name && (player.name.includes('イ・チュンヨン') || player.name.includes('チュンヨン') || player.name.includes('Lee Chung-Yong') || player.name.includes('Chung-Yong')))) {\n    return window.LEE_CHUNG_YONG_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes("player.id === 'p213'")) {
  appJsCode = appJsCode.replace(
    `if (player.id === 'p212' || (player.name && (player.name.includes('ルドヴィグソン') || player.name.includes('グスタフ') || player.name.includes('Gustav Ludwigson') || player.name.includes('Ludwigson')))) {
    return window.LUDWIGSON_GUSTAV_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p212' || (player.name && (player.name.includes('ルドヴィグソン') || player.name.includes('グスタフ') || player.name.includes('Gustav Ludwigson') || player.name.includes('Ludwigson')))) {
    return window.LUDWIGSON_GUSTAV_2026_IMAGE || player.avatarUrl || '';
  }\n${p213Check}`
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p213 avatar resolver.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes("player.id === 'p213'")) {
  appJsxCode = appJsxCode.replace(
    `if (player.id === 'p212' || (player.name && (player.name.includes('ルドヴィグソン') || player.name.includes('グスタフ') || player.name.includes('Gustav Ludwigson') || player.name.includes('Ludwigson')))) {
    return window.LUDWIGSON_GUSTAV_2026_IMAGE || player.avatarUrl || '';
  }`,
    `if (player.id === 'p212' || (player.name && (player.name.includes('ルドヴィグソン') || player.name.includes('グスタフ') || player.name.includes('Gustav Ludwigson') || player.name.includes('Ludwigson')))) {
    return window.LUDWIGSON_GUSTAV_2026_IMAGE || player.avatarUrl || '';
  }\n${p213Check}`
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p213 avatar resolver.');
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p213 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p213');
console.log('6. Verification of p213:', p213 ? p213.name : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LEE_CHUNG_YONG_2026_IMAGE:', sandbox.window.LEE_CHUNG_YONG_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== LEE CHUNG YONG 2026 ADDED SUCCESSFULLY! ===');
