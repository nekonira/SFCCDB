const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Special Training Card: 肉2倍盛り！テリヤキチキン【ピザーラ】 ===');

// 1. Process Image to Base64
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\55955571-0e1a-4ad5-a5a1-40a6b8820f75\\.user_uploaded\\media_1790310689584.jpg';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

// 2. Create src/data/teriyakiChickenPizzalaCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'teriyakiChickenPizzalaCardImage.js');
const imgJsContent = `window.TERIYAKI_CHICKEN_PIZZALA_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created teriyakiChickenPizzalaCardImage.js successfully.');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/teriyakiChickenPizzalaCardImage.js"></script>\n';

if (!htmlContent.includes('teriyakiChickenPizzalaCardImage.js')) {
  const targetTag = '<script src="./src/data/spicySausagePizzalaCardImage.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, targetTag + '\n' + scriptTag.trimEnd());
  } else {
    const specialDataTag = '<script src="./src/data/specialCardsData.js"></script>';
    htmlContent = htmlContent.replace(specialDataTag, scriptTag + '  ' + specialDataTag);
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with teriyakiChickenPizzalaCardImage.js');
} else {
  console.log('teriyakiChickenPizzalaCardImage.js already present in index.html');
}

// 4. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

const cardId = 'card_nikuni_pizzala_teriyaki_chicken_ssr';

if (specialCardsCode.includes(cardId)) {
  console.log(`Card ${cardId} already present, removing old definition...`);
  const oldIdx = specialCardsCode.indexOf(`id: '${cardId}'`);
  const braceBefore = specialCardsCode.lastIndexOf('{', oldIdx);
  
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
    cardType: 'サイドアタッカー',
    category: 'サイドアタッカー',
    name: '肉2倍盛り！テリヤキチキン【ピザーラ】',
    getImageUrl: () => window.TERIYAKI_CHICKEN_PIZZALA_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: 'テリチキクロス',
      rank: '銅',
      description: '発動エリア：前左右　/　発動条件：AM・RW・LW・CFの選手へのロングパス時　/　ロングパス・キック精度UP　/　成功時に受け手のシュート発生確率UP'
    },
    playstyleBonus: {
      style: 'サイドアタッカー',
      displayText: 'サイドアタッカー 30% UP',
      percent: 30,
      bonuses: [
        { style: 'サイドアタッカー', percent: 30 }
      ]
    },
    stages: {
      '無凸': {
        '走力': 19.7,
        'ボールタッチ': 13.8,
        '敏捷性': 12.5,
        'コンタクト': 9.8,
        'スタミナ': 7.9,
        '決定力': 6.6,
        'キープ力': 1.3,
        'キック力': 0.6
      },
      '1凸': {
        '走力': 22.3,
        'ボールタッチ': 15.6,
        '敏捷性': 14.1,
        'コンタクト': 11.1,
        'スタミナ': 8.9,
        '決定力': 7.4,
        'キープ力': 1.4,
        'キック力': 0.7
      },
      '2凸': {
        '走力': 24.8,
        'ボールタッチ': 17.4,
        '敏捷性': 15.7,
        'コンタクト': 12.4,
        'スタミナ': 9.9,
        '決定力': 8.3,
        'キープ力': 1.6,
        'キック力': 0.8
      },
      '3凸': {
        '走力': 27.4,
        'ボールタッチ': 19.2,
        '敏捷性': 17.3,
        'コンタクト': 13.7,
        'スタミナ': 10.9,
        '決定力': 9.1,
        'キープ力': 1.8,
        'キック力': 0.9
      },
      '完凸': {
        '走力': 30,
        'ボールタッチ': 21,
        '敏捷性': 19,
        'コンタクト': 15,
        'スタミナ': 12,
        '決定力': 10,
        'キープ力': 2,
        'キック力': 1
      }
    }
  }
];
`;

const updatedCode = prefix + newCardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended 肉2倍盛り！テリヤキチキン【ピザーラ】 to specialCardsData.js');

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
