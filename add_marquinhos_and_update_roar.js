const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Registering Special Training Card: マルキーニョス【真紅と紺碧の統率者】 ===');

// 1. Process Image to Base64
const imgPath = 'C:\\Users\\nekon\\.gemini\\antigravity-ide\\brain\\a91503b1-d248-4c66-ae2c-12dce74a4b81\\.user_uploaded\\media_1791349612977.png';
if (!fs.existsSync(imgPath)) {
  console.error('Uploaded image file not found at:', imgPath);
  process.exit(1);
}

const imgBuffer = fs.readFileSync(imgPath);
const base64Img = 'data:image/png;base64,' + imgBuffer.toString('base64');

// 2. Create src/data/marquinhosCommanderCardImage.js
const imgJsPath = path.join(__dirname, 'src', 'data', 'marquinhosCommanderCardImage.js');
const imgJsContent = `window.MARQUINHOS_COMMANDER_CARD_IMAGE = "${base64Img}";\n`;
fs.writeFileSync(imgJsPath, imgJsContent, 'utf-8');
console.log('Created marquinhosCommanderCardImage.js successfully.');

// 3. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const scriptTag = '  <script src="./src/data/marquinhosCommanderCardImage.js"></script>\n';

if (!htmlContent.includes('marquinhosCommanderCardImage.js')) {
  const targetTag = '<script src="./src/data/specialCardsData.js"></script>';
  if (htmlContent.includes(targetTag)) {
    htmlContent = htmlContent.replace(targetTag, scriptTag + '  ' + targetTag);
  } else {
    console.error('Could not find specialCardsData.js tag in index.html');
  }
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log('Updated index.html with marquinhosCommanderCardImage.js');
} else {
  console.log('marquinhosCommanderCardImage.js already present in index.html');
}

// 4. Update src/data/specialCardsData.js
const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

const cardId = 'card_marquinhos_commander_ssr';

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
    cardType: 'スプリントCB',
    category: 'スプリントCB',
    name: 'マルキーニョス【真紅と紺碧の統率者】',
    getImageUrl: () => window.MARQUINHOS_COMMANDER_CARD_IMAGE || '',
    skill: {
      type: 'スキル',
      name: '一閃の咆哮',
      rank: '金',
      description: '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP　/　発動時にLW・RW・LM・RMの選手ボールタッチ・キープ力が一定時間UP、成功時に自身のロングパス発生確率UP'
    },
    playstyleBonus: {
      style: 'スプリントCB',
      displayText: 'スプリントCB 20% UP',
      percent: 20,
      bonuses: [
        { style: 'スプリントCB', percent: 20 }
      ]
    },
    stages: {
      '無凸': {
        'タックル': 42.8,
        'マーク': 18.9,
        '敏捷性': 14.5,
        'コンタクト': 11.2,
        'スタミナ': 6.6,
        'ジャンプ': 5.2,
        'キック力': 1.3,
        'パスカット': 1.3
      },
      '1凸': {
        'タックル': 48.4,
        'マーク': 21.1,
        '敏捷性': 16.3,
        'コンタクト': 12.6,
        'スタミナ': 7.4,
        'ジャンプ': 5.9,
        'キック力': 1.4,
        'パスカット': 1.4
      },
      '2凸': {
        'タックル': 53.9,
        'マーク': 24.3,
        '敏捷性': 18.2,
        'コンタクト': 14.1,
        'スタミナ': 8.3,
        'ジャンプ': 6.6,
        'キック力': 1.6,
        'パスカット': 1.6
      },
      '3凸': {
        'タックル': 59.4,
        'マーク': 30.7,
        '敏捷性': 20.1,
        'コンタクト': 15.5,
        'スタミナ': 9.1,
        'ジャンプ': 7.3,
        'キック力': 1.8,
        'パスカット': 1.8
      },
      '完凸': {
        'タックル': 65,
        'マーク': 34,
        '敏捷性': 22,
        'コンタクト': 17,
        'スタミナ': 10,
        'ジャンプ': 8,
        'キック力': 2,
        'パスカット': 2
      }
    }
  }
];
`;

const updatedCode = prefix + newCardObjStr;
fs.writeFileSync(specialCardsPath, updatedCode, 'utf-8');
console.log('Appended マルキーニョス【真紅と紺碧の統率者】 to specialCardsData.js');

// 5. Update 金スキル 「一閃の咆哮」 Description in codebase if any
const newRoarDesc = '発動エリア：中左中右・後左中右　/　発動条件：タックル時　/　タックル・コンタクト・マークUP　/　発動時にLW・RW・LM・RMの選手ボールタッチ・キープ力が一定時間UP、成功時に自身のロングパス発生確率UP';
['src/data/specialCardsData.js', 'src/data/mockData.js'].forEach(relPath => {
  const fullP = path.join(__dirname, relPath);
  if (fs.existsSync(fullP)) {
    let c = fs.readFileSync(fullP, 'utf-8');
    let cnt = 0;
    c = c.replace(/(name:\s*['"]一閃の咆哮['"][\s]*,[\s]*rank:\s*['"]金['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
      cnt++;
      return p1 + newRoarDesc + p3;
    });
    fs.writeFileSync(fullP, c, 'utf-8');
    console.log(`Updated ${cnt} occurrence(s) of 一閃の咆哮 in ${relPath}`);
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
  console.log('Skill Name:', addedCard.skill.name);
  console.log('Skill Type:', addedCard.skill.type);
  console.log('Skill Rank:', addedCard.skill.rank);
  console.log('Skill Description:', addedCard.skill.description);
  console.log('Bonuses:', addedCard.playstyleBonus.bonuses);
} else {
  console.error('❌ ERROR: Card not found in OFFICIAL_SPECIAL_CARDS!');
  process.exit(1);
}
