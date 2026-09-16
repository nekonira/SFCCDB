const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Adding SSR Ronald Araújo [不敗の空中戦] ===');

const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\b9449e35-511c-4ed5-8bcf-1fc1ea6bb9f9\\.user_uploaded\\media_1789479406194.jpg';
const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 1. Create src/data/araujoUndefeatedAerialCombatCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'araujoUndefeatedAerialCombatCardImage.js');
const imgJsContent = `window.ARAUJO_UNDEFEATED_AERIAL_COMBAT_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created araujoUndefeatedAerialCombatCardImage.js successfully.');

// 2. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/araujoUndefeatedAerialCombatCardImage.js"></script>\n';
if (!htmlContent.includes('araujoUndefeatedAerialCombatCardImage.js')) {
  const targetLine = '<script src="./src/data/dejongCardImage.js"></script>';
  htmlContent = htmlContent.replace(targetLine, scriptTag + '  ' + targetLine);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with araujoUndefeatedAerialCombatCardImage.js');
} else {
  console.log('araujoUndefeatedAerialCombatCardImage.js already in index.html');
}

// 3. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

if (specialCardsCode.includes('card_ronald_araujo_undefeated_aerial_combat_ssr')) {
  console.log('card_ronald_araujo_undefeated_aerial_combat_ssr already present, removing old definition first...');
  const oldIdx = specialCardsCode.indexOf("id: 'card_ronald_araujo_undefeated_aerial_combat_ssr'");
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
    id: 'card_ronald_araujo_undefeated_aerial_combat_ssr',
    rank: 'SSR',
    cardType: 'スプリントCB',
    category: 'スプリントCB',
    name: 'ロナルド・アラウホ【不敗の空中戦】',
    getImageUrl: () => window.ARAUJO_UNDEFEATED_AERIAL_COMBAT_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: 'アジャイルクラッシャー',
      rank: '銀',
      description: '発動条件：絶好調　/　タックル・敏捷性UP'
    },
    playstyleBonus: {
      style: 'スプリントCB',
      percent: 35,
      bonuses: [
        { style: 'スプリントCB', percent: 35 }
      ]
    },
    stages: {
      '無凸': {
        '走力': 40.8,
        'パスカット': 21.7,
        'ジャンプ': 21.1,
        'マーク': 9.8,
        '敏捷性': 1.9,
        'スタミナ': 1.9,
        'タックル': 0.6,
        'ショートパス': 0.6
      },
      '1凸': {
        '走力': 46.1,
        'パスカット': 24.5,
        'ジャンプ': 23.8,
        'マーク': 11.1,
        '敏捷性': 2.2,
        'スタミナ': 2.2,
        'タックル': 0.7,
        'ショートパス': 0.7
      },
      '2凸': {
        '走力': 51.4,
        'パスカット': 27.3,
        'ジャンプ': 26.5,
        'マーク': 12.4,
        '敏捷性': 2.4,
        'スタミナ': 2.4,
        'タックル': 0.8,
        'ショートパス': 0.8
      },
      '3凸': {
        '走力': 56.7,
        'パスカット': 30.1,
        'ジャンプ': 29.2,
        'マーク': 13.7,
        '敏捷性': 2.7,
        'スタミナ': 2.7,
        'タックル': 0.9,
        'ショートパス': 0.9
      },
      '完凸': {
        '走力': 62.0,
        'パスカット': 33.0,
        'ジャンプ': 32.0,
        'マーク': 15.0,
        '敏捷性': 3.0,
        'スタミナ': 3.0,
        'タックル': 1.0,
        'ショートパス': 1.0
      }
    }
  }
];
`;

const updatedCode = prefix + cardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended Ronald Araújo card to specialCardsData.js');

// 4. Test evaluation via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === 'card_ronald_araujo_undefeated_aerial_combat_ssr');
if (addedCard) {
  console.log('VERIFIED: Added card found!');
  console.log('Card Name:', addedCard.name);
  console.log('Card Image URL set:', !!addedCard.getImageUrl());
  console.log('Stages count:', Object.keys(addedCard.stages).length);
} else {
  console.error('ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
