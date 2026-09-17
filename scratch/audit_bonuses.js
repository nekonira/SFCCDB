const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS || [];
const targetStyles = new Set();

cards.forEach(c => {
  if (!c.playstyleBonus) return;
  if (c.playstyleBonus.bonuses && Array.isArray(c.playstyleBonus.bonuses)) {
    c.playstyleBonus.bonuses.forEach(b => targetStyles.add(b.style));
  }
  if (c.playstyleBonus.style) {
    targetStyles.add(c.playstyleBonus.style);
  }
});

console.log("All Unique Bonus Target Strings in Cards:");
Array.from(targetStyles).sort().forEach(s => console.log(" -", s));
