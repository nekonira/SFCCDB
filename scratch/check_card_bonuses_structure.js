const fs = require('fs');
global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS;

cards.forEach(card => {
  if (!card.playstyleBonus) return;
  const pb = card.playstyleBonus;
  if (pb.style && pb.style.includes('/') && (!pb.bonuses || !Array.isArray(pb.bonuses))) {
    console.log(`CARD WITHOUT BONUSES ARRAY: ${card.name} | style: "${pb.style}"`);
  }
});
console.log('Done structure check.');
