const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SR Yann Sommer [鬼神降臨] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789480273454.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/sommerFierceGodDescendsCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'sommerFierceGodDescendsCardImage.js');
const imgJsContent = `window.SOMMER_FIERCE_GOD_DESCENDS_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created sommerFierceGodDescendsCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/sommerFierceGodDescendsCardImage.js"></script>\n';
if (!htmlContent.includes('sommerFierceGodDescendsCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with sommerFierceGodDescendsCardImage.js');
} else {
  console.log('sommerFierceGodDescendsCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_yann_sommer_fierce_god_descends_sr')) {
  console.log('card_yann_sommer_fierce_god_descends_sr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_yann_sommer_fierce_god_descends_sr'");
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
    id: 'card_yann_sommer_fierce_god_descends_sr',
    rank: 'SR',
    cardType: 'オーソドックスGK',
    category: 'オーソドックスGK',
    name: 'ヤン・ゾマー【鬼神降臨】',
    getImageUrl: () => window.SOMMER_FIERCE_GOD_DESCENDS_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '驚異的なセービング',
      rank: '銅',
      description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP'
    },
    playstyleBonus: null,
    stages: {
      '無凸': {
        'セービング': 27.3,
        'コンタクト': 16.1,
        '反応速度': 9.9,
        'ジャンプ': 8.6,
        '冷静さ': 2.5,
        '敏捷性': 1.2,
        'ロングパス': 1.2
      },
      '1凸': {
        'セービング': 31.4,
        'コンタクト': 18.6,
        '反応速度': 11.4,
        'ジャンプ': 10.0,
        '冷静さ': 2.8,
        '敏捷性': 1.4,
        'ロングパス': 1.4
      },
      '2凸': {
        'セービング': 35.6,
        'コンタクト': 21.0,
        '反応速度': 12.9,
        'ジャンプ': 11.3,
        '冷静さ': 3.2,
        '敏捷性': 1.6,
        'ロングパス': 1.6
      },
      '3凸': {
        'セービング': 39.8,
        'コンタクト': 23.5,
        '反応速度': 14.4,
        'ジャンプ': 12.6,
        '冷静さ': 3.6,
        '敏捷性': 1.8,
        'ロングパス': 1.8
      },
      '完凸': {
        'セービング': 44.0,
        'コンタクト': 26.0,
        '反応速度': 16.0,
        'ジャンプ': 14.0,
        '冷静さ': 4.0,
        '敏捷性': 2.0,
        'ロングパス': 2.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Yann Sommer card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_yann_sommer_fierce_god_descends_sr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
