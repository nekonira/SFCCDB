const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RYOMA KIDA 2026 (p228) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786113308906.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'kida2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KIDA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. kida2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p227Idx = mockCode.indexOf("id: 'p227'");
const altP227Idx = mockCode.indexOf('"id": "p227"');
const targetP227Idx = p227Idx !== -1 ? p227Idx : altP227Idx;

if (targetP227Idx === -1) {
  console.error("Could not find p227 in mockData.js!");
  process.exit(1);
}

const p227AvatarIdx = mockCode.indexOf("avatarUrl:", targetP227Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP227Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP227Idx);
const p227EndIdx = mockCode.indexOf("}", p227AvatarIdx);

mockCode = mockCode.substring(0, p227EndIdx + 1);

const kida2026Obj = `,
  {
    id: 'p228',
    name: '氣田亮真(2026)',
    readingName: 'きだりょうま',
    category: 'FW',
    mainPosition: 'RW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ドリブラーRW',
    playStyleLevel: 'Ⅱ',
    overall: 6196,
    maxOverall: 14423,
    baseStats: { shoot: 966, pass: 1144, dribble: 1148, defense: 1055, physical: 946, speed: 867 },
    detailStats: {
      shoot: { finishing: 325, power: 309, composure: 332 },
      pass: { shortPass: 392, longPass: 400, accuracy: 352 },
      dribble: { breakout: 410, keeping: 359, ballTouch: 379 },
      defense: { tackle: 360, interception: 348, marking: 347 },
      physical: { jumping: 316, contact: 274, stamina: 356 },
      speed: { running: 404, agility: 463 }
    },
    maxEnhanced: {
      overall: 14423,
      baseStats: { shoot: 2523, pass: 2713, dribble: 2741, defense: 2564, physical: 2491, speed: 1937 },
      detailStats: {
        shoot: { finishing: 848, power: 820, composure: 855 },
        pass: { shortPass: 915, longPass: 923, accuracy: 875 },
        dribble: { breakout: 945, keeping: 894, ballTouch: 902 },
        defense: { tackle: 871, interception: 847, marking: 846 },
        physical: { jumping: 827, contact: 785, stamina: 879 },
        speed: { running: 939, agility: 998 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: 'スピードランナー', rank: '銀', description: '圧巻のスピードでサイドを駆け抜け相手ディフェンスを置き去りにする' },
      { name: 'すり抜けるロングパサー', rank: '銀', description: '相手の頭上や脇をすり抜ける正確なロングパスを供給する' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += kida2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p228 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('kida2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/kida2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p228Check = `  if (player.id === 'p228' || (player.name && (player.name.includes('氣田亮真') || player.name.includes('氣田') || player.name.includes('Ryoma Kida') || player.name.includes('Kida')))) {\n    return window.KIDA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p228'")) {
    const marker = "if (player.id === 'p227'";
    const altMarker = 'if (player.id === "p227"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p228Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p228 avatar resolver.');
    } else {
      console.warn('Could not find p227 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p228'")) {
    const marker = "if (player.id === 'p227'";
    const altMarker = 'if (player.id === "p227"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p228Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p228 avatar resolver.');
    } else {
      console.warn('Could not find p227 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p228 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p228');
console.log('6. Verification of p228:', p228 ? p228.name : 'MISSING');
if (p228) {
  console.log('   Overall:', p228.overall, '| MaxOverall:', p228.maxOverall);
  console.log('   Policy:', p228.policy, '| PlayStyle:', p228.playStyle, p228.playStyleLevel);
  console.log('   Nationality:', p228.nationality, '| Position:', p228.mainPosition);
  console.log('   Skill:', p228.skill.name);
  console.log('   Abilities:', p228.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KIDA_2026_IMAGE:', sandbox.window.KIDA_2026_IMAGE ? 'LOADED' : 'MISSING');
