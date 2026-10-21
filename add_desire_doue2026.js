const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING DESIRE DOUE (p404) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\d8448505-5340-47b3-afef-a700dd46b8c6\\.user_uploaded\\media_1792556298585.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'desireDoue2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.DESIRE_DOUE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. desireDoue2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add player object to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p403Idx = mockCode.indexOf("id: 'p403'");
if (p403Idx === -1) {
  console.error("Could not find p403 in mockData.js!");
  process.exit(1);
}

const p403AvatarIdx = mockCode.indexOf("avatarUrl:", p403Idx);
const p403EndIdx = mockCode.indexOf("}", p403AvatarIdx);

const headerCode = mockCode.substring(0, p403EndIdx + 1);

const doueObj = `,
  {
    id: 'p404',
    name: 'デジレ・ドゥエ',
    readingName: 'でじれ・どぅえ',
    category: 'MF',
    mainPosition: 'AM',
    subPositions: ['LW'],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'フランス',
    policy: 'ムービング',
    playStyle: 'アタッカー',
    playStyleLevel: 'Ⅲ',
    overall: 7359,
    maxOverall: 15650,
    baseStats: { shoot: 1330, pass: 1344, dribble: 1478, defense: 1105, physical: 1263, speed: 965 },
    detailStats: {
      shoot: { finishing: 455, power: 431, composure: 444 },
      pass: { shortPass: 441, longPass: 454, accuracy: 449 },
      dribble: { breakout: 493, keeping: 493, ballTouch: 492 },
      defense: { tackle: 352, interception: 371, marking: 382 },
      physical: { jumping: 405, contact: 423, stamina: 435 },
      speed: { running: 476, agility: 489 }
    },
    maxEnhanced: {
      overall: 15650,
      baseStats: { shoot: 2875, pass: 2925, dribble: 3047, defense: 2650, physical: 2832, speed: 1999 },
      detailStats: {
        shoot: { finishing: 966, power: 942, composure: 967 },
        pass: { shortPass: 976, longPass: 977, accuracy: 972 },
        dribble: { breakout: 1016, keeping: 1016, ballTouch: 1015 },
        defense: { tackle: 875, interception: 882, marking: 893 },
        physical: { jumping: 916, contact: 946, stamina: 970 },
        speed: { running: 987, agility: 1012 }
      }
    },
    playTendencies: {
      attack: 0, defense: 0, dribble: 0, shoot: 0, longShoot: 0,
      shortPass: 1, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: 0, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '変速ギア', rank: '銀', description: '発動エリア：前中・中中　/　発動条件：ドリブル時　/　突破力・キープ力UP' },
    abilities: [
      { name: '変幻自在のドリブラー', rank: '金', description: '発動条件：好調　/　突破力・キープ力・ボールタッチUP' },
      { name: '快速のロングパサー', rank: '銀', description: '発動条件：好調　/　ロングパス・走力UP' },
      { name: '俊敏なパサー', rank: '銅', description: '発動条件：好調　/　ショートパス・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'AM', 'CMF', 'DM', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

const updatedMockCode = headerCode + doueObj;
fs.writeFileSync(mockPath, updatedMockCode, 'utf-8');
console.log('2. mockData.js updated with p404.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('desireDoue2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/desabiHaifuImage.js"></script>',
    '<script src="./src/data/desabiHaifuImage.js"></script>\n  <script src="./src/data/desireDoue2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with desireDoue2026Image.js script tag.');
}

// 4. Update src/app.js & src/app.jsx
const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p404":"DESIRE_DOUE_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p403":"DESABI_HAIFU_IMAGE"',
    '"p403":"DESABI_HAIFU_IMAGE","p404":"DESIRE_DOUE_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log('4. src/app.js updated with p404 image mapping.');
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
if (!appJsxCode.includes('"p404": "DESIRE_DOUE_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p403": "DESABI_HAIFU_IMAGE"',
    '"p403": "DESABI_HAIFU_IMAGE",\n    "p404": "DESIRE_DOUE_2026_IMAGE"'
  );
  fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
  console.log('5. src/app.jsx updated with p404 image mapping.');
}

// 5. Update index.html cache buster
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
const p404 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p404');
console.log('7. Verification of p404 in mockData:', p404 ? `${p404.name} (${p404.nationality}, ${p404.mainPosition}/${p404.subPositions.join(',')}, ${p404.overall} -> ${p404.maxOverall})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('8. Verification of window.DESIRE_DOUE_2026_IMAGE:', sandbox.window.DESIRE_DOUE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== DESIRE DOUE ADDED SUCCESSFULLY! ===');
