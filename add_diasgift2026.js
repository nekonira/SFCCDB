const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING RÚBEN DÍAS GIFT 2026 (p260) ===');

// 1. Image Conversion to Base64 JS
const imagePath = "C:/Users/nekon/.gemini/antigravity-ide/brain/30d7f0d1-9473-434c-80bc-71d83c6d7758/media__1786120863354.png";
const imageJsPath = path.join(__dirname, 'src', 'data', 'diasGift2026Image.js');

const bytes = fs.readFileSync(imagePath);
const base64 = bytes.toString('base64');
const dataUrl = `data:image/png;base64,${base64}`;
const imageJsContent = `window.DIAS_GIFT_2026_IMAGE = ${JSON.stringify(dataUrl)};\n`;

fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
console.log('1. diasGift2026Image.js created. Size:', fs.statSync(imageJsPath).size);

// 2. Add to mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p259Idx = mockCode.indexOf("id: 'p259'");
const altP259Idx = mockCode.indexOf('"id": "p259"');
const targetP259Idx = p259Idx !== -1 ? p259Idx : altP259Idx;

if (targetP259Idx === -1) {
  console.error("Could not find p259 in mockData.js!");
  process.exit(1);
}

const p259AvatarIdx = mockCode.indexOf("avatarUrl:", targetP259Idx) !== -1 
  ? mockCode.indexOf("avatarUrl:", targetP259Idx) 
  : mockCode.indexOf('"avatarUrl":', targetP259Idx);
const p259EndIdx = mockCode.indexOf("}", p259AvatarIdx);

mockCode = mockCode.substring(0, p259EndIdx + 1);

const diasGift2026Obj = `,
  {
    id: 'p260',
    name: 'ルベン・ディアス(配布)',
    readingName: 'るべん・でぃあす',
    category: 'DF',
    mainPosition: 'CB',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ポルトガル',
    policy: 'ムービング',
    playStyle: 'ストッパー',
    playStyleLevel: 'Ⅱ',
    overall: 6719,
    maxOverall: 12161,
    baseStats: { shoot: 891, pass: 1151, dribble: 1174, defense: 1392, physical: 1369, speed: 761 },
    detailStats: {
      shoot: { finishing: 255, power: 333, composure: 303 },
      pass: { shortPass: 394, longPass: 391, accuracy: 366 },
      dribble: { breakout: 378, keeping: 385, ballTouch: 411 },
      defense: { tackle: 464, interception: 464, marking: 464 },
      physical: { jumping: 442, contact: 450, stamina: 477 },
      speed: { running: 373, agility: 388 }
    },
    maxEnhanced: {
      overall: 12161,
      baseStats: { shoot: 1848, pass: 1820, dribble: 2167, defense: 2457, physical: 2422, speed: 1447 },
      detailStats: {
        shoot: { finishing: 574, power: 652, composure: 622 },
        pass: { shortPass: 737, longPass: 374, accuracy: 709 },
        dribble: { breakout: 709, keeping: 716, ballTouch: 742 },
        defense: { tackle: 819, interception: 819, marking: 819 },
        physical: { jumping: 797, contact: 805, stamina: 820 },
        speed: { running: 716, agility: 731 }
      }
    },
    playTendencies: {
      attack: -1, defense: 1, dribble: -1, shoot: -1, longShoot: -1,
      shortPass: 0, longPass: 0, throughPass: -1, cutIn: -1, keep: -1,
      delay: 0, rushOut: -1, feint: -1, press: 1
    },
    skill: { name: '鋭角的なタックル', rank: '銅', description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP' },
    abilities: [
      { name: 'ピッチの掃除屋', rank: '銀', description: '発動条件：好調　/　タックル・スタミナUP' },
      { name: 'ピッチの分断者', rank: '銅', description: '発動条件：絶好調　/　パスカット・スタミナUP' }
    ],
    avatarUrl: ''
  }
];

window.SAKATSUKU_DATA = { INITIAL_PLAYERS: window.INITIAL_PLAYERS, POSITIONS: ['CF', 'ST', 'LW', 'RW', 'OMF', 'CMF', 'DMF', 'LFB', 'RFB', 'CB', 'GK'], POLICIES: ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'], RARITIES: ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'], PLAY_STYLE_LEVELS: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ'], PLAY_STYLES: ['ストライカー', 'ラインブレーカー', 'サイドアタッカー', 'ターゲットマン', 'チャンスメーカー', 'アタッカー', '司令塔', 'ハードタッカー', 'セントラルMF', 'パサーDM', '潰し屋', 'クロサー', '攻撃的SB', '守備的SB', 'オーソドックスGK', 'スイーパーGK'] };
`;

mockCode += diasGift2026Obj;
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log('2. mockData.js updated with p260 in UTF-8.');

// 3. Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');

if (!indexContent.includes('diasGift2026Image.js')) {
  indexContent = indexContent.replace(
    '<!-- 1. Player Photos (174 Image Files) -->',
    '<!-- 1. Player Photos (174 Image Files) -->\n  <script src="./src/data/diasGift2026Image.js"></script>'
  );
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('3. index.html updated with script tag.');
}

// 4. Update src/app.js & src/app.jsx
const p260Check = `  if (player.id === 'p260' || (player.name && (player.name.includes('ルベン・ディアス') || player.name.includes('Ruben Dias')))) {\n    return window.DIAS_GIFT_2026_IMAGE || player.avatarUrl || '';\n  }`;

const appJsPath = path.join(__dirname, 'src', 'app.js');
if (fs.existsSync(appJsPath)) {
  let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
  if (!appJsCode.includes("player.id === 'p260'")) {
    const marker = "if (player.id === 'p259'";
    const altMarker = 'if (player.id === "p259"';
    const activeMarker = appJsCode.includes(marker) ? marker : (appJsCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsCode.indexOf(activeMarker);
      const endIdx = appJsCode.indexOf('}', idx) + 1;
      const partBefore = appJsCode.substring(0, endIdx);
      const partAfter = appJsCode.substring(endIdx);
      appJsCode = partBefore + '\n' + p260Check + partAfter;
      fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
      console.log('4. src/app.js updated with p260 avatar resolver.');
    } else {
      console.warn('Could not find p259 marker in src/app.js');
    }
  }
}

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes("player.id === 'p260'")) {
    const marker = "if (player.id === 'p259'";
    const altMarker = 'if (player.id === "p259"';
    const activeMarker = appJsxCode.includes(marker) ? marker : (appJsxCode.includes(altMarker) ? altMarker : null);
    
    if (activeMarker) {
      const idx = appJsxCode.indexOf(activeMarker);
      const endIdx = appJsxCode.indexOf('}', idx) + 1;
      const partBefore = appJsxCode.substring(0, endIdx);
      const partAfter = appJsxCode.substring(endIdx);
      appJsxCode = partBefore + '\n' + p260Check + partAfter;
      fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
      console.log('5. src/app.jsx updated with p260 avatar resolver.');
    } else {
      console.warn('Could not find p259 marker in src/app.jsx');
    }
  }
}

// 5. Verification
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(mockCode, sandbox);
const p260 = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p260');
console.log('6. Verification of p260:', p260 ? p260.name : 'MISSING');
if (p260) {
  console.log('   Overall:', p260.overall, '| MaxOverall:', p260.maxOverall);
  console.log('   Policy:', p260.policy, '| PlayStyle:', p260.playStyle, p260.playStyleLevel);
  console.log('   Nationality:', p260.nationality, '| Position:', p260.mainPosition);
  console.log('   Skill:', p260.skill.name);
  console.log('   Abilities:', p260.abilities.map(a => a.name).join(', '));
}

const imageCode = fs.readFileSync(imageJsPath, 'utf-8');
vm.runInContext(imageCode, sandbox);
console.log('7. Verification of window.DIAS_GIFT_2026_IMAGE:', sandbox.window.DIAS_GIFT_2026_IMAGE ? 'LOADED' : 'MISSING');
