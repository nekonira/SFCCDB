const fs = require('fs');
global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS || [];

console.log("=== ALL CARDS PLAYSTYLE BONUS DEFINITIONS ===");

cards.forEach((c, idx) => {
  if (!c.playstyleBonus) {
    console.log(`[Card #${idx+1}] ID: ${c.id} | Name: ${c.name} | playstyleBonus: null`);
    return;
  }
  console.log(`[Card #${idx+1}] ID: ${c.id} | Name: ${c.name}`);
  console.log(`   style: "${c.playstyleBonus.style}"`);
  console.log(`   displayText: "${c.playstyleBonus.displayText || ''}"`);
  console.log(`   percent: ${c.playstyleBonus.percent}`);
  console.log(`   bonuses:`, JSON.stringify(c.playstyleBonus.bonuses));
});
