const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING YAGO CARIELLO 2026 (p232) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\30d7f0d1-9473-434c-80bc-71d83c6d7758\\media__1786114113395.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'yagoCariello2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.YAGO_CARIELLO_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. yagoCariello2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p231Idx = mockCode.indexOf("id: 'p231'");
const altP231Idx = mockCode.indexOf('"id": "p231"');
const targetP231Idx = p231Idx !== -1 ? p231Idx : altP231Idx;

if (targetP231Idx === -1) {
  console.error("Could not find p231 in mockData.js!");
  process.exit(1);
}

const p231AvatarIdx = mockCode.indexOf("avatarUrl:", targetP231Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP231Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP231Idx);
const p231EndIdx = mockCode.indexOf("}", p231AvatarIdx);

mockCode = mockCode.substring(0, p231EndIdx + 1);

const yagoCariello2026Obj = `,
  {
    id: 'p232',
    name: 'ヤゴ・カリエッロ(2026)',
    readingName: 'やご・かりえっろ',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'ポゼッション',
    playStyle: 'ポストプレーヤー',
    playStyleLevel: 'Ⅱ',
    overall: 6342,
    maxOverall: 14574,
    baseStats: { shoot: 1124, pass: 1118, dribble: 1137, defense: 991, physical: 1245, speed: 792 },
    detailStats: {
      shoot: { finishing: 367, power: 388, composure: 369 },
      pass: { shortPass: 375, longPass: 371, accuracy: 372 },
      dribble: { breakout: 383, keeping: 384, ballTouch: 370 },
      defense: { tackle: 330, interception: 334, marking: 327 },
      physical: { jumping: 457, contact: 433, stamina: 355 },
      speed: { running: 392, agility: 400 }
    },
    maxEnhanced: {
      overall: 14574,
      baseStats: { shoot: 2729, pass: 2651, dribble: 2718, defense: 2488, physical: 2826, speed: 1838 },
      detailStats: {
        shoot: { finishing: 902, power: 923, composure: 904 },
        pass: { shortPass: 886, longPass: 882, accuracy: 883 },
        dribble: { breakout: 906, keeping: 907, ballTouch: 905 },
        defense: { tackle: 829, interception: 833, marking: 826 },
        physical: { jumping: 980, contact: 968, stamina: 878 },
        speed: { running: 915, agility: 923 }
      }
    },
    playTendencies: {
      attack: 1, defense: -1, dribble: 0, shoot: 1, longShoot: 1,
      shortPass: 1, longPass: -1, throughPass: 1, cutIn: 0, keep: 2,
      delay: -1, rushOut: -1, feint: 0, press: 0
    },
    skill: { name: '狙いすましたシュート', rank: '銅', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '強靭な脚力', rank: '銀', description: '発動条件：絶好調　/　キック力・ジャンプUP' },
      { name: 'ムービングターゲット', rank: '銀', description: '発動条件：絶好調　/　キープ力・走力UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += yagoCariello2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p232 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('yagoCariello2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/yagoCariello2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p232Check = `  if (player.id === 'p232' || (player.name && (player.name.includes('ヤゴ・カリエッロ') || player.name.includes('カリエッロ') || player.name.includes('Yago Cariello') || player.name.includes('Cariello')))) {\n    return window.YAGO_CARIELLO_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p232'")) {
    const marker = "if (player.id === 'p231'";
    const altMarker = 'if (player.id === "p231"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p232Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p232 avatar resolver.');
    } else {
      console.warn('Could not find p231 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p232'")) {
    const marker = "if (player.id === 'p231'";
    const altMarker = 'if (player.id === "p231"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p232Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p232 avatar resolver.');
    } else {
      console.warn('Could not find p231 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p232 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p232');
console.log('6. Verification of p232:', p232 ? p232.name : 'MISSING');
if (p232) {
  console.log('   Overall:', p232.overall, '| MaxOverall:', p232.maxOverall);
  console.log('   Policy:', p232.policy, '| PlayStyle:', p232.playStyle, p232.playStyleLevel);
  console.log('   Nationality:', p232.nationality, '| Position:', p232.mainPosition);
  console.log('   Skill:', p232.skill.name);
  console.log('   Abilities:', p232.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.YAGO_CARIELLO_2026_IMAGE:', sandbox.window.YAGO_CARIELLO_2026_IMAGE ? 'LOADED' : 'MISSING');
