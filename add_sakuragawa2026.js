const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SOLOMON SAKURAGAWA 2026 (p237) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786115389433.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'sakuragawa2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.SAKURAGAWA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. sakuragawa2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p236Idx = mockCode.indexOf("id: 'p236'");
const altP236Idx = mockCode.indexOf('"id": "p236"');
const targetP236Idx = p236Idx !== -1 ? p236Idx : altP236Idx;

if (targetP236Idx === -1) {
  console.error("Could not find p236 in mockData.js!");
  process.exit(1);
}

const p236AvatarIdx = mockCode.indexOf("avatarUrl:", targetP236Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP236Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP236Idx);
const p236EndIdx = mockCode.indexOf("}", p236AvatarIdx);

mockCode = mockCode.substring(0, p236EndIdx + 1);

const sakuragawa2026Obj = `,
  {
    id: 'p237',
    name: '櫻川ソロモン(2026)',
    readingName: 'さくらがわ・そろもん',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: '日本',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6244,
    maxOverall: 14470,
    baseStats: { shoot: 1076, pass: 974, dribble: 1231, defense: 856, physical: 1194, speed: 759 },
    detailStats: {
      shoot: { finishing: 370, power: 361, composure: 345 },
      pass: { shortPass: 376, longPass: 319, accuracy: 279 },
      dribble: { breakout: 387, keeping: 428, ballTouch: 416 },
      defense: { tackle: 314, interception: 275, marking: 267 },
      physical: { jumping: 392, contact: 451, stamina: 351 },
      speed: { running: 358, agility: 401 }
    },
    maxEnhanced: {
      overall: 14470,
      baseStats: { shoot: 2681, pass: 2507, dribble: 2812, defense: 2353, physical: 2775, speed: 1805 },
      detailStats: {
        shoot: { finishing: 905, power: 896, composure: 880 },
        pass: { shortPass: 887, longPass: 830, accuracy: 790 },
        dribble: { breakout: 910, keeping: 951, ballTouch: 951 },
        defense: { tackle: 813, interception: 774, marking: 766 },
        physical: { jumping: 915, contact: 986, stamina: 874 },
        speed: { running: 881, agility: 924 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '絶妙なトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力UP　/　成功時に自身のシュート発生確率UP' },
    abilities: [
      { name: '剛柔のタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・コンタクトUP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += sakuragawa2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p237 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('sakuragawa2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/sakuragawa2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p237Check = `  if (player.id === 'p237' || (player.name && (player.name.includes('櫻川ソロモン') || player.name.includes('櫻川') || player.name.includes('ソロモン') || player.name.includes('Solomon Sakuragawa') || player.name.includes('Sakuragawa')))) {\n    return window.SAKURAGAWA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p237'")) {
    const marker = "if (player.id === 'p236'";
    const altMarker = 'if (player.id === "p236"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p237Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p237 avatar resolver.');
    } else {
      console.warn('Could not find p236 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p237'")) {
    const marker = "if (player.id === 'p236'";
    const altMarker = 'if (player.id === "p236"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p237Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p237 avatar resolver.');
    } else {
      console.warn('Could not find p236 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p237 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p237');
console.log('6. Verification of p237:', p237 ? p237.name : 'MISSING');
if (p237) {
  console.log('   Overall:', p237.overall, '| MaxOverall:', p237.maxOverall);
  console.log('   Policy:', p237.policy, '| PlayStyle:', p237.playStyle, p237.playStyleLevel);
  console.log('   Nationality:', p237.nationality, '| Position:', p237.mainPosition);
  console.log('   Skill:', p237.skill.name);
  console.log('   Abilities:', p237.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.SAKURAGAWA_2026_IMAGE:', sandbox.window.SAKURAGAWA_2026_IMAGE ? 'LOADED' : 'MISSING');
