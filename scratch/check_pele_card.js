global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS;
const peleCard = cards.find(c => c.name.includes('ペレ'));
console.log("Pele Card:", peleCard.name);
console.log(JSON.stringify(peleCard.playstyleBonus, null, 2));
