const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Jan Oblak [マドリードを統べる赤い壁] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789480983040.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/oblakRedWallGoverningMadridCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'oblakRedWallGoverningMadridCardImage.js');
const imgJsContent = `window.OBLAK_RED_WALL_GOVERNING_MADRID_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created oblakRedWallGoverningMadridCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/oblakRedWallGoverningMadridCardImage.js"></script>\n';
if (!htmlContent.includes('oblakRedWallGoverningMadridCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with oblakRedWallGoverningMadridCardImage.js');
} else {
  console.log('oblakRedWallGoverningMadridCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_jan_oblak_red_wall_governing_madrid_ssr')) {
  console.log('card_jan_oblak_red_wall_governing_madrid_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_jan_oblak_red_wall_governing_madrid_ssr'");
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
    id: 'card_jan_oblak_red_wall_governing_madrid_ssr',
    rank: 'SSR',
    cardType: 'オーソドックスGK',
    category: 'オーソドックスGK',
    name: 'ヤン・オブラク【マドリードを統べる赤い壁】',
    getImageUrl: () => window.OBLAK_RED_WALL_GOVERNING_MADRID_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '山のような存在感',
      rank: '金',
      description: '発動条件：絶好調　/　セービング・1VS1・コンタクトUP'
    },
    playstyleBonus: {
      style: 'オーソドックスGK',
      percent: 20,
      bonuses: [
        { style: 'オーソドックスGK', percent: 20 }
      ]
    },
    stages: {
      '無凸': {
        '反応速度': 42.8,
        '敏捷性': 17.1,
        'セービング': 10.5,
        'コンタクト': 9.8,
        'ジャンプ': 7.2,
        'ロングパス': 5.2,
        'ショートパス': 5.2,
        'スタミナ': 0.6
      },
      '1凸': {
        '反応速度': 48.4,
        '敏捷性': 19.3,
        'セービング': 11.9,
        'コンタクト': 11.1,
        'ジャンプ': 8.1,
        'ロングパス': 5.9,
        'ショートパス': 5.9,
        'スタミナ': 0.7
      },
      '2凸': {
        '反応速度': 53.9,
        '敏捷性': 21.5,
        'セービング': 13.2,
        'コンタクト': 12.4,
        'ジャンプ': 9.1,
        'ロングパス': 6.6,
        'ショートパス': 6.6,
        'スタミナ': 0.8
      },
      '3凸': {
        '反応速度': 59.4,
        '敏捷性': 23.7,
        'セービング': 14.6,
        'コンタクト': 13.7,
        'ジャンプ': 10.0,
        'ロングパス': 7.3,
        'ショートパス': 7.3,
        'スタミナ': 0.9
      },
      '完凸': {
        '反応速度': 65.0,
        '敏捷性': 26.0,
        'セービング': 16.0,
        'コンタクト': 15.0,
        'ジャンプ': 11.0,
        'ロングパス': 8.0,
        'ショートパス': 8.0,
        'スタミナ': 1.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Jan Oblak card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_jan_oblak_red_wall_governing_madrid_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
