const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Virgil van Dijk [赤き勝者の雄叫び] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789469130019.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/vanDijkRedVictorsRoarCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'vanDijkRedVictorsRoarCardImage.js');
const imgJsContent = `window.VAN_DIJK_RED_VICTORS_ROAR_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created vanDijkRedVictorsRoarCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/vanDijkRedVictorsRoarCardImage.js"></script>\n';
if (!htmlContent.includes('vanDijkRedVictorsRoarCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with vanDijkRedVictorsRoarCardImage.js');
} else {
  console.log('vanDijkRedVictorsRoarCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_virgil_van_dijk_red_victors_roar_ssr')) {
  console.log('card_virgil_van_dijk_red_victors_roar_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_virgil_van_dijk_red_victors_roar_ssr'");
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
    id: 'card_virgil_van_dijk_red_victors_roar_ssr',
    rank: 'SSR',
    cardType: '組立CB',
    category: '組立CB',
    name: 'フィルジル・ファン・ダイク【赤き勝者の雄叫び】',
    getImageUrl: () => window.VAN_DIJK_RED_VICTORS_ROAR_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: 'インビンシブルフィード',
      rank: '金',
      description: '発動エリア：中左中右・後左中右　/　発動条件：LW・RW・LM・RMの選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のトラップ発生確率UP'
    },
    playstyleBonus: {
      style: '組立CB',
      percent: 25,
      bonuses: [
        { style: '組立CB', percent: 25 }
      ]
    },
    stages: {
      '無凸': {
        'パスカット': 44.8,
        'コンタクト': 11.8,
        'ショートパス': 10.5,
        'キープ力': 9.8,
        'マーク': 8.5,
        'ジャンプ': 6.6,
        'タックル': 6.6,
        'キック精度': 6.6
      },
      '1凸': {
        'パスカット': 50.6,
        'コンタクト': 13.4,
        'ショートパス': 11.9,
        'キープ力': 11.1,
        'マーク': 9.6,
        'ジャンプ': 7.4,
        'タックル': 7.4,
        'キック精度': 7.4
      },
      '2凸': {
        'パスカット': 56.4,
        'コンタクト': 14.9,
        'ショートパス': 13.2,
        'キープ力': 12.4,
        'マーク': 10.7,
        'ジャンプ': 8.3,
        'タックル': 8.3,
        'キック精度': 8.3
      },
      '3凸': {
        'パスカット': 62.2,
        'コンタクト': 16.4,
        'ショートパス': 14.6,
        'キープ力': 13.7,
        'マーク': 11.8,
        'ジャンプ': 9.1,
        'タックル': 9.1,
        'キック精度': 9.1
      },
      '完凸': {
        'パスカット': 68.0,
        'コンタクト': 18.0,
        'ショートパス': 16.0,
        'キープ力': 15.0,
        'マーク': 13.0,
        'ジャンプ': 10.0,
        'タックル': 10.0,
        'キック精度': 10.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Virgil van Dijk card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_virgil_van_dijk_red_victors_roar_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
