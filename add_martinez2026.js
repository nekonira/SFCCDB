const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Emiliano Martínez [世界最強の道化師] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789480853904.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/martinezWorldsStrongestJesterCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'martinezWorldsStrongestJesterCardImage.js');
const imgJsContent = `window.MARTINEZ_WORLDS_STRONGEST_JESTER_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created martinezWorldsStrongestJesterCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/martinezWorldsStrongestJesterCardImage.js"></script>\n';
if (!htmlContent.includes('martinezWorldsStrongestJesterCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with martinezWorldsStrongestJesterCardImage.js');
} else {
  console.log('martinezWorldsStrongestJesterCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_emiliano_martinez_worlds_strongest_jester_ssr')) {
  console.log('card_emiliano_martinez_worlds_strongest_jester_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_emiliano_martinez_worlds_strongest_jester_ssr'");
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
    id: 'card_emiliano_martinez_worlds_strongest_jester_ssr',
    rank: 'SSR',
    cardType: 'オーソドックスGK',
    category: 'オーソドックスGK',
    name: 'エミリアーノ・マルティネス【世界最強の道化師】',
    getImageUrl: () => window.MARTINEZ_WORLDS_STRONGEST_JESTER_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '守備のロングキック',
      rank: '銀',
      description: '発動条件：好調　/　セービング・ロングパスUP'
    },
    playstyleBonus: {
      style: 'オーソドックスGK',
      percent: 30,
      bonuses: [
        { style: 'オーソドックスGK', percent: 30 }
      ]
    },
    stages: {
      '無凸': {
        'セービング': 42.8,
        'キック力': 11.8,
        '反応速度': 11.8,
        'ショートパス': 7.9,
        '冷静さ': 6.6,
        'ジャンプ': 6.6,
        '敏捷性': 5.2,
        'コンタクト': 2.6
      },
      '1凸': {
        'セービング': 48.4,
        'キック力': 13.4,
        '反応速度': 13.4,
        'ショートパス': 8.9,
        '冷静さ': 7.4,
        'ジャンプ': 7.4,
        '敏捷性': 5.9,
        'コンタクト': 2.9
      },
      '2凸': {
        'セービング': 53.9,
        'キック力': 14.9,
        '反応速度': 14.9,
        'ショートパス': 9.9,
        '冷静さ': 8.3,
        'ジャンプ': 8.3,
        '敏捷性': 6.6,
        'コンタクト': 3.3
      },
      '3凸': {
        'セービング': 59.4,
        'キック力': 16.4,
        '反応速度': 16.4,
        'ショートパス': 10.9,
        '冷静さ': 9.1,
        'ジャンプ': 9.1,
        '敏捷性': 7.3,
        'コンタクト': 3.6
      },
      '完凸': {
        'セービング': 65.0,
        'キック力': 18.0,
        '反応速度': 18.0,
        'ショートパス': 12.0,
        '冷静さ': 10.0,
        'ジャンプ': 10.0,
        '敏捷性': 8.0,
        'コンタクト': 4.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Emiliano Martínez card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_emiliano_martinez_worlds_strongest_jester_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
