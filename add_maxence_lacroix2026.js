const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING MAXENCE LACROIX (p406) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\d8448505-5340-47b3-afef-a700dd46b8c6\\.user_uploaded\\media_1792557295247.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'maxenceLacroix2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.MAXENCE_LACROIX_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. maxenceLacroix2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p405Idx = mockCode.indexOf("id: 'p405'");
if (p405Idx === -1) {
  console.error("Could not find p405 in mockData.js!");
  process.exit(1);
}

const p405AvatarIdx = mockCode.indexOf("avatarUrl:", p405Idx);
const p405EndIdx = mockCode.indexOf("}", p405AvatarIdx);

const headerCode = mockCode.substring(0, p405EndIdx + 1);

const lacroixObj = `,
  {
    id: 'p406',
    name: 'マクサンス・ラクロワ',
    readingName: 'まくさんす・らくろわ',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 7361,
    maxOverall: 15652,
    baseStats: { shoot: 1002, pass: 1108, dribble: 1237, defense: 1394, physical: 1276, speed: 918 },
    detailStats: {
      shoot: { finishing: 308, power: 367, composure: 327 },
      pass: { shortPass: 377, longPass: 374, accuracy: 357 },
      dribble: { breakout: 416, keeping: 405, ballTouch: 416 },
      defense: { tackle: 446, interception: 473, marking: 475 },
      physical: { jumping: 452, contact: 452, stamina: 372 },
      speed: { running: 489, agility: 429 }
    },
    maxEnhanced: {
      overall: 15652,
      baseStats: { shoot: 2499, pass: 2677, dribble: 2770, defense: 2999, physical: 2869, speed: 1964 },
      detailStats: {
        shoot: { finishing: 807, power: 866, composure: 826 },
        pass: { shortPass: 900, longPass: 897, accuracy: 880 },
        dribble: { breakout: 927, keeping: 916, ballTouch: 927 },
        defense: { tackle: 981, interception: 1008, marking: 1010 },
        physical: { jumping: 987, contact: 987, stamina: 895 },
        speed: { running: 1012, agility: 952 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '熟練のインターセプト', rank: '銀', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: '上空の寸断者', rank: '銀', description: '発動条件：好調　/　パスカット・ジャンプUP' },
      { name: 'ランニングマーカー', rank: '銀', description: '発動条件：絶好調　/　マーク・走力UP' },
      { name: 'ハードタックラー', rank: '銅', description: '発動条件：好調　/　タックル・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + lacroixObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p406.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('maxenceLacroix2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/matsuhashiYuan2026Image.js"></script>',
    '<script src="./src/data/matsuhashiYuan2026Image.js"></script>\n  <script src="./src/data/maxenceLacroix2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with maxenceLacroix2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p406":"MAXENCE_LACROIX_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p405":"KANTE_2026_IMAGE"',
    '"p405":"KANTE_2026_IMAGE","p406":"MAXENCE_LACROIX_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p406 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p406": "MAXENCE_LACROIX_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p405": "KANTE_2026_IMAGE"',
    '"p405": "KANTE_2026_IMAGE",\n    "p406": "MAXENCE_LACROIX_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p406 image mapping.');
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
const p406 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p406');
console.log('7. Verification of p406 in mockData:', p406 ? `${p406.name} (${p406.nationality}, ${p406.mainPosition}, ${p406.overall} -> ${p406.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.MAXENCE_LACROIX_2026_IMAGE:', sandbox.window.MAXENCE_LACROIX_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== MAXENCE LACROIX ADDED SUCCESSFULLY! ===');
