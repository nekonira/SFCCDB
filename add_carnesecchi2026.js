const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SR Marco Carnesecchi [ラ・デアがほほ笑む若き守護神] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789480135765.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/carnesecchiYoungGuardianGodCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'carnesecchiYoungGuardianGodCardImage.js');
const imgJsContent = `window.CARNESECCHI_YOUNG_GUARDIAN_GOD_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created carnesecchiYoungGuardianGodCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/carnesecchiYoungGuardianGodCardImage.js"></script>\n';
if (!htmlContent.includes('carnesecchiYoungGuardianGodCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with carnesecchiYoungGuardianGodCardImage.js');
} else {
  console.log('carnesecchiYoungGuardianGodCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_marco_carnesecchi_young_guardian_god_la_dea_smiles_on_sr')) {
  console.log('card_marco_carnesecchi_young_guardian_god_la_dea_smiles_on_sr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_marco_carnesecchi_young_guardian_god_la_dea_smiles_on_sr'");
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
    id: 'card_marco_carnesecchi_young_guardian_god_la_dea_smiles_on_sr',
    rank: 'SR',
    cardType: 'スイーパーGK',
    category: 'スイーパーGK',
    name: 'マルコ・カルネセッキ【ラ・デアがほほ笑む若き守護神】',
    getImageUrl: () => window.CARNESECCHI_YOUNG_GUARDIAN_GOD_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '強靭な守護神',
      rank: '銅',
      description: '発動条件：好調　/　セービング・コンタクトUP'
    },
    playstyleBonus: null,
    stages: {
      '無凸': {
        '反応速度': 16.1,
        'ロングパス': 16.1,
        'キック精度': 9.9,
        'セービング': 8.6,
        'ショートパス': 4.9,
        '1対1': 3.7,
        '敏捷性': 0.6
      },
      '1凸': {
        '反応速度': 18.6,
        'ロングパス': 18.6,
        'キック精度': 11.4,
        'セービング': 10.0,
        'ショートパス': 5.7,
        '1対1': 4.2,
        '敏捷性': 0.7
      },
      '2凸': {
        '反応速度': 21.0,
        'ロングパス': 21.0,
        'キック精度': 12.9,
        'セービング': 11.3,
        'ショートパス': 6.4,
        '1対1': 4.8,
        '敏捷性': 0.8
      },
      '3凸': {
        '反応速度': 23.5,
        'ロングパス': 23.5,
        'キック精度': 14.4,
        'セービング': 12.6,
        'ショートパス': 7.2,
        '1対1': 5.4,
        '敏捷性': 0.9
      },
      '完凸': {
        '反応速度': 26.0,
        'ロングパス': 26.0,
        'キック精度': 16.0,
        'セービング': 14.0,
        'ショートパス': 8.0,
        '1対1': 6.0,
        '敏捷性': 1.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Marco Carnesecchi card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_marco_carnesecchi_young_guardian_god_la_dea_smiles_on_sr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
