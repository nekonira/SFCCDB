const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SR David Raya [真の守護神の証明] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789479806268.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/rayaProofOfTrueGuardianGodCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'rayaProofOfTrueGuardianGodCardImage.js');
const imgJsContent = `window.RAYA_PROOF_OF_TRUE_GUARDIAN_GOD_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created rayaProofOfTrueGuardianGodCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/rayaProofOfTrueGuardianGodCardImage.js"></script>\n';
if (!htmlContent.includes('rayaProofOfTrueGuardianGodCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with rayaProofOfTrueGuardianGodCardImage.js');
} else {
  console.log('rayaProofOfTrueGuardianGodCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_david_raya_proof_of_true_guardian_god_sr')) {
  console.log('card_david_raya_proof_of_true_guardian_god_sr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_david_raya_proof_of_true_guardian_god_sr'");
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
    id: 'card_david_raya_proof_of_true_guardian_god_sr',
    rank: 'SR',
    cardType: 'スイーパーGK',
    category: 'スイーパーGK',
    name: 'ダビド・ラヤ【真の守護神の証明】',
    getImageUrl: () => window.RAYA_PROOF_OF_TRUE_GUARDIAN_GOD_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '最後方のプレーメーカー',
      rank: '銅',
      description: '発動条件：絶好調　/　ロングパス・キック精度UP'
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
        'ロングパス': 23.5,
        '反応速度': 19.8,
        'キック精度': 11.1,
        '1対1': 9.9,
        'ジャンプ': 1.2,
        'タックル': 1.2
      },
      '1凸': {
        'ロングパス': 27.1,
        '反応速度': 22.8,
        'キック精度': 12.8,
        '1対1': 11.4,
        'ジャンプ': 1.4,
        'タックル': 1.4
      },
      '2凸': {
        'ロングパス': 30.7,
        '反応速度': 25.9,
        'キック精度': 14.5,
        '1対1': 12.9,
        'ジャンプ': 1.6,
        'タックル': 1.6
      },
      '3凸': {
        'ロングパス': 34.3,
        '反応速度': 28.9,
        'キック精度': 16.2,
        '1対1': 14.4,
        'ジャンプ': 1.8,
        'タックル': 1.8
      },
      '完凸': {
        'ロングパス': 38.0,
        '反応速度': 32.0,
        'キック精度': 18.0,
        '1対1': 16.0,
        'ジャンプ': 2.0,
        'タックル': 2.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended David Raya card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_david_raya_proof_of_true_guardian_god_sr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
