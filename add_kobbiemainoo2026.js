const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = __dirname;
const imgSourcePath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\3b557aab-3ed9-41d7-bec3-1885de4003d1\\.user_uploaded\\media_1790138302347.png';
const imageJsPath = path.join(rootDir, 'src', 'data', 'kobbieMainoo2026Image.js');
const mockPath = path.join(rootDir, 'src', 'data', 'mockData.js');
const indexPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');

console.log('--- Registering Kobbie Mainoo (p393) ---');

// 1. Create Image JS file
if (fs.existsSync(imgSourcePath)) {
  const imgBuffer = fs.readFileSync(imgSourcePath);
  const base64Str = imgBuffer.toString('base64');
  const imageJsContent = `window.KOBBIE_MAINOO_2026_IMAGE = "data:image/png;base64,${base64Str}";\n`;
  fs.writeFileSync(imageJsPath, imageJsContent, 'utf-8');
  console.log(`[1/5] Created ${imageJsPath} (${base64Str.length} base64 chars)`);
} else {
  console.error(`ERROR: Uploaded image file not found at ${imgSourcePath}`);
  process.exit(1);
}

// 2. Add player object to mockData.js
let mockCode = fs.readFileSync(mockPath, 'utf-8');

const p393Obj = `  {
    id: 'p393',
    name: 'コビー・メイヌー',
    readingName: 'こびーめいぬー',
    category: 'MF',
    mainPosition: 'DM',
    subPositions: [],
    rarity: '☆3',
    baseRarity: '☆3',
    nationality: 'イングランド',
    policy: 'ムービング',
    playStyle: 'セントラルDM',
    playStyleLevel: 'Ⅱ',
    overall: 6954,
    maxOverall: 15114,
    baseStats: {
      shoot: 1053,
      pass: 1204,
      dribble: 1354,
      defense: 1303,
      physical: 1256,
      speed: 841
    },
    detailStats: {
      shoot: { finishing: 351, power: 362, composure: 340 },
      pass: { shortPass: 396, longPass: 393, accuracy: 415 },
      dribble: { breakout: 451, keeping: 443, ballTouch: 460 },
      defense: { tackle: 432, interception: 463, marking: 408 },
      physical: { jumping: 356, contact: 438, stamina: 462 },
      speed: { running: 407, agility: 434 }
    },
    maxEnhanced: {
      overall: 15114,
      baseStats: {
        shoot: 2598,
        pass: 2809,
        dribble: 2887,
        defense: 2884,
        physical: 2825,
        speed: 1863
      },
      detailStats: {
        shoot: { finishing: 862, power: 873, composure: 863 },
        pass: { shortPass: 931, longPass: 928, accuracy: 950 },
        dribble: { breakout: 962, keeping: 954, ballTouch: 971 },
        defense: { tackle: 967, interception: 986, marking: 931 },
        physical: { jumping: 867, contact: 961, stamina: 997 },
        speed: { running: 918, agility: 945 }
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
      name: 'チェーンカッター',
      rank: '銀',
      description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP'
    },
    abilities: [
      {
        name: 'ピッチの分断者',
        rank: '銀',
        description: '発動条件：絶好調　/　パスカット・スタミナUP'
      },
      {
        name: '華麗なボール奪取',
        rank: '銀',
        description: '発動条件：途中出場　/　ボールタッチ・タックルUP'
      }
    ],
    avatarUrl: ''
  }`;

// Slice before closing bracket of INITIAL_PLAYERS
const lastPlayerIdx = mockCode.indexOf("id: 'p392'");
if (lastPlayerIdx === -1) {
  console.error("ERROR: Could not find p392 in mockData.js");
  process.exit(1);
}

const lastAvatarIdx = mockCode.indexOf("avatarUrl:", lastPlayerIdx);
const lastEndIdx = mockCode.indexOf("}", lastAvatarIdx);

const newMockCode = mockCode.substring(0, lastEndIdx + 1) + ",\n" + p393Obj + mockCode.substring(lastEndIdx + 1);
fs.writeFileSync(mockPath, newMockCode, 'utf-8');
console.log(`[2/5] Updated ${mockPath} with player p393 (コビー・メイヌー)`);

// 3. Update index.html to include script link
let htmlCode = fs.readFileSync(indexPath, 'utf-8');
const scriptTag = '  <script src="./src/data/kobbieMainoo2026Image.js"></script>\n';
if (!htmlCode.includes('kobbieMainoo2026Image.js')) {
  const insertPos = htmlCode.indexOf('  <!-- 2. Official Special Training Cards');
  if (insertPos !== -1) {
    htmlCode = htmlCode.substring(0, insertPos) + scriptTag + htmlCode.substring(insertPos);
    fs.writeFileSync(indexPath, htmlCode, 'utf-8');
    console.log(`[3/5] Updated ${indexPath} with script link`);
  } else {
    console.warn("Could not find insertion marker in index.html");
  }
} else {
  console.log(`[3/5] index.html already contains kobbieMainoo2026Image.js`);
}

// 4. Update PLAYER_IMAGE_MAP in src/app.js
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
if (!appJsCode.includes('"p393"')) {
  appJsCode = appJsCode.replace(
    '"p392":"LEANDRO_TROSSARD_2026_IMAGE"',
    '"p392":"LEANDRO_TROSSARD_2026_IMAGE","p393":"KOBBIE_MAINOO_2026_IMAGE"'
  );
  fs.writeFileSync(appJsPath, appJsCode, 'utf-8');
  console.log(`[4/5] Updated PLAYER_IMAGE_MAP in ${appJsPath}`);
} else {
  console.log(`[4/5] src/app.js already maps p393`);
}

// Update PLAYER_IMAGE_MAP in src/app.jsx if present
if (fs.existsSync(appJsxPath)) {
  let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
  if (!appJsxCode.includes('"p393"')) {
    appJsxCode = appJsxCode.replace(
      '"p392":"LEANDRO_TROSSARD_2026_IMAGE"',
      '"p392":"LEANDRO_TROSSARD_2026_IMAGE","p393":"KOBBIE_MAINOO_2026_IMAGE"'
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

const addedPlayer = sandbox.window.INITIAL_PLAYERS.find(p => p.id === 'p393');
if (addedPlayer) {
  console.log(`[5/5] SUCCESS! Registered player ${addedPlayer.id}: ${addedPlayer.name} (${addedPlayer.nationality})`);
  console.log(`      Main Pos: ${addedPlayer.mainPosition}, Overall: ${addedPlayer.overall}, MaxOverall: ${addedPlayer.maxOverall}`);
} else {
  console.error("ERROR: Failed to find p393 after VM execution!");
  process.exit(1);
}
