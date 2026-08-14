const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING ERLING HAALAND GIFT 2026 (p259) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786119480658.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'haalandGift2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.HAALAND_GIFT_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. haalandGift2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p258Idx = mockCode.indexOf("id: 'p258'");
const altP258Idx = mockCode.indexOf('"id": "p258"');
const targetP258Idx = p258Idx !== -1 ? p258Idx : altP258Idx;

if (targetP258Idx === -1) {
  console.error("Could not find p258 in mockData.js!");
  process.exit(1);
}

const p258AvatarIdx = mockCode.indexOf("avatarUrl:", targetP258Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP258Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP258Idx);
const p258EndIdx = mockCode.indexOf("}", p258AvatarIdx);

mockCode = mockCode.substring(0, p258EndIdx + 1);

const haalandGift2026Obj = `,
  {
    id: 'p259',
    name: 'アーリング・ハーランド(配布)',
    readingName: 'あーりんぐ・はーらんど',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ノルウェー',
    policy: 'ムービング',
    playStyle: 'ストライカー',
    playStyleLevel: 'Ⅱ',
    overall: 6748,
    maxOverall: 9698,
    baseStats: { shoot: 1363, pass: 991, dribble: 1319, defense: 766, physical: 1301, speed: 898 },
    detailStats: {
      shoot: { finishing: 463, power: 463, composure: 437 },
      pass: { shortPass: 349, longPass: 297, accuracy: 345 },
      dribble: { breakout: 452, keeping: 440, ballTouch: 427 },
      defense: { tackle: 307, interception: 238, marking: 221 },
      physical: { jumping: 448, contact: 462, stamina: 391 },
      speed: { running: 474, agility: 424 }
    },
    maxEnhanced: {
      overall: 9698,
      baseStats: { shoot: 1903, pass: 1531, dribble: 1859, defense: 1306, physical: 1841, speed: 1258 },
      detailStats: {
        shoot: { finishing: 643, power: 643, composure: 617 },
        pass: { shortPass: 529, longPass: 477, accuracy: 525 },
        dribble: { breakout: 632, keeping: 620, ballTouch: 607 },
        defense: { tackle: 487, interception: 418, marking: 401 },
        physical: { jumping: 628, contact: 642, stamina: 571 },
        speed: { running: 654, agility: 604 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 0,
      shortPass: 0, longPass: 0, throughPass: 0, cutIn: 0, keep: 0,
      delay: -1, rushOut: 0, feint: 0, press: -1
    },
    skill: { name: '点で合わせるシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '力強いフィニッシュ', rank: '銀', description: '相手DFのプレッシャーを物ともせず強烈なシュートを叩き込む' },
      { name: 'アジャイルキッカー', rank: '銀', description: '発動条件：途中出場　/　キック力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += haalandGift2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p259 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('haalandGift2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/haalandGift2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p259Check = `  if (player.id === 'p259' || (player.name && (player.name.includes('ハーランド(配布)') || player.name.includes('アーリング・ハーランド(配布)') || player.name.includes('Haaland (Gift)')))) {\n    return window.HAALAND_GIFT_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p259'")) {
    const marker = "if (player.id === 'p258'";
    const altMarker = 'if (player.id === "p258"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p259Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p259 avatar resolver.');
    } else {
      console.warn('Could not find p258 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p259'")) {
    const marker = "if (player.id === 'p258'";
    const altMarker = 'if (player.id === "p258"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p259Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p259 avatar resolver.');
    } else {
      console.warn('Could not find p258 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p259 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p259');
console.log('6. Verification of p259:', p259 ? p259.name : 'MISSING');
if (p259) {
  console.log('   Overall:', p259.overall, '| MaxOverall:', p259.maxOverall);
  console.log('   Policy:', p259.policy, '| PlayStyle:', p259.playStyle, p259.playStyleLevel);
  console.log('   Nationality:', p259.nationality, '| Position:', p259.mainPosition);
  console.log('   Skill:', p259.skill.name);
  console.log('   Abilities:', p259.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.HAALAND_GIFT_2026_IMAGE:', sandbox.window.HAALAND_GIFT_2026_IMAGE ? 'LOADED' : 'MISSING');
