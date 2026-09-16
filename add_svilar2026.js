const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SR Mile Svilar [ジャロロッソの砦] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789480400837.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/svilarFortressOfGiallorossiCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'svilarFortressOfGiallorossiCardImage.js');
const imgJsContent = `window.SVILAR_FORTRESS_OF_GIALLOROSSI_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created svilarFortressOfGiallorossiCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/svilarFortressOfGiallorossiCardImage.js"></script>\n';
if (!htmlContent.includes('svilarFortressOfGiallorossiCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with svilarFortressOfGiallorossiCardImage.js');
} else {
  console.log('svilarFortressOfGiallorossiCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_mile_svilar_fortress_of_giallorossi_sr')) {
  console.log('card_mile_svilar_fortress_of_giallorossi_sr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_mile_svilar_fortress_of_giallorossi_sr'");
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
    id: 'card_mile_svilar_fortress_of_giallorossi_sr',
    rank: 'SR',
    cardType: 'オーソドックスGK',
    category: 'オーソドックスGK',
    name: 'ミル・スヴィラール【ジャロロッソの砦】',
    getImageUrl: () => window.SVILAR_FORTRESS_OF_GIALLOROSSI_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '冷静沈着',
      rank: '銅',
      description: '発動条件：途中出場　/　反応速度・1VS1UP'
    },
    playstyleBonus: {
      style: 'オーソドックスGK',
      percent: 10,
      bonuses: [
        { style: 'オーソドックスGK', percent: 10 }
      ]
    },
    stages: {
      '無凸': {
        'セービング': 27.9,
        'キック精度': 15.5,
        'ジャンプ': 9.3,
        '1対1': 6.8,
        '反応速度': 3.7,
        'コンタクト': 3.7
      },
      '1凸': {
        'セービング': 32.2,
        'キック精度': 17.9,
        'ジャンプ': 10.7,
        '1対1': 7.8,
        '反応速度': 4.2,
        'コンタクト': 4.2
      },
      '2凸': {
        'セービング': 36.4,
        'キック精度': 20.2,
        'ジャンプ': 12.1,
        '1対1': 8.9,
        '反応速度': 4.8,
        'コンタクト': 4.8
      },
      '3凸': {
        'セービング': 40.7,
        'キック精度': 22.6,
        'ジャンプ': 13.5,
        '1対1': 9.9,
        '反応速度': 5.4,
        'コンタクト': 5.4
      },
      '完凸': {
        'セービング': 45.0,
        'キック精度': 25.0,
        'ジャンプ': 15.0,
        '1対1': 11.0,
        '反応速度': 6.0,
        'コンタクト': 6.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Mile Svilar card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_mile_svilar_fortress_of_giallorossi_sr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
