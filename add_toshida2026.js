const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YUSEI TOSHIDA 2026 (p238) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786115567416.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'toshida2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.TOSHIDA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. toshida2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p237Idx = mockCode.indexOf("id: 'p237'");
const altP237Idx = mockCode.indexOf('"id": "p237"');
const targetP237Idx = p237Idx !== -1 ? p237Idx : altP237Idx;

if (targetP237Idx === -1) {
  console.error("Could not find p237 in mockData.js!");
  process.exit(1);
}

const p237AvatarIdx = mockCode.indexOf("avatarUrl:", targetP237Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP237Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP237Idx);
const p237EndIdx = mockCode.indexOf("}", p237AvatarIdx);

mockCode = mockCode.substring(0, p237EndIdx + 1);

const toshida2026Obj = `,
  {
    id: 'p238',
    name: '土信田悠生(2026)',
    readingName: 'としだ・ゆうせい',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6200,
    maxOverall: 14425,
    baseStats: { shoot: 1176, pass: 932, dribble: 1122, defense: 908, physical: 1161, speed: 749 },
    detailStats: {
      shoot: { finishing: 395, power: 386, composure: 395 },
      pass: { shortPass: 313, longPass: 293, accuracy: 326 },
      dribble: { breakout: 349, keeping: 398, ballTouch: 375 },
      defense: { tackle: 308, interception: 307, marking: 293 },
      physical: { jumping: 416, contact: 395, stamina: 350 },
      speed: { running: 374, agility: 375 }
    },
    maxEnhanced: {
      overall: 14425,
      baseStats: { shoot: 2781, pass: 2465, dribble: 2703, defense: 2405, physical: 2742, speed: 1795 },
      detailStats: {
        shoot: { finishing: 930, power: 921, composure: 930 },
        pass: { shortPass: 824, longPass: 804, accuracy: 837 },
        dribble: { breakout: 872, keeping: 921, ballTouch: 910 },
        defense: { tackle: 807, interception: 806, marking: 792 },
        physical: { jumping: 939, contact: 930, stamina: 873 },
        speed: { running: 897, agility: 898 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '上空のスナイパー', rank: '銀', description: '発動条件：絶好調　/　冷静さ・ジャンプUP' },
      { name: '力強いフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・コンタクトUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += toshida2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p238 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('toshida2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/toshida2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p238Check = `  if (player.id === 'p238' || (player.name && (player.name.includes('土信田悠生') || player.name.includes('土信田') || player.name.includes('Yusei Toshida') || player.name.includes('Toshida')))) {\n    return window.TOSHIDA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p238'")) {
    const marker = "if (player.id === 'p237'";
    const altMarker = 'if (player.id === "p237"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p238Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p238 avatar resolver.');
    } else {
      console.warn('Could not find p237 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p238'")) {
    const marker = "if (player.id === 'p237'";
    const altMarker = 'if (player.id === "p237"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p238Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p238 avatar resolver.');
    } else {
      console.warn('Could not find p237 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p238 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p238');
console.log('6. Verification of p238:', p238 ? p238.name : 'MISSING');
if (p238) {
  console.log('   Overall:', p238.overall, '| MaxOverall:', p238.maxOverall);
  console.log('   Policy:', p238.policy, '| PlayStyle:', p238.playStyle, p238.playStyleLevel);
  console.log('   Nationality:', p238.nationality, '| Position:', p238.mainPosition);
  console.log('   Skill:', p238.skill.name);
  console.log('   Abilities:', p238.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.TOSHIDA_2026_IMAGE:', sandbox.window.TOSHIDA_2026_IMAGE ? 'LOADED' : 'MISSING');
