const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING BURROWS TICKET EXCHANGE (p283) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\8dd70f4e-e6e6-425c-8716-ba327fd6d38b\\.user_uploaded\\media_1787232664704.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'burrows2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.BURROWS_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. burrows2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p282Idx = mockCode.indexOf("id: 'p282'");
if (p282Idx === -1) {
  console.error("Could not find p282 in mockData.js!");
  process.exit(1);
}

const p282AvatarIdx = mockCode.indexOf("avatarUrl:", p282Idx);
const p282EndIdx = mockCode.indexOf("}", p282AvatarIdx);

const mockCodeHeader = mockCode.substring(0, p282EndIdx + 1);

const burrowsObj = `,
  {
    id: 'p283',
    name: 'バロウズ(チケット交換)',
    readingName: 'ばろうず',
    category: 'DF',
    mainPosition: 'LFB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ジャマイカ',
    policy: 'カウンター',
    playStyle: '攻撃的LFB',
    playStyleLevel: 'Ⅱ',
    overall: 5102,
    maxOverall: 12566,
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
      overall: 12566,
      baseStats: { shoot: 2104, pass: 2197, dribble: 2234, defense: 2207, physical: 2231, speed: 1593 },
      detailStats: {
        shoot: { finishing: 700, power: 700, composure: 704 },
        pass: { shortPass: 742, longPass: 776, accuracy: 679 },
        dribble: { breakout: 772, keeping: 731, ballTouch: 731 },
        defense: { tackle: 732, interception: 744, marking: 731 },
        physical: { jumping: 717, contact: 700, stamina: 814 },
        speed: { running: 802, agility: 791 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: 'ファストフィード', rank: '銅', description: '発動エリア：中中・後左中右　/　発動条件：CFの位置に居る選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP' },
    abilities: [
      { name: '走り切るロングパサー', rank: '銀', description: '発動条件：途中出場　/　ロングパス・スタミナUP' },
      { name: '切り裂くパサー', rank: '銅', description: '発動条件：絶好調　/　ショートパス・突破力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK', 'クリエイティブLFB'] };
`;

fs.writeFileSync(mockPath, mockCodeHeader + burrowsObj, 'utf-8');
console.log('2. mockData.js updated with p283 (Burrows) in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('burrows2026Image.js')) {
  indexContent = indexContent.replace(
    '<script src="./src/data/baekgyeongsu2026Image.js"></script>',
    '<script src="./src/data/baekgyeongsu2026Image.js"></script>\n  <script src="./src/data/burrows2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update PLAYER_IMAGE_MAP in src/app.jsx & src/app.js
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');

if (!appJsxCode.includes('"p283": "BURROWS_2026_IMAGE"')) {
  appJsxCode = appJsxCode.replace(
    '"p282": "BAEK_GYEONGSU_2026_IMAGE"',
    '"p282": "BAEK_GYEONGSU_2026_IMAGE",\n  "p283": "BURROWS_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
console.log('4. src/app.jsx updated with p283 avatar map.');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!appJsCode.includes('"p283": "BURROWS_2026_IMAGE"')) {
  appJsCode = appJsCode.replace(
    '"p282": "BAEK_GYEONGSU_2026_IMAGE"',
    '"p282": "BAEK_GYEONGSU_2026_IMAGE",\n  "p283": "BURROWS_2026_IMAGE"'
  );
}
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
console.log('5. src/app.js updated with p283 avatar map.');

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalMockCode = fs.readFileSync(mockPath, 'utf-8');
vm.runInContext(finalMockCode, sandbox);
const p283 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p283');
console.log('6. Verification of p283:', p283 ? `${p283.name} (${p283.nationality})` : 'MISSING');

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.BURROWS_2026_IMAGE:', sandbox.window.BURROWS_2026_IMAGE ? 'LOADED' : 'MISSING');

console.log('=== BURROWS TICKET EXCHANGE ADDED SUCCESSFULLY! ===');
