global.window = {};
require('../src/data/specialCardsData.js');

const cards = global.window.OFFICIAL_SPECIAL_CARDS || [];
const peleCard = cards.find(c => c.name.includes('ペレ【キング・オブ・サッカー】'));

console.log('Verified Pele card stages in specialCardsData.js:');
console.log(JSON.stringify(peleCard.stages, null, 2));
