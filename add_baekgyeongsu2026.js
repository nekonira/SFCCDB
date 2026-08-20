const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING BAEK GYEONG-SU TICKET EXCHANGE (p282) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787232507847.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'baekgyeongsu2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.BAEK_GYEONGSU_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. baekgyeongsu2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p281Idx = mockCode.indexOf("id: 'p281'");
if (p281Idx === -1) {
  console.error("Could not find p281 in mockData.js!");
  process.exit(1);
}

const p281AvatarIdx = mockCode.indexOf("avatarUrl:", p281Idx);
const p281EndIdx = mockCode.indexOf("}", p281AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p281EndIdx + 1);

const baekObj = `,
  {
    id: 'p282',
    name: 'ペク・ギョンス(チケット交換)',
    readingName: 'ぺく・ぎょんす',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 5077,
    maxOverall: 12536,
    baseStats: { shoot: 833, pass: 899, dribble: 911, defense: 1029, physical: 1017, speed: 653 },
    detailStats: {
      shoot: { finishing: 251, power: 310, composure: 272 },
      pass: { shortPass: 307, longPass: 317, accuracy: 275 },
      dribble: { breakout: 283, keeping: 306, ballTouch: 322 },
      defense: { tackle: 319, interception: 354, marking: 356 },
      physical: { jumping: 344, contact: 317, stamina: 356 },
      speed: { running: 317, agility: 336 }
    },
    maxEnhanced: {
      overall: 12536,
      baseStats: { shoot: 2039, pass: 2177, dribble: 2153, defense: 2343, physical: 2319, speed: 1505 },
      detailStats: {
        shoot: { finishing: 653, power: 712, composure: 674 },
        pass: { shortPass: 733, longPass: 743, accuracy: 701 },
        dribble: { breakout: 697, keeping: 720, ballTouch: 736 },
        defense: { tackle: 757, interception: 792, marking: 794 },
        physical: { jumping: 782, contact: 755, stamina: 782 },
        speed: { running: 743, agility: 762 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '冴え渡るインターセプト', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：パスカット時　/　パスカット・敏捷性UP' },
    abilities: [
      { name: 'ハイタワーの天敵', rank: '銀', description: '発動条件：好調　/　マーク・ジャンプUP' },
      { name: 'アジャイルクラッシャー', rank: '銅', description: '発動条件：好調　/　タックル・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + baekObj, 'utf-8');
console.log('2. mockData.js updated with p282 (Baek Gyeong-Su) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('baekgyeongsu2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/barfie2026Image.js"></script>',
    '<script src="./src/data/barfie2026Image.js"></script>\n  <script src="./src/data/baekgyeongsu2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p282": "BAEK_GYEONGSU_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p281": "BARFIE_2026_IMAGE"',
    '"p281": "BARFIE_2026_IMAGE",\n  "p282": "BAEK_GYEONGSU_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p282 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p282": "BAEK_GYEONGSU_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p281": "BARFIE_2026_IMAGE"',
    '"p281": "BARFIE_2026_IMAGE",\n  "p282": "BAEK_GYEONGSU_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p282 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p282 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p282');
console.log('6. Verification of p282:', p282 ? `${p282.name} (${p282.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.BAEK_GYEONGSU_2026_IMAGE:', sandbox.window.BAEK_GYEONGSU_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== BAEK GYEONG-SU TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
