const fs = require('fs');
global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS || [];

console.log("Total cards:", cards.length);

cards.forEach((c, idx) => {
  if (!c.playstyleBonus) return;
  console.log(`\nCard [${idx+1}]: ${c.name}`);
  console.log(`  style: "${c.playstyleBonus.style}"`);
  console.log(`  percent: ${c.playstyleBonus.percent}`);
  console.log(`  bonuses:`, JSON.stringify(c.playstyleBonus.bonuses));
});
