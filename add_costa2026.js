const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Diogo Costa [青竜の守護神] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789481120903.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/costaBlueDragonsGuardianGodCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'costaBlueDragonsGuardianGodCardImage.js');
const imgJsContent = `window.COSTA_BLUE_DRAGONS_GUARDIAN_GOD_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created costaBlueDragonsGuardianGodCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/costaBlueDragonsGuardianGodCardImage.js"></script>\n';
if (!htmlContent.includes('costaBlueDragonsGuardianGodCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with costaBlueDragonsGuardianGodCardImage.js');
} else {
  console.log('costaBlueDragonsGuardianGodCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_diogo_costa_blue_dragons_guardian_god_ssr')) {
  console.log('card_diogo_costa_blue_dragons_guardian_god_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_diogo_costa_blue_dragons_guardian_god_ssr'");
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
    id: 'card_diogo_costa_blue_dragons_guardian_god_ssr',
    rank: 'SSR',
    cardType: 'オーソドックスGK',
    category: 'オーソドックスGK',
    name: 'ディオゴ・コスタ【青竜の守護神】',
    getImageUrl: () => window.COSTA_BLUE_DRAGONS_GUARDIAN_GOD_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: 'エレガントセーブ',
      rank: '銀',
      description: '発動エリア：後中　/　発動条件：セービング時　/　セービング・反応速度UP'
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
        '1対1': 43.5,
        'コンタクト': 18.4,
        'ジャンプ': 17.8,
        'キック精度': 13.1,
        '敏捷性': 5.9,
        'スタミナ': 3.2,
        'ロングパス': 2.6,
        '走力': 0.6
      },
      '1凸': {
        '1対1': 49.1,
        'コンタクト': 20.8,
        'ジャンプ': 20.1,
        'キック精度': 14.8,
        '敏捷性': 6.7,
        'スタミナ': 3.7,
        'ロングパス': 2.9,
        '走力': 0.7
      },
      '2凸': {
        '1対1': 54.7,
        'コンタクト': 23.2,
        'ジャンプ': 22.4,
        'キック精度': 16.5,
        '敏捷性': 7.4,
        'スタミナ': 4.1,
        'ロングパス': 3.3,
        '走力': 0.8
      },
      '3凸': {
        '1対1': 60.3,
        'コンタクト': 25.6,
        'ジャンプ': 24.7,
        'キック精度': 18.2,
        '敏捷性': 8.2,
        'スタミナ': 4.5,
        'ロングパス': 3.6,
        '走力': 0.9
      },
      '完凸': {
        '1対1': 66.0,
        'コンタクト': 28.0,
        'ジャンプ': 27.0,
        'キック精度': 20.0,
        '敏捷性': 9.0,
        'スタミナ': 5.0,
        'ロングパス': 4.0,
        '走力': 1.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Diogo Costa card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_diogo_costa_blue_dragons_guardian_god_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
