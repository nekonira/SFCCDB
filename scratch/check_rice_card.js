global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS;
const riceCard = cards.find(c => c.name.includes('デクラン・ライス'));
console.log("Rice Card:", riceCard.name);
console.log(JSON.stringify(riceCard.playstyleBonus, null, 2));
