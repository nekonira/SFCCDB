const fs = require('fs');
global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS || [];

function getCardBonusList(card) {
  if (!card || !card.playstyleBonus) return [];

  if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses) && card.playstyleBonus.bonuses.length > 0) {
    return card.playstyleBonus.bonuses;
  }

  const rawStyle = card.playstyleBonus.style || '';
  const totalPercent = card.playstyleBonus.percent || 0;
  
  if (!rawStyle) return [];

  const parts = rawStyle.split('/');
  const result = [];

  parts.forEach(part => {
    const match = part.match(/([^\d%]+)\s*(\d+)%/);
    if (match) {
      result.push({
        style: match[1].trim(),
        percent: Number(match[2])
      });
    } else {
      result.push({
        style: part.trim(),
        percent: totalPercent
      });
    }
  });

  return result;
}

console.log("=== AUDITING ALL CARD BONUS LISTS ===");

cards.forEach(c => {
  if (!c.playstyleBonus) return;
  const list = getCardBonusList(c);
  console.log(`Card: "${c.name}"`);
  console.log(`  Raw Style: "${c.playstyleBonus.style}" (percent: ${c.playstyleBonus.percent})`);
  console.log(`  Parsed List:`, JSON.stringify(list));
});
