const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== Updating Special Training Card: マルキーニョス【真紅と紺碧の統率者】 Stats ===');

const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let specialCardsCode = fs.readFileSync(specialCardsPath, 'utf-8');

const cardId = 'card_marquinhos_commander_ssr';

if (!specialCardsCode.includes(cardId)) {
  console.error(`Card ${cardId} not found in specialCardsData.js!`);
  process.exit(1);
}

// Locate target card object and replace stages
const newStagesObj = `stages: {
      '無凸': {
        'タックル': 42.8,
        'マーク': 22.4,
        '敏捷性': 14.5,
        'コンタクト': 11.2,
        'スタミナ': 6.6,
        'ジャンプ': 5.2,
        'キック力': 1.3,
        'パスカット': 1.3
      },
      '1凸': {
        'タックル': 48.4,
        'マーク': 25.3,
        '敏捷性': 16.3,
        'コンタクト': 12.6,
        'スタミナ': 7.4,
        'ジャンプ': 5.9,
        'キック力': 1.4,
        'パスカット': 1.4
      },
      '2凸': {
        'タックル': 53.9,
        'マーク': 28.2,
        '敏捷性': 18.2,
        'コンタクト': 14.1,
        'スタミナ': 8.3,
        'ジャンプ': 6.6,
        'キック力': 1.6,
        'パスカット': 1.6
      },
      '3凸': {
        'タックル': 59.4,
        'マーク': 31.1,
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
    }`;

const oldCardIdx = specialCardsCode.indexOf(`id: '${cardId}'`);
const stagesStart = specialCardsCode.indexOf('stages: {', oldCardIdx);
const stagesEnd = specialCardsCode.indexOf('}', specialCardsCode.indexOf('完凸', stagesStart)) + 1;
const stagesFullEnd = specialCardsCode.indexOf('}', stagesEnd) + 1;

specialCardsCode = specialCardsCode.substring(0, stagesStart) + newStagesObj + specialCardsCode.substring(stagesFullEnd);
fs.writeFileSync(specialCardsPath, specialCardsCode, 'utf-8');
console.log('Successfully updated Marquinhos Commander stages in specialCardsData.js');

// Verify via Node VM
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(specialCardsCode, sandbox);

const card = sandbox.window.OFFICIAL_SPECIAL_CARDS.find(c => c.id === cardId);
if (card) {
  console.log('✅ VERIFICATION SUCCESSFUL!');
  console.log('Card:', card.name);
  console.log('無凸 マーク:', card.stages['無凸']['マーク']);
  console.log('1凸 マーク:', card.stages['1凸']['マーク']);
  console.log('2凸 マーク:', card.stages['2凸']['マーク']);
  console.log('3凸 マーク:', card.stages['3凸']['マーク']);
  console.log('完凸 マーク:', card.stages['完凸']['マーク']);
} else {
  console.error('❌ Card validation failed!');
  process.exit(1);
}
