const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const imgSourcePath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b557aab-3ed9-41d7-bec3-1885de4003d1\\.user_uploaded\\media_1790137897591.png';
const imageJsPath = path.join(rootDir, 'src', 'data', 'leandroTrossard2026Image.js');
const mockPath = path.join(rootDir, 'src', 'data', 'mockData.js');
const indexPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');

console.log('--- Registering Leandro Trossard (p392) ---');

// 1. Create Image JS file
if (fs.existsSync(imgSourcePath)) {
  const imgBuffer = fs.readFileSync(imgSourcePath);
  const base64Str = imgBuffer.toString('base64');
  const imageJsContent = `window.LEANDRO_TROSSARD_2026_IMAGE = "data:image/png;base64,${base64Str}";\n`;
  fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
  console.log(`[1/5] Created ${imageJsPath} (${base64Str.length} base64 chars)`);
} else {
  console.error(`ERROR: Uploaded image file not found at ${imgSourcePath}`);
  process.exit(1);
}

// 2. Add player object to mockData.js
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p392Obj = `  {
    id: 'p392',
    name: 'レアンドロ・トロサール',
    readingName: 'れあんどろとろさーる',
    category: 'MF',
    mainPosition: 'LM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'ベルギー',
    policy: 'カウンター',
    playStyle: 'ドリブラーLM',
    playStyleLevel: 'Ⅲ',
    overall: 7216,
    maxOverall: 15459,
    baseStats: {
      shoot: 1357,
      pass: 1383,
      dribble: 1400,
      defense: 901,
      physical: 1115,
      speed: 891
    },
    detailStats: {
      shoot: { finishing: 458, power: 433, composure: 466 },
      pass: { shortPass: 474, longPass: 465, accuracy: 444 },
      dribble: { breakout: 466, keeping: 461, ballTouch: 473 },
      defense: { tackle: 266, interception: 330, marking: 305 },
      physical: { jumping: 338, contact: 352, stamina: 425 },
      speed: { running: 435, agility: 456 }
    },
    maxEnhanced: {
      overall: 15459,
      baseStats: {
        shoot: 2914,
        pass: 2952,
        dribble: 2993,
        defense: 2410,
        physical: 2660,
        speed: 1961
      },
      detailStats: {
        shoot: { finishing: 981, power: 944, composure: 989 },
        pass: { shortPass: 997, longPass: 988, accuracy: 967 },
        dribble: { breakout: 1001, keeping: 996, ballTouch: 996 },
        defense: { tackle: 777, interception: 829, marking: 804 },
        physical: { jumping: 849, contact: 863, stamina: 948 },
        speed: { running: 970, agility: 991 }
      }
    },
    playTendencies: {
      attack: 2,
      defense: -1,
      dribble: 2,
      shoot: 1,
      longShoot: 0,
      shortPass: 0,
      longPass: -1,
      throughPass: 0,
      cutIn: 1,
      keep: 1,
      delay: -1,
      rushOut: 1,
      feint: 2,
      press: 0
    },
    skill: {
      name: 'ジャックナイフ',
      rank: '銀',
      description: '発動エリア：前左右　/　発動条件：ドリブル時　/　突破力・キープ力UP　/　成功時に自身のシュート発生確率UP'
    },
    abilities: [
      {
        name: '俊敏なドリブラー',
        rank: '銀',
        description: '発動条件：好調　/　突破力・敏捷性UP'
      },
      {
        name: '懐の深いパサー',
        rank: '銀',
        description: '発動条件：絶好調　/　ショートパス・キープ力UP'
      },
      {
        name: '冷静なゲームメイク',
        rank: '銅',
        description: '発動条件：絶好調　/　冷静さ・ロングパスUP'
      }
    ],
    avatarUrl: ''
  }`;

// Slice before closing bracket of INITIAL_PLAYERS
const lastPlayerIdx = mockCode.indexOf("id: 'p391'");
if (lastPlayerIdx === -1) {
  console.error("ERROR: Could not find p391 in mockData.js");
  process.exit(1);
}

const lastAvatarIdx = mockCode.indexOf("avatarUrl:", lastPlayerIdx);
const lastEndIdx = mockCode.indexOf("}", lastAvatarIdx);

const newMockCode = mockCode.substring(0, lastEndIdx + 1) + ",\n" + p392Obj + mockCode.substring(lastEndIdx + 1);
fs.writeFileSync(mockPath, newMockCode, 'utf-8');
console.log(`[2/5] Updated ${mockPath} with player p392 (レアンドロ・トロサール)`);

// 3. Update index.html to include script link
let htmlCode = fs.readFileSync(indexPath, 'utf-8');
const scriptTag = '  <script src="./src/data/leandroTrossard2026Image.js"></script>\n';
if (!htmlCode.includes('leandroTrossard2026Image.js')) {
  const insertPos = htmlCode.indexOf('  <!-- 2. Official Special Training Cards');
  if (insertPos !== -1) {
    htmlCode = htmlCode.substring(0, insertPos) + scriptTag + htmlCode.substring(insertPos);
    fs.writeFileSync(indexPath, htmlCode, 'utf-8');
    console.log(`[3/5] Updated ${indexPath} with script link`);
  } else {
    console.warn("Could not find insertion marker in index.html");
  }
} else {
  console.log(`[3/5] index.html already contains leandroTrossard2026Image.js`);
}

// 4. Update PLAYER_IMAGE_MAP in src/app.js
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p392"')) {
  appJsCode = appJsCode.replace(
    '"p391":"CODY_GAKPO_2026_IMAGE"',
    '"p391":"CODY_GAKPO_2026_IMAGE","p392":"LEANDRO_TROSSARD_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log(`[4/5] Updated PLAYER_IMAGE_MAP in ${appJsPath}`);
} else {
  console.log(`[4/5] src/app.js already maps p392`);
}

// Update PLAYER_IMAGE_MAP in src/app.jsx if present
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes('"p392"')) {
    appJsxCode = appJsxCode.replace(
      '"p391":"CODY_GAKPO_2026_IMAGE"',
      '"p391":"CODY_GAKPO_2026_IMAGE","p392":"LEANDRO_TROSSARD_2026_IMAGE"'
    );
    fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');
    console.log(`[4.5/5] Updated PLAYER_IMAGE_MAP in ${appJsxPath}`);
  }
}

// 5. Verify mockData.js with Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(newMockCode, sandbox);

const addedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p392');
if (addedPlayer) {
  console.log(`[5/5] SUCCESS! Registered player ${addedPlayer.id}: ${addedPlayer.name} (${addedPlayer.nationality})`);
  console.log(`      Main Pos: ${addedPlayer.mainPosition}, Overall: ${addedPlayer.overall}, MaxOverall: ${addedPlayer.maxOverall}`);
} else {
  console.error("ERROR: Failed to find p392 after VM execution!");
  process.exit(1);
}
