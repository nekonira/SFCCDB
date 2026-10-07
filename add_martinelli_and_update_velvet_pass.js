const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Step 1: Registering Special Training Card: ガブリエウ・マルティネッリ【ノースロンドンの疾風】 ===');

// 1. Process Image to Base64
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a91503b1-d248-4c66-ae2c-12dce74a4b81\\.user_uploaded\\media_1791347752900.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Create src/data/gabrielMartinelliCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'gabrielMartinelliCardImage.js');
const imgJsContent = `window.GABRIEL_MARTINELLI_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created gabrielMartinelliCardImage.js successfully.');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/gabrielMartinelliCardImage.js"></script>\n';

if (!htmlContent.includes('gabrielMartinelliCardImage.js')) {
  const targetTag = '<script src="./src/data/specialCardsData.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, scriptTag + '  ' + targetTag);
  } else {
    console.error('Could not find specialCardsData.js tag in index.html');
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with gabrielMartinelliCardImage.js');
} else {
  console.log('gabrielMartinelliCardImage.js already present in index.html');
}

// 4. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

const cardId = 'card_gabriel_martinelli_north_london_breeze_ssr';

if (specialCardsCode.includes(cardId)) {
  console.log(`Card ${cardId} already present, removing old definition...`);
  const oldIdx = specialCardsCode.indexOf(`id: '${cardId}'`);
  const braceBefore = specialCardsCode.lastIndexOf('{', oldIdx);
  
  let braceCount = 1;
  let closingBraceIdx = braceBefore + 1;
  while (braceCount > 0 && closingBraceIdx < specialCardsCode.length) {
    if (specialCardsCode[closingBraceIdx] === '{') braceCount++;
    if (specialCardsCode[closingBraceIdx] === '}') braceCount--;
    closingBraceIdx++;
  }
  if (specialCardsCode[closingBraceIdx] === ',') closingBraceIdx++;
  
  specialCardsCode = specialCardsCode.substring(0, braceBefore) + specialCardsCode.substring(closingBraceIdx);
}

const lastBracketIdx = specialCardsCode.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error('Could not find ]; end of array in specialCardsData.js');
  process.exit(1);
}

const prefix = specialCardsCode.substring(0, lastBracketIdx).trimEnd();

const newCardObjStr = `,
  {
    id: '${cardId}',
    rank: 'SSR',
    cardType: 'ドリブラー',
    category: 'ドリブラー',
    name: 'ガブリエウ・マルティネッリ【ノースロンドンの疾風】',
    getImageUrl: () => window.GABRIEL_MARTINELLI_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '予測不能',
      rank: '金',
      description: '予測不能'
    },
    playstyleBonus: {
      style: 'ドリブラー',
      displayText: 'ドリブラー 35% UP',
      percent: 35,
      bonuses: [
        { style: 'ドリブラー', percent: 35 }
      ]
    },
    stages: {
      '無凸': {
        'ボールタッチ': 29.6,
        '走力': 23,
        '突破力': 21.1,
        '敏捷性': 18.4,
        'スタミナ': 9.8,
        'ショートパス': 1.9,
        '冷静さ': 1.3,
        '決定力': 0.6
      },
      '1凸': {
        'ボールタッチ': 33.5,
        '走力': 26,
        '突破力': 23.8,
        '敏捷性': 20.8,
        'スタミナ': 11.1,
        'ショートパス': 2.2,
        '冷静さ': 1.4,
        '決定力': 0.7
      },
      '2凸': {
        'ボールタッチ': 37.3,
        '走力': 29,
        '突破力': 26.5,
        '敏捷性': 23.2,
        'スタミナ': 12.4,
        'ショートパス': 2.4,
        '冷静さ': 1.6,
        '決定力': 0.8
      },
      '3凸': {
        'ボールタッチ': 41.1,
        '走力': 32,
        '突破力': 29.2,
        '敏捷性': 25.6,
        'スタミナ': 13.7,
        'ショートパス': 2.7,
        '冷静さ': 1.8,
        '決定力': 0.9
      },
      '完凸': {
        'ボールタッチ': 45,
        '走力': 35,
        '突破力': 32,
        '敏捷性': 28,
        'スタミナ': 15,
        'ショートパス': 3,
        '冷静さ': 2,
        '決定力': 1
      }
    }
  }
];
`;

const updatedCode = prefix + newCardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended ガブリエウ・マルティネッリ【ノースロンドンの疾風】 to specialCardsData.js');

console.log('\n=== Step 2: Updating 金スキル「ベルベットパス」 Description ===');
const newVelvetPassDesc = '発動エリア：前左右・中左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にショートパス発生確率UP';

// Update specialCardsData.js
let scCode = fs.readFileSync(specialCardsPath, 'utf-8');
let scVelvetCount = 0;
scCode = scCode.replace(/(name:\s*['"]ベルベットパス['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
  scVelvetCount++;
  console.log(`[specialCardsData.js] Updated Velvet Pass #${scVelvetCount}`);
  return p1 + newVelvetPassDesc + p3;
});
fs.writeFileSync(specialCardsPath, scCode, 'utf-8');
console.log(`Updated ${scVelvetCount} occurrence(s) of Velvet Pass in specialCardsData.js`);

// Update mockData.js
const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let mockCode = fs.readFileSync(mockPath, 'utf-8');
let mockVelvetCount = 0;
mockCode = mockCode.replace(/(name:\s*['"]ベルベットパス['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
  mockVelvetCount++;
  console.log(`[mockData.js] Updated Velvet Pass #${mockVelvetCount}`);
  return p1 + newVelvetPassDesc + p3;
});
fs.writeFileSync(mockPath, mockCode, 'utf-8');
console.log(`Updated ${mockVelvetCount} occurrence(s) of Velvet Pass in mockData.js`);

// 5. Verify via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(scCode, sandbox);

console.log('\n=== Step 3: Verification ===');
console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === cardId);
if (addedCard) {
  console.log('✅ CARD VERIFICATION SUCCESSFUL!');
  console.log('Card ID:', addedCard.id);
  console.log('Card Name:', addedCard.name);
  console.log('Rank:', addedCard.rank);
  console.log('Card Type:', addedCard.cardType);
  console.log('Skill Name:', addedCard.skill.name);
  console.log('Skill Rank:', addedCard.skill.rank);
  console.log('Bonuses:', addedCard.playstyleBonus.bonuses);
} else {
  console.error('❌ ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
