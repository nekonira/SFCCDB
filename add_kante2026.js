const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING N\'GOLO KANTE (p405) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\d8448505-5340-47b3-afef-a700dd46b8c6\\.user_uploaded\\media_1792556728639.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kante2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KANTE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kante2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p404Idx = mockCode.indexOf("id: 'p404'");
if (p404Idx === -1) {
  console.error("Could not find p404 in mockData.js!");
  process.exit(1);
}

const p404AvatarIdx = mockCode.indexOf("avatarUrl:", p404Idx);
const p404EndIdx = mockCode.indexOf("}", p404AvatarIdx);

const headerCode = mockCode.substring(0, p404EndIdx + 1);

const kanteObj = `,
  {
    id: 'p405',
    name: 'エンゴロ・カンテ',
    readingName: 'えんごろ・かんて',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ハードマーカー',
    playStyleLevel: 'Ⅱ',
    overall: 7360,
    maxOverall: 15651,
    baseStats: { shoot: 1125, pass: 1354, dribble: 1379, defense: 1454, physical: 1302, speed: 854 },
    detailStats: {
      shoot: { finishing: 378, power: 368, composure: 379 },
      pass: { shortPass: 472, longPass: 457, accuracy: 425 },
      dribble: { breakout: 458, keeping: 455, ballTouch: 466 },
      defense: { tackle: 485, interception: 489, marking: 480 },
      physical: { jumping: 382, contact: 435, stamina: 485 },
      speed: { running: 370, agility: 484 }
    },
    maxEnhanced: {
      overall: 15651,
      baseStats: { shoot: 2670, pass: 2959, dribble: 2912, defense: 3035, physical: 2871, speed: 1876 },
      detailStats: {
        shoot: { finishing: 889, power: 879, composure: 902 },
        pass: { shortPass: 1007, longPass: 992, accuracy: 960 },
        dribble: { breakout: 969, keeping: 966, ballTouch: 977 },
        defense: { tackle: 1020, interception: 1012, marking: 1003 },
        physical: { jumping: 893, contact: 958, stamina: 1020 },
        speed: { running: 881, agility: 995 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '奪還', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・マーク・ショートパスUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '不死鳥のタックル', rank: '金', description: '発動条件：好調　/　タックル・スタミナUP　/　ハーフタイムにスタミナ回復量が30％UP' },
      { name: 'ピッチの分断者', rank: '銀', description: '発動条件：絶好調　/　パスカット・スタミナUP' },
      { name: 'リスクヘッジパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・マークUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + kanteObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p405.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kante2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/kaneHurricaneCardImage.js"></script>',
    '<script src="./src/data/kaneHurricaneCardImage.js"></script>\n  <script src="./src/data/kante2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with kante2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p405":"KANTE_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p404":"DESIRE_DOUE_2026_IMAGE"',
    '"p404":"DESIRE_DOUE_2026_IMAGE","p405":"KANTE_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p405 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p405": "KANTE_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p404": "DESIRE_DOUE_2026_IMAGE"',
    '"p404": "DESIRE_DOUE_2026_IMAGE",\n    "p405": "KANTE_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p405 image mapping.');
}

// 5. Update index.html cache busters
const newTimestamp = Date.now().toString();
indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent.replace(/mockData\.js\?v=\d+/, `mockData.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/app\.js\?v=\d+/, `app.js?v=${newTimestamp}`);
indexContent = indexContent.replace(/main\.js\?v=\d+/, `main.js?v=${newTimestamp}`);
fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('6. index.html cache busters updated with', newTimestamp);

// 6. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(updatedMockCode, sandbox);
const p405 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p405');
console.log('7. Verification of p405 in mockData:', p405 ? `${p405.name} (${p405.nationality}, ${p405.mainPosition}, ${p405.overall} -> ${p405.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.KANTE_2026_IMAGE:', sandbox.window.KANTE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== N\'GOLO KANTE ADDED SUCCESSFULLY! ===');
