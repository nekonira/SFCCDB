const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SR Álex Remiro [サン・セバスチャンに聳え立つ砦] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789479938493.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/remiroToweringFortressOfSanSebastianCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'remiroToweringFortressOfSanSebastianCardImage.js');
const imgJsContent = `window.REMIRO_TOWERING_FORTRESS_OF_SAN_SEBASTIAN_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created remiroToweringFortressOfSanSebastianCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/remiroToweringFortressOfSanSebastianCardImage.js"></script>\n';
if (!htmlContent.includes('remiroToweringFortressOfSanSebastianCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with remiroToweringFortressOfSanSebastianCardImage.js');
} else {
  console.log('remiroToweringFortressOfSanSebastianCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_alex_remiro_towering_fortress_of_san_sebastian_sr')) {
  console.log('card_alex_remiro_towering_fortress_of_san_sebastian_sr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_alex_remiro_towering_fortress_of_san_sebastian_sr'");
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
    id: 'card_alex_remiro_towering_fortress_of_san_sebastian_sr',
    rank: 'SR',
    cardType: 'スイーパーGK',
    category: 'スイーパーGK',
    name: 'アレックス・レミーロ【サン・セバスチャンに聳え立つ砦】',
    getImageUrl: () => window.REMIRO_TOWERING_FORTRESS_OF_SAN_SEBASTIAN_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '広域の守護神',
      rank: '銅',
      description: '発動条件：好調　/　セービング・1VS1UP'
    },
    playstyleBonus: {
      style: 'スイーパーGK',
      percent: 20,
      bonuses: [
        { style: 'スイーパーGK', percent: 20 }
      ]
    },
    stages: {
      '無凸': {
        'セービング': 19.9,
        'ポジショニング': 19.9,
        'ハイボール': 14.9,
        '飛び出し': 8.0,
        'メンタル': 5.0,
        '敏捷性': 2.4,
        'ジャンプ': 2.4,
        'コンタクト': 1.2
      },
      '1凸': {
        'セービング': 22.9,
        'ポジショニング': 22.9,
        'ハイボール': 17.1,
        '飛び出し': 9.3,
        'メンタル': 5.7,
        '敏捷性': 2.8,
        'ジャンプ': 2.8,
        'コンタクト': 1.4
      },
      '2凸': {
        'セービング': 25.9,
        'ポジショニング': 25.9,
        'ハイボール': 19.4,
        '飛び出し': 10.5,
        'メンタル': 6.5,
        '敏捷性': 3.2,
        'ジャンプ': 3.2,
        'コンタクト': 1.6
      },
      '3凸': {
        'セービング': 28.9,
        'ポジショニング': 28.9,
        'ハイボール': 21.7,
        '飛び出し': 11.7,
        'メンタル': 7.2,
        '敏捷性': 3.6,
        'ジャンプ': 3.6,
        'コンタクト': 1.8
      },
      '完凸': {
        'セービング': 32.0,
        'ポジショニング': 32.0,
        'ハイボール': 24.0,
        '飛び出し': 13.0,
        'メンタル': 8.0,
        '敏捷性': 4.0,
        'ジャンプ': 4.0,
        'コンタクト': 2.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Álex Remiro card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_alex_remiro_towering_fortress_of_san_sebastian_sr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
