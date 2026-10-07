const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Special Training Card: ライアン・フラーフェンベルフ【万能の赤きコンダクター】 ===');

// 1. Process Image to Base64
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a91503b1-d248-4c66-ae2c-12dce74a4b81\\.user_uploaded\\media_1791348557144.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Create src/data/ryanGravenberchCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'ryanGravenberchCardImage.js');
const imgJsContent = `window.RYAN_GRAVENBERCH_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created ryanGravenberchCardImage.js successfully.');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/ryanGravenberchCardImage.js"></script>\n';

if (!htmlContent.includes('ryanGravenberchCardImage.js')) {
  const targetTag = '<script src="./src/data/specialCardsData.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, scriptTag + '  ' + targetTag);
  } else {
    console.error('Could not find specialCardsData.js tag in index.html');
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with ryanGravenberchCardImage.js');
} else {
  console.log('ryanGravenberchCardImage.js already present in index.html');
}

// 4. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

const cardId = 'card_ryan_gravenberch_red_conductor_ssr';

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
    cardType: 'セントラルMF',
    category: 'セントラルMF',
    name: 'ライアン・フラーフェンベルフ【万能の赤きコンダクター】',
    getImageUrl: () => window.RYAN_GRAVENBERCH_CARD_IMAGE || '',
    skill: {
      type: 'アビリティ',
      name: '遮断のアーチ',
      rank: '金',
      description: '発動条件：絶好調　/　ロングパス・パスカット・コンタクトUP'
    },
    playstyleBonus: {
      style: 'セントラルMF',
      displayText: 'セントラルMF 40% UP',
      percent: 40,
      bonuses: [
        { style: 'セントラルMF', percent: 40 }
      ]
    },
    stages: {
      '無凸': {
        'コンタクト': 33.6,
        'キック精度': 21.7,
        'キック力': 18.4,
        'スタミナ': 13.8,
        'パスカット': 7.2,
        'ショートパス': 1.9,
        'キープ力': 1.3,
        '敏捷性': 0.6
      },
      '1凸': {
        'コンタクト': 37.9,
        'キック精度': 24.5,
        'キック力': 20.8,
        'スタミナ': 15.6,
        'パスカット': 8.1,
        'ショートパス': 2.2,
        'キープ力': 1.4,
        '敏捷性': 0.7
      },
      '2凸': {
        'コンタクト': 42.3,
        'キック精度': 27.3,
        'キック力': 23.2,
        'スタミナ': 17.4,
        'パスカット': 9.1,
        'ショートパス': 2.4,
        'キープ力': 1.6,
        '敏捷性': 0.8
      },
      '3凸': {
        'コンタクト': 46.6,
        'キック精度': 30.1,
        'キック力': 25.6,
        'スタミナ': 19.2,
        'パスカット': 10,
        'ショートパス': 2.7,
        'キープ力': 1.8,
        '敏捷性': 0.9
      },
      '完凸': {
        'コンタクト': 51,
        'キック精度': 33,
        'キック力': 28,
        'スタミナ': 21,
        'パスカット': 11,
        'ショートパス': 3,
        'キープ力': 2,
        '敏捷性': 1
      }
    }
  }
];
`;

const updatedCode = prefix + newCardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended ライアン・フラーフェンベルフ【万能の赤きコンダクター】 to specialCardsData.js');

// 5. Update 金アビリティ 「遮断のアーチ」 Description in codebase if any
const newArchDesc = '発動条件：絶好調　/　ロングパス・パスカット・コンタクトUP';
['src/data/specialCardsData.js', 'src/data/mockData.js'].forEach(relPath => {
  const fullP = path.join(__dirname, relPath);
  if (fs.existsSync(fullP)) {
    let c = fs.readFileSync(fullP, 'utf-8');
    let cnt = 0;
    c = c.replace(/(name:\s*['"]遮断のアーチ['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
      cnt++;
      return p1 + newArchDesc + p3;
    });
    fs.writeFileSync(fullP, c, 'utf-8');
    console.log(`Updated ${cnt} occurrence(s) of 遮断のアーチ in ${relPath}`);
  }
});

// 6. Verify via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const finalScCode = fs.readFileSync(specialCardsPath, 'utf-8');
vm.runInContext(imgJsContent, sandbox);
vm.runInContext(finalScCode, sandbox);

console.log('\n=== Verification ===');
console.log('Total special cards count:', sandbox.window.OFFICIAL_SPECIAL_CARDS.length);
const addedCard = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === cardId);
if (addedCard) {
  console.log('✅ CARD VERIFICATION SUCCESSFUL!');
  console.log('Card ID:', addedCard.id);
  console.log('Card Name:', addedCard.name);
  console.log('Rank:', addedCard.rank);
  console.log('Card Type:', addedCard.cardType);
  console.log('Ability Name:', addedCard.skill.name);
  console.log('Ability Type:', addedCard.skill.type);
  console.log('Ability Rank:', addedCard.skill.rank);
  console.log('Ability Description:', addedCard.skill.description);
  console.log('Bonuses:', addedCard.playstyleBonus.bonuses);
} else {
  console.error('❌ ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
