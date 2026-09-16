const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Bart Verbruggen [ブルーガルの守護神] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789479561305.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/verbruggenBlueGullsGuardianGodCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'verbruggenBlueGullsGuardianGodCardImage.js');
const imgJsContent = `window.VERBRUGGEN_BLUE_GULLS_GUARDIAN_GOD_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created verbruggenBlueGullsGuardianGodCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/verbruggenBlueGullsGuardianGodCardImage.js"></script>\n';
if (!htmlContent.includes('verbruggenBlueGullsGuardianGodCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with verbruggenBlueGullsGuardianGodCardImage.js');
} else {
  console.log('verbruggenBlueGullsGuardianGodCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_bart_verbruggen_blue_gulls_guardian_god_ssr')) {
  console.log('card_bart_verbruggen_blue_gulls_guardian_god_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_bart_verbruggen_blue_gulls_guardian_god_ssr'");
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
    id: 'card_bart_verbruggen_blue_gulls_guardian_god_ssr',
    rank: 'SSR',
    cardType: 'スイーパーGK',
    category: 'スイーパーGK',
    name: 'バルト・フェルブルッヘン【ブルーガルの守護神】',
    getImageUrl: () => window.VERBRUGGEN_BLUE_GULLS_GUARDIAN_GOD_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '起死回生の弾道',
      rank: '金',
      description: '発動条件：絶好調　/　1VS1・ロングパス・キック精度UP'
    },
    playstyleBonus: {
      style: 'スイーパーGK',
      percent: 30,
      bonuses: [
        { style: 'スイーパーGK', percent: 30 }
      ]
    },
    stages: {
      '無凸': {
        '反応速度': 25.7,
        'ショートパス': 23.7,
        '1対1': 19.7,
        'ロングパス': 11.8,
        'コンタクト': 8.5,
        'ジャンプ': 5.9,
        '敏捷性': 1.9,
        '走力': 1.3
      },
      '1凸': {
        '反応速度': 29.0,
        'ショートパス': 26.8,
        '1対1': 22.3,
        'ロングパス': 13.4,
        'コンタクト': 9.6,
        'ジャンプ': 6.7,
        '敏捷性': 2.2,
        '走力': 1.4
      },
      '2凸': {
        '反応速度': 32.3,
        'ショートパス': 29.8,
        '1対1': 24.8,
        'ロングパス': 14.9,
        'コンタクト': 10.7,
        'ジャンプ': 7.4,
        '敏捷性': 2.4,
        '走力': 1.6
      },
      '3凸': {
        '反応速度': 35.6,
        'ショートパス': 32.9,
        '1対1': 27.4,
        'ロングパス': 16.4,
        'コンタクト': 11.8,
        'ジャンプ': 8.2,
        '敏捷性': 2.7,
        '走力': 1.8
      },
      '完凸': {
        '反応速度': 39.0,
        'ショートパス': 36.0,
        '1対1': 30.0,
        'ロングパス': 18.0,
        'コンタクト': 13.0,
        'ジャンプ': 9.0,
        '敏捷性': 3.0,
        '走力': 2.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Bart Verbruggen card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_bart_verbruggen_blue_gulls_guardian_god_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
