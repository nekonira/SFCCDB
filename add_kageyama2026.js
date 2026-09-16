const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Yuka Kageyama [知の探究者] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789468825774.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/kageyamaCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'kageyamaCardImage.js');
const imgJsContent = `window.KAGEYAMA_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created kageyamaCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/kageyamaCardImage.js"></script>\n';
if (!htmlContent.includes('kageyamaCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with kageyamaCardImage.js');
} else {
  console.log('kageyamaCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_yuka_kageyama_seeker_of_knowledge_ssr')) {
  console.log('card_yuka_kageyama_seeker_of_knowledge_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_yuka_kageyama_seeker_of_knowledge_ssr'");
  const braceBefore = specialCardsCode.lastIndexOf('{', oldIdx);
  const arrayEnd = specialCardsCode.lastIndexOf('];');
  specialCardsCode = specialCardsCode.substring(0, braceBefore).trimEnd();
  if (specialCardsCode.endsWith(',')) {
    specialCardsCode = specialCardsCode.substring(0, specialCardsCode.length - 1);
  }
  specialCardsCode += '\n];\n';
}

const lastBracketIdx = specialCardsCode.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error('Could not find end of array in specialCardsData.js');
  process.exit(1);
}

const prefix = specialCardsCode.substring(0, lastBracketIdx).trimEnd();

const cardObjStr = `,
  {
    id: 'card_yuka_kageyama_seeker_of_knowledge_ssr',
    rank: 'SSR',
    cardType: '組立CB',
    category: '組立CB',
    name: '影山優佳【知の探究者】',
    getImageUrl: () => window.KAGEYAMA_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: 'CDパス',
      rank: '銀',
      description: '発動エリア：前左右・中全・後全　/　発動条件：ショートパス時　/　ショートパス・キック精度UP'
    },
    playstyleBonus: {
      style: '組立CB 40% / 日本 10%',
      displayText: '組立CB 40% UP / 日本 10% UP',
      percent: 50,
      bonuses: [
        { style: '組立CB', percent: 40 },
        { style: '日本', percent: 10 }
      ]
    },
    stages: {
      '無凸': {
        'マーク': 11.5,
        'ショートパス': 11.1,
        'ロングパス': 8.6,
        '冷静さ': 4.9,
        '走力': 3.2,
        'ジャンプ': 0.8,
        'キック精度': 0.8
      },
      '1凸': {
        'マーク': 12.7,
        'ショートパス': 12.3,
        'ロングパス': 9.5,
        '冷静さ': 5.4,
        '走力': 3.6,
        'ジャンプ': 0.8,
        'キック精度': 0.8
      },
      '2凸': {
        'マーク': 13.9,
        'ショートパス': 13.4,
        'ロングパス': 10.4,
        '冷静さ': 5.9,
        '走力': 3.9,
        'ジャンプ': 0.9,
        'キック精度': 0.9
      },
      '3凸': {
        'マーク': 15.1,
        'ショートパス': 14.6,
        'ロングパス': 11.3,
        '冷静さ': 6.4,
        '走力': 4.3,
        'ジャンプ': 1.0,
        'キック精度': 1.0
      },
      '完凸': {
        'マーク': 16.3,
        'ショートパス': 15.7,
        'ロングパス': 12.2,
        '冷静さ': 7.0,
        '走力': 4.6,
        'ジャンプ': 1.1,
        'キック精度': 1.1
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Yuka Kageyama card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

// Load image script to sandbox
vm.runInContext(imgJsContent, sandbox);

// Load specialCardsData to sandbox
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_yuka_kageyama_seeker_of_knowledge_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
