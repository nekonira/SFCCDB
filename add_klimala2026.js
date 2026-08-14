const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING PATRYK KLIMALA 2026 (p253) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786118195770.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'klimala2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.KLIMALA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. klimala2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p252Idx = mockCode.indexOf("id: 'p252'");
const altP252Idx = mockCode.indexOf('"id": "p252"');
const targetP252Idx = p252Idx !== -1 ? p252Idx : altP252Idx;

if (targetP252Idx === -1) {
  console.error("Could not find p252 in mockData.js!");
  process.exit(1);
}

const p252AvatarIdx = mockCode.indexOf("avatarUrl:", targetP252Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP252Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP252Idx);
const p252EndIdx = mockCode.indexOf("}", p252AvatarIdx);

mockCode = mockCode.substring(0, p252EndIdx + 1);

const klimala2026Obj = `,
  {
    id: 'p253',
    name: 'パトリク・クリマラ(2026)',
    readingName: 'ぱとりく・くりまら',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポーランド',
    policy: 'ムービング',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅱ',
    overall: 6330,
    maxOverall: 14539,
    baseStats: { shoot: 1094, pass: 1089, dribble: 1266, defense: 807, physical: 1187, speed: 875 },
    detailStats: {
      shoot: { finishing: 364, power: 360, composure: 370 },
      pass: { shortPass: 369, longPass: 360, accuracy: 360 },
      dribble: { breakout: 419, keeping: 430, ballTouch: 417 },
      defense: { tackle: 296, interception: 274, marking: 237 },
      physical: { jumping: 388, contact: 374, stamina: 425 },
      speed: { running: 449, agility: 426 }
    },
    maxEnhanced: {
      overall: 14539,
      baseStats: { shoot: 2699, pass: 2622, dribble: 2847, defense: 2304, physical: 2768, speed: 1921 },
      detailStats: {
        shoot: { finishing: 899, power: 895, composure: 905 },
        pass: { shortPass: 880, longPass: 871, accuracy: 871 },
        dribble: { breakout: 942, keeping: 953, ballTouch: 952 },
        defense: { tackle: 795, interception: 773, marking: 736 },
        physical: { jumping: 911, contact: 909, stamina: 948 },
        speed: { running: 972, agility: 949 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'コントロールトラップ', rank: '銅', description: '発動エリア：前中・中中　/　発動条件：トラップ時　/　ボールタッチ・キープ力・コンタクトUP　/　成功時に自身のショートパス発生確率UP' },
    abilities: [
      { name: '高速のボールタッチ', rank: '銀', description: '発動条件：好調　/　ボールタッチ・走力UP' },
      { name: 'アジャイルターゲット', rank: '銀', description: '発動条件：途中出場　/　キープ力・敏捷性UP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += klimala2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p253 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('klimala2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/klimala2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p253Check = `  if (player.id === 'p253' || (player.name && (player.name.includes('パトリク・クリマラ') || player.name.includes('クリマラ') || player.name.includes('Patryk Klimala') || player.name.includes('Klimala')))) {\n    return window.KLIMALA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p253'")) {
    const marker = "if (player.id === 'p252'";
    const altMarker = 'if (player.id === "p252"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p253Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p253 avatar resolver.');
    } else {
      console.warn('Could not find p252 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p253'")) {
    const marker = "if (player.id === 'p252'";
    const altMarker = 'if (player.id === "p252"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p253Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p253 avatar resolver.');
    } else {
      console.warn('Could not find p252 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p253 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p253');
console.log('6. Verification of p253:', p253 ? p253.name : 'MISSING');
if (p253) {
  console.log('   Overall:', p253.overall, '| MaxOverall:', p253.maxOverall);
  console.log('   Policy:', p253.policy, '| PlayStyle:', p253.playStyle, p253.playStyleLevel);
  console.log('   Nationality:', p253.nationality, '| Position:', p253.mainPosition);
  console.log('   Skill:', p253.skill.name);
  console.log('   Abilities:', p253.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.KLIMALA_2026_IMAGE:', sandbox.window.KLIMALA_2026_IMAGE ? 'LOADED' : 'MISSING');
