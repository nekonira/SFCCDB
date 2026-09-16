const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SR Rina Inoue [チアフルサポート] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789481319985.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/inoueCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'inoueCardImage.js');
const imgJsContent = `window.INOUE_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created inoueCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/inoueCardImage.js"></script>\n';
if (!htmlContent.includes('inoueCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with inoueCardImage.js');
} else {
  console.log('inoueCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_rina_inoue_sr')) {
  console.log('card_rina_inoue_sr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_rina_inoue_sr'");
  const braceBefore = specialCardsCode.lastIndexOf('{', oldIdx);
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
    id: 'card_rina_inoue_sr',
    rank: 'SR',
    cardType: 'オーソドックスGK',
    category: 'オーソドックスGK',
    name: '井上里奈【チアフルサポート】',
    getImageUrl: () => window.INOUE_CARD_IMAGE || '',
    skill: {
      type: '特殊効果',
      name: '覚醒ポイントUP',
      rank: '特殊効果',
      description: '覚醒ポイントUP'
    },
    playstyleBonus: {
      style: 'オーソドックスGK',
      percent: 100,
      bonuses: [
        { style: 'オーソドックスGK', percent: 100 }
      ]
    },
    stages: {
      '無凸': {
        'キック力': 11.1,
        'ロングパス': 11.1,
        'スタミナ': 10.5,
        '1対1': 8.0,
        '反応速度': 4.3,
        'コンタクト': 3.0
      },
      '1凸': {
        'キック力': 12.8,
        'ロングパス': 12.8,
        'スタミナ': 12.1,
        '1対1': 9.3,
        '反応速度': 5.0,
        'コンタクト': 3.5
      },
      '2凸': {
        'キック力': 14.5,
        'ロングパス': 14.5,
        'スタミナ': 13.7,
        '1対1': 10.5,
        '反応速度': 5.6,
        'コンタクト': 4.0
      },
      '3凸': {
        'キック力': 16.2,
        'ロングパス': 16.2,
        'スタミナ': 15.3,
        '1対1': 11.7,
        '反応速度': 6.3,
        'コンタクト': 4.5
      },
      '完凸': {
        'キック力': 18.0,
        'ロングパス': 18.0,
        'スタミナ': 17.0,
        '1対1': 13.0,
        '反応速度': 7.0,
        'コンタクト': 5.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Rina Inoue card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_rina_inoue_sr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
