const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const dataDir = path.join(rootDir, 'src', 'data');

console.log('=== ADDING SONG MIN-KYU (2025) (p377) ===');

// 1. Image conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\5f886809-59dc-4db4-b1dc-ff9bc13d957f\\.user_uploaded\\media_1787986017482.png";
const imageJsPath = path.join(dataDir, 'songminkyu2025Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SONG_MIN_KYU_2025_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. Created songminkyu2025Image.js. Size:', fs.statSync(imageJsPath).size);

// 2. Add script tag to index.html if not present
const indexPath = path.join(rootDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
if (!indexContent.includes('songminkyu2025Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 2. Full Player Database -->',
    '  <script src="./src/data/songminkyu2025Image.js"></script>\n  <!-- 2. Full Player Database -->'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('2. Added songminkyu2025Image.js script tag to index.html');
}

// 3. Add p377 to mockData.js
const mockPath = path.join(dataDir, 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p376Idx = mockCode.indexOf("id: 'p376'");
if (p376Idx === -1) {
  console.error("Could not find p376 in mockData.js!");
  process.exit(1);
}

const p376AvatarIdx = mockCode.indexOf("avatarUrl:", p376Idx);
const p376EndIdx = mockCode.indexOf("}", p376AvatarIdx);

mockCode = mockCode.substring(0, p376EndIdx + 1);

const songMinKyuObj = `,
  {
    id: 'p377',
    name: 'ソン・ミンギュ',
    readingName: 'そんみんぎゅ',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'ポゼッション',
    playStyle: 'サイドアタッカーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6087,
    maxOverall: 14262,
    baseStats: { shoot: 1233, pass: 1151, dribble: 1169, defense: 995, physical: 1213, speed: 681 },
    detailStats: {
      shoot: { finishing: 430, power: 400, composure: 403 },
      pass: { shortPass: 386, longPass: 384, accuracy: 381 },
      dribble: { breakout: 382, keeping: 383, ballTouch: 404 },
      defense: { tackle: 343, interception: 337, marking: 315 },
      physical: { jumping: 405, contact: 353, stamina: 455 },
      speed: { running: 334, agility: 347 }
    },
    maxEnhanced: {
      overall: 14262,
      baseStats: { shoot: 2790, pass: 2720, dribble: 2762, defense: 2504, physical: 2758, speed: 1751 },
      detailStats: {
        shoot: { finishing: 953, power: 911, composure: 926 },
        pass: { shortPass: 909, longPass: 907, accuracy: 904 },
        dribble: { breakout: 917, keeping: 918, ballTouch: 927 },
        defense: { tackle: 854, interception: 836, marking: 814 },
        physical: { jumping: 916, contact: 864, stamina: 978 },
        speed: { running: 869, agility: 882 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 1, shoot: 0, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: -1, keep: 0,
      delay: -1, rushOut: 2, feint: 1, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：シュート時　/　決定力・シュートUP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '絶え間ないボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・トラップUP' },
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：絶好調　/　決定力・冷静さUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += songMinKyuObj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('3. Added p377 (Song Min-Kyu 2025) to mockData.js');

// 4. Update PLAYER_IMAGE_MAP in src/app.js and src/app.jsx
const appJsPath = path.join(rootDir, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
const mapMatch = appJsCode.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
const currentMap = eval('(' + mapMatch[1] + ')');

currentMap['p377'] = 'SONG_MIN_KYU_2025_IMAGE';

const formattedMapLines = Object.entries(currentMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

appJsCode = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');

const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
appJsxCode = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');

console.log('4. Updated PLAYER_IMAGE_MAP in src/app.js and src/app.jsx with p377');

// 5. Test VM execution
const sandbox = { React: {}, window: {} };
sandbox.window = sandbox;
sandbox.window.React = sandbox.React;
vm.createContext(sandbox);

const scriptMatches = indexContent.match(/src=["']\.\/src\/data\/([^"']+)["']/g) || [];
scriptMatches.forEach(match => {
  const fileName = match.replace(/src=["']\.\/src\/data\//, '').replace(/["']$/, '').split('?')[0];
  const filePath = path.join(dataDir, fileName);
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf-8');
    vm.runInContext(code, sandbox);
  }
});

const p377 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p377');
console.log('\n--- VERIFICATION RESULT ---');
console.log('p377 Found:', !!p377);
if (p377) {
  console.log('ID:', p377.id);
  console.log('Name:', p377.name);
  console.log('Position:', p377.mainPosition);
  console.log('PlayStyle:', p377.playStyle);
  console.log('Image Var Resolved:', !!sandbox.window.SONG_MIN_KYU_2025_IMAGE);
}
