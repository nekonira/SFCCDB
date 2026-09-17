const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS || [];
console.log("Total cards:", cards.length);

const bonuses = cards.filter(c => c.playstyleBonus).map(c => ({
  id: c.id,
  name: c.name,
  bonus: c.playstyleBonus
}));

console.log("Cards with playstyleBonus:", bonuses.length);
console.log(JSON.stringify(bonuses, null, 2));
