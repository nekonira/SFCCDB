const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Robert Sánchez [反転の速射砲] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789479690060.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/sanchezInvertedRapidFireCannonCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'sanchezInvertedRapidFireCannonCardImage.js');
const imgJsContent = `window.SANCHEZ_INVERTED_RAPID_FIRE_CANNON_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created sanchezInvertedRapidFireCannonCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/sanchezInvertedRapidFireCannonCardImage.js"></script>\n';
if (!htmlContent.includes('sanchezInvertedRapidFireCannonCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with sanchezInvertedRapidFireCannonCardImage.js');
} else {
  console.log('sanchezInvertedRapidFireCannonCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_robert_sanchez_inverted_rapid_fire_cannon_ssr')) {
  console.log('card_robert_sanchez_inverted_rapid_fire_cannon_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_robert_sanchez_inverted_rapid_fire_cannon_ssr'");
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
    id: 'card_robert_sanchez_inverted_rapid_fire_cannon_ssr',
    rank: 'SSR',
    cardType: 'スイーパーGK',
    category: 'スイーパーGK',
    name: 'ロベルト・サンチェス【反転の速射砲】',
    getImageUrl: () => window.SANCHEZ_INVERTED_RAPID_FIRE_CANNON_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '最初の起点',
      rank: '銀',
      description: '発動条件：途中出場　/　1VS1・ショートパスUP'
    },
    playstyleBonus: {
      style: 'スイーパーGK',
      percent: 40,
      bonuses: [
        { style: 'スイーパーGK', percent: 40 }
      ]
    },
    stages: {
      '無凸': {
        '反応速度': 39.5,
        'ショートパス': 15.8,
        'キック力': 9.8,
        'セービング': 9.2,
        'ロングパス': 7.9,
        '敏捷性': 5.2,
        'コンタクト': 5.2,
        'キック精度': 2.6
      },
      '1凸': {
        '反応速度': 44.6,
        'ショートパス': 17.8,
        'キック力': 11.1,
        'セービング': 10.4,
        'ロングパス': 8.9,
        '敏捷性': 5.9,
        'コンタクト': 5.9,
        'キック精度': 2.9
      },
      '2凸': {
        '反応速度': 49.7,
        'ショートパス': 19.9,
        'キック力': 12.4,
        'セービング': 11.6,
        'ロングパス': 9.9,
        '敏捷性': 6.6,
        'コンタクト': 6.6,
        'キック精度': 3.3
      },
      '3凸': {
        '反応速度': 54.8,
        'ショートパス': 21.9,
        'キック力': 13.7,
        'セービング': 12.8,
        'ロングパス': 10.9,
        '敏捷性': 7.3,
        'コンタクト': 7.3,
        'キック精度': 3.6
      },
      '完凸': {
        '反応速度': 60.0,
        'ショートパス': 24.0,
        'キック力': 15.0,
        'セービング': 14.0,
        'ロングパス': 12.0,
        '敏捷性': 8.0,
        'コンタクト': 8.0,
        'キック精度': 4.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Robert Sánchez card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_robert_sanchez_inverted_rapid_fire_cannon_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
