global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS;
const card = cards.find(c => c.name.includes('チャルハノール'));
console.log("Card:", card.name);
console.log(JSON.stringify(card.playstyleBonus, null, 2));
