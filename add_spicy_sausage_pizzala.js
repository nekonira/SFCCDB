const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Special Training Card: 肉2倍盛り！スパイシーソーセージ【ピザーラ】 ===');

// 1. Process Image to Base64
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\55955571-0e1a-4ad5-a5a1-40a6b8820f75\\.user_uploaded\\media_1790309849363.jpg';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 2. Create src/data/spicySausagePizzalaCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'spicySausagePizzalaCardImage.js');
const imgJsContent = `window.SPICY_SAUSAGE_PIZZALA_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created spicySausagePizzalaCardImage.js successfully.');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/spicySausagePizzalaCardImage.js"></script>\n';

if (!htmlContent.includes('spicySausagePizzalaCardImage.js')) {
  const targetTag = '<script src="./src/data/pizzalaBulgogiCardImage.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const specialDataTag = '<script src="./src/data/specialCardsData.js"></script>';
    htmlContent = htmlContent.replace(specialDataTag, scriptTag + '  ' + specialDataTag);
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with spicySausagePizzalaCardImage.js');
} else {
  console.log('spicySausagePizzalaCardImage.js already present in index.html');
}

// 4. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

const cardId = 'card_nikuni_pizzala_spicy_sausage_ssr';

if (specialCardsCode.includes(cardId)) {
  console.log(`Card ${cardId} already present, removing old definition...`);
  const oldIdx = specialCardsCode.indexOf(`id: '${cardId}'`);
  const braceBefore = specialCardsCode.lastIndexOf('{', oldIdx);
  
  // Find matching closing brace for this card object
  let braceCount = 1;
  let closingBraceIdx = braceBefore + 1;
  while (braceCount > 0 && closingBraceIdx < specialCardsCode.length) {
    if (specialCardsCode[closingBraceIdx] === '{') braceCount++;
    if (specialCardsCode[closingBraceIdx] === '}') braceCount--;
    closingBraceIdx++;
  }
  if (specialCardsCode[closingBraceIdx] === ',') closingBraceIdx++;
  
  specialCardsCode = specialCardsCode.substring(0, braceBefore) + specialCardsCode.substring(closingBraceIdx);
}

const lastBracketIdx = specialCardsCode.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error('Could not find ]; end of array in specialCardsData.js');
  process.exit(1);
}

const prefix = specialCardsCode.substring(0, lastBracketIdx).trimEnd();

const newCardObjStr = `,
  {
    id: '${cardId}',
    rank: 'SSR',
    cardType: 'ストライカー',
    category: 'ストライカー',
    name: '肉2倍盛り！スパイシーソーセージ【ピザーラ】',
    getImageUrl: () => window.SPICY_SAUSAGE_PIZZALA_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: 'スパイシーシュート',
      rank: '銅',
      description: '発動エリア：前中　/　発動条件：シュート時　/　決定力・コンタクトUP'
    },
    playstyleBonus: {
      style: 'ストライカー',
      displayText: 'ストライカー 20% UP / 日本 10% UP',
      percent: 30,
      bonuses: [
        { style: 'ストライカー', percent: 20 },
        { style: '日本', percent: 10 }
      ]
    },
    stages: {
      '無凸': {
        '決定力': 18.4,
        'コンタクト': 18.4,
        '冷静さ': 10.5,
        'ジャンプ': 9.8,
        '敏捷性': 6.6,
        '走力': 1.3,
        'スタミナ': 0.6
      },
      '1凸': {
        '決定力': 20.8,
        'コンタクト': 20.8,
        '冷静さ': 11.9,
        'ジャンプ': 11.1,
        '敏捷性': 7.4,
        '走力': 1.4,
        'スタミナ': 0.7
      },
      '2凸': {
        '決定力': 23.2,
        'コンタクト': 23.2,
        '冷静さ': 13.2,
        'ジャンプ': 12.4,
        '敏捷性': 8.3,
        '走力': 1.6,
        'スタミナ': 0.8
      },
      '3凸': {
        '決定力': 25.6,
        'コンタクト': 25.6,
        '冷静さ': 14.6,
        'ジャンプ': 13.7,
        '敏捷性': 9.1,
        '走力': 1.8,
        'スタミナ': 0.9
      },
      '完凸': {
        '決定力': 28,
        'コンタクト': 28,
        '冷静さ': 16,
        'ジャンプ': 15,
        '敏捷性': 10,
        '走力': 2,
        'スタミナ': 1
      }
    }
  }
];
`;

const updatedCode = prefix + newCardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended 肉2倍盛り！スパイシーソーセージ【ピザーラ】 to specialCardsData.js');

// 5. Verify via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(imgJsContent, sandbox);
vm.runInContext(updatedCode, sandbox);

console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === cardId);
if (addedCard) {
  console.log('✅ VERIFICATION SUCCESSFUL!');
  console.log('Card ID:', addedCard.id);
  console.log('Card Name:', addedCard.name);
  console.log('Rank:', addedCard.rank);
  console.log('Card Type:', addedCard.cardType);
  console.log('Skill Name:', addedCard.skill.name);
  console.log('Skill Description:', addedCard.skill.description);
  console.log('Bonuses:', addedCard.playstyleBonus.bonuses);
  console.log('Image Data set length:', addedCard.getImageUrl().length);
} else {
  console.error('❌ ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
