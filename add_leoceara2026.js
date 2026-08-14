const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING LEO CEARA 2026 TS (p263) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b7f3f66-5a3c-4666-88d6-639d6217234d\\media__1786508490868.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'leoCeara2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.LEO_CEARA_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. leoCeara2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p262Idx = mockCode.indexOf("id: 'p262'");
const altP262Idx = mockCode.indexOf('"id": "p262"');
const targetP262Idx = p262Idx !== -1 ? p262Idx : altP262Idx;

if (targetP262Idx === -1) {
  console.error("Could not find p262 in mockData.js!");
  process.exit(1);
}

const p262AvatarIdx = mockCode.indexOf("avatarUrl:", targetP262Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP262Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP262Idx);
const p262EndIdx = mockCode.indexOf("}", p262AvatarIdx);

mockCode = mockCode.substring(0, p262EndIdx + 1);

const leoCeara2026Obj = `,
  {
    id: 'p263',
    name: 'レオ・セアラ(2026TS)',
    readingName: 'れお・せあら',
    category: 'FW',
    mainPosition: 'CF',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ブラジル',
    policy: 'リアクション',
    playStyle: 'ラインブレーカー',
    playStyleLevel: 'Ⅲ',
    overall: 7045,
    maxOverall: 15280,
    baseStats: { shoot: 1376, pass: 1072, dribble: 1233, defense: 929, physical: 1266, speed: 889 },
    detailStats: {
      shoot: { finishing: 473, power: 453, composure: 450 },
      pass: { shortPass: 369, longPass: 353, accuracy: 350 },
      dribble: { breakout: 393, keeping: 421, ballTouch: 419 },
      defense: { tackle: 315, interception: 315, marking: 299 },
      physical: { jumping: 409, contact: 429, stamina: 428 },
      speed: { running: 438, agility: 451 }
    },
    maxEnhanced: {
      overall: 15280,
      baseStats: { shoot: 2981, pass: 2605, dribble: 2814, defense: 2426, physical: 2847, speed: 1935 },
      detailStats: {
        shoot: { finishing: 1008, power: 988, composure: 985 },
        pass: { shortPass: 880, longPass: 864, accuracy: 861 },
        dribble: { breakout: 916, keeping: 944, ballTouch: 954 },
        defense: { tackle: 814, interception: 814, marking: 798 },
        physical: { jumping: 932, contact: 964, stamina: 951 },
        speed: { running: 961, agility: 974 }
      }
    },
    playTendencies: {
      attack: 2, defense: -1, dribble: 0, shoot: 2, longShoot: 1,
      shortPass: -1, longPass: -1, throughPass: -1, cutIn: 0, keep: -1,
      delay: -1, rushOut: 2, feint: 0, press: 0
    },
    skill: { name: 'アンストッパブルショット', rank: '金', description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・キック力・冷静さUP' },
    abilities: [
      { name: '冷静なフィニッシュ', rank: '銀', description: '発動条件：好調　/　決定力・冷静さUP' },
      { name: 'パワフルキッカー', rank: '銀', description: '発動条件：絶好調　/　キック力・コンタクトUP' },
      { name: 'ノンストップジャンパー', rank: '銅', description: '発動条件：途中出場　/　ジャンプ・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += leoCeara2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p263 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('leoCeara2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/leoCeara2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p263Check = `  if (player.id === 'p263' || (player.name && (player.name.includes('レオ・セアラ') || player.name.includes('Leo Ceara') || player.name.includes('LeoCeara')))) {\n    return window.LEO_CEARA_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p263'")) {
    const marker = "if (player.id === 'p262'";
    const altMarker = 'if (player.id === "p262"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p263Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p263 avatar resolver.');
    } else {
      console.warn('Could not find p262 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p263'")) {
    const marker = "if (player.id === 'p262'";
    const altMarker = 'if (player.id === "p262"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p263Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p263 avatar resolver.');
    } else {
      console.warn('Could not find p262 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p263 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p263');
console.log('6. Verification of p263:', p263 ? p263.name : 'MISSING');
if (p263) {
  console.log('   Overall:', p263.overall, '| MaxOverall:', p263.maxOverall);
  console.log('   Policy:', p263.policy, '| PlayStyle:', p263.playStyle, p263.playStyleLevel);
  console.log('   Nationality:', p263.nationality, '| Position:', p263.mainPosition);
  console.log('   Skill:', p263.skill.name);
  console.log('   Abilities:', p263.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.LEO_CEARA_2026_IMAGE:', sandbox.window.LEO_CEARA_2026_IMAGE ? 'LOADED' : 'MISSING');
