const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Special Training Card: クリスティアーノ・ロナウド【巨星の瞬き】 ===');

// 1. Process Image to Base64
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a91503b1-d248-4c66-ae2c-12dce74a4b81\\.user_uploaded\\media_1791346684916.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Create src/data/cristianoRonaldoKyoseiNoManatakiCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'cristianoRonaldoKyoseiNoManatakiCardImage.js');
const imgJsContent = `window.CRISTIANO_RONALDO_KYOSEI_NO_MANATAKI_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created cristianoRonaldoKyoseiNoManatakiCardImage.js successfully.');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/cristianoRonaldoKyoseiNoManatakiCardImage.js"></script>\n';

if (!htmlContent.includes('cristianoRonaldoKyoseiNoManatakiCardImage.js')) {
  const targetTag = '<script src="./src/data/specialCardsData.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, scriptTag + '  ' + targetTag);
  } else {
    console.error('Could not find specialCardsData.js tag in index.html');
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with cristianoRonaldoKyoseiNoManatakiCardImage.js');
} else {
  console.log('cristianoRonaldoKyoseiNoManatakiCardImage.js already present in index.html');
}

// 4. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

const cardId = 'card_cristiano_ronaldo_kyosei_no_manataki_ssr';

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
    cardType: 'ストライカー',
    category: 'ストライカー',
    name: 'クリスティアーノ・ロナウド【巨星の瞬き】',
    getImageUrl: () => window.CRISTIANO_RONALDO_KYOSEI_NO_MANATAKI_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '上空の覇者',
      rank: '金',
      description: '上空の覇者'
    },
    playstyleBonus: {
      style: 'ストライカー',
      displayText: 'ストライカー 15% UP',
      percent: 15,
      bonuses: [
        { style: 'ストライカー', percent: 15 }
      ]
    },
    stages: {
      '無凸': {
        '決定力': 39.5,
        'ジャンプ': 19.7,
        '冷静さ': 16.5,
        'コンタクト': 13.1,
        'キック力': 9.8,
        'キープ力': 9.8,
        '走力': 6.6,
        '突破力': 3.2
      },
      '1凸': {
        '決定力': 44.6,
        'ジャンプ': 22.3,
        '冷静さ': 18.6,
        'コンタクト': 14.8,
        'キック力': 11.1,
        'キープ力': 11.1,
        '走力': 7.4,
        '突破力': 3.7
      },
      '2凸': {
        '決定力': 49.7,
        'ジャンプ': 24.8,
        '冷静さ': 20.7,
        'コンタクト': 16.5,
        'キック力': 12.4,
        'キープ力': 12.4,
        '走力': 8.3,
        '突破力': 4.1
      },
      '3凸': {
        '決定力': 54.8,
        'ジャンプ': 27.4,
        '冷静さ': 22.8,
        'コンタクト': 18.2,
        'キック力': 13.7,
        'キープ力': 13.7,
        '走力': 9.1,
        '突破力': 4.5
      },
      '完凸': {
        '決定力': 60,
        'ジャンプ': 30,
        '冷静さ': 25,
        'コンタクト': 20,
        'キック力': 15,
        'キープ力': 15,
        '走力': 10,
        '突破力': 5
      }
    }
  }
];
`;

const updatedCode = prefix + newCardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended クリスティアーノ・ロナウド【巨星の瞬き】 to specialCardsData.js');

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
  console.log('Skill Rank:', addedCard.skill.rank);
  console.log('Bonuses:', addedCard.playstyleBonus.bonuses);
  console.log('Image Data set length:', addedCard.getImageUrl().length);
} else {
  console.error('❌ ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
