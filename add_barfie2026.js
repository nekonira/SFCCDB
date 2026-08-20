const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING BARFIE TICKET EXCHANGE (p281) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787232263556.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'barfie2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.BARFIE_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. barfie2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p280Idx = mockCode.indexOf("id: 'p280'");
if (p280Idx === -1) {
  console.error("Could not find p280 in mockData.js!");
  process.exit(1);
}

const p280AvatarIdx = mockCode.indexOf("avatarUrl:", p280Idx);
const p280EndIdx = mockCode.indexOf("}", p280AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p280EndIdx + 1);

const barfieObj = `,
  {
    id: 'p281',
    name: 'バルフィー(チケット交換)',
    readingName: 'ばるふぃー',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'エジプト',
    policy: 'カウンター',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 5082,
    maxOverall: 12666,
    baseStats: { shoot: 898, pass: 919, dribble: 992, defense: 893, physical: 953, speed: 717 },
    detailStats: {
      shoot: { finishing: 298, power: 298, composure: 302 },
      pass: { shortPass: 316, longPass: 350, accuracy: 253 },
      dribble: { breakout: 358, keeping: 317, ballTouch: 317 },
      defense: { tackle: 294, interception: 306, marking: 293 },
      physical: { jumping: 303, contact: 274, stamina: 376 },
      speed: { running: 364, agility: 353 }
    },
    maxEnhanced: {
      overall: 12666,
      baseStats: { shoot: 2104, pass: 2197, dribble: 2234, defense: 2207, physical: 2231, speed: 1693 },
      detailStats: {
        shoot: { finishing: 700, power: 700, composure: 704 },
        pass: { shortPass: 742, longPass: 776, accuracy: 679 },
        dribble: { breakout: 772, keeping: 731, ballTouch: 731 },
        defense: { tackle: 732, interception: 744, marking: 731 },
        physical: { jumping: 717, contact: 700, stamina: 814 },
        speed: { running: 802, agility: 891 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ストロングマーカー', rank: '銀', description: '発動条件：好調　/　マーク・コンタクトUP' },
      { name: 'エアバトラー', rank: '銅', description: '発動条件：絶好調　/　タックル・ジャンプUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + barfieObj, 'utf-8');
console.log('2. mockData.js updated with p281 (Barfie) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('barfie2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/iijima2026Image.js"></script>',
    '<script src="./src/data/iijima2026Image.js"></script>\n  <script src="./src/data/barfie2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p281": "BARFIE_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p280": "IIJIMA_2026_IMAGE"',
    '"p280": "IIJIMA_2026_IMAGE",\n  "p281": "BARFIE_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p281 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p281": "BARFIE_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p280": "IIJIMA_2026_IMAGE"',
    '"p280": "IIJIMA_2026_IMAGE",\n  "p281": "BARFIE_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p281 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p281 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p281');
console.log('6. Verification of p281:', p281 ? `${p281.name} (${p281.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.BARFIE_2026_IMAGE:', sandbox.window.BARFIE_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== BARFIE TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
