const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING JEON BYEONG-GWAN 2026 (p224) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786112357421.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'jeonByeongGwan2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.JEON_BYEONG_GWAN_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. jeonByeongGwan2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p223Idx = mockCode.indexOf("id: 'p223'");
const altP223Idx = mockCode.indexOf('"id": "p223"');
const targetP223Idx = p223Idx !== -1 ? p223Idx : altP223Idx;

if (targetP223Idx === -1) {
  console.error("Could not find p223 in mockData.js!");
  process.exit(1);
}

const p223AvatarIdx = mockCode.indexOf("avatarUrl:", targetP223Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP223Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP223Idx);
const p223EndIdx = mockCode.indexOf("}", p223AvatarIdx);

mockCode = mockCode.substring(0, p223EndIdx + 1);

const jeonByeongGwan2026Obj = `,
  {
    id: 'p224',
    name: 'チョン・ビョングァン(2026)',
    readingName: 'ちょん・びょんぐぁん',
    category: 'FW',
    mainPosition: 'LW',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '韓国',
    policy: 'リアクション',
    playStyle: 'ドリブラーLW',
    playStyleLevel: 'Ⅱ',
    overall: 6152,
    maxOverall: 14356,
    baseStats: { shoot: 1066, pass: 1174, dribble: 1170, defense: 1045, physical: 1016, speed: 786 },
    detailStats: {
      shoot: { finishing: 371, power: 318, composure: 377 },
      pass: { shortPass: 398, longPass: 396, accuracy: 380 },
      dribble: { breakout: 392, keeping: 381, ballTouch: 397 },
      defense: { tackle: 319, interception: 375, marking: 351 },
      physical: { jumping: 318, contact: 265, stamina: 433 },
      speed: { running: 352, agility: 434 }
    },
    maxEnhanced: {
      overall: 14356,
      baseStats: { shoot: 2623, pass: 2743, dribble: 2763, defense: 2554, physical: 2561, speed: 1856 },
      detailStats: {
        shoot: { finishing: 894, power: 829, composure: 900 },
        pass: { shortPass: 921, longPass: 919, accuracy: 903 },
        dribble: { breakout: 927, keeping: 916, ballTouch: 920 },
        defense: { tackle: 830, interception: 874, marking: 850 },
        physical: { jumping: 829, contact: 776, stamina: 956 },
        speed: { running: 887, agility: 969 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 2, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: -1, throughPass: 0, cutIn: 1, keep: 1,
      delay: -1, rushOut: 1, feint: 2, press: 0
    },
    skill: { name: 'テクニカルドリブル', rank: '銅', description: '発動エリア：前左右・中左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '俊敏なパサー', rank: '銀', description: '発動条件：好調　/　ショートパス・敏捷性UP' },
      { name: '不屈のドリブル突破', rank: '銀', description: '発動条件：絶好調　/　突破力・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += jeonByeongGwan2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p224 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('jeonByeongGwan2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/jeonByeongGwan2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p224Check = `  if (player.id === 'p224' || (player.name && (player.name.includes('チョン・ビョングァン') || player.name.includes('ビョングァン') || player.name.includes('Jeon Byeong-Gwan') || player.name.includes('Byeong-Gwan')))) {\n    return window.JEON_BYEONG_GWAN_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p224'")) {
    const marker = "if (player.id === 'p223'";
    const altMarker = 'if (player.id === "p223"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p224Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p224 avatar resolver.');
    } else {
      console.warn('Could not find p223 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p224'")) {
    const marker = "if (player.id === 'p223'";
    const altMarker = 'if (player.id === "p223"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p224Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p224 avatar resolver.');
    } else {
      console.warn('Could not find p223 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p224 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p224');
console.log('6. Verification of p224:', p224 ? p224.name : 'MISSING');
if (p224) {
  console.log('   Overall:', p224.overall, '| MaxOverall:', p224.maxOverall);
  console.log('   Policy:', p224.policy, '| PlayStyle:', p224.playStyle, p224.playStyleLevel);
  console.log('   Nationality:', p224.nationality, '| Position:', p224.mainPosition);
  console.log('   Skill:', p224.skill.name);
  console.log('   Abilities:', p224.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.JEON_BYEONG_GWAN_2026_IMAGE:', sandbox.window.JEON_BYEONG_GWAN_2026_IMAGE ? 'LOADED' : 'MISSING');
