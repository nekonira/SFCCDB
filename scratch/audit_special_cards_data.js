const fs = require('fs');
global.window = global;
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS || [];

console.log("=== AUDITING ALL CARDS FOR STYLE vs BONUSES MISMATCH ===");

let mismatchCount = 0;

cards.forEach((c, idx) => {
  if (!c.playstyleBonus) return;

  const styleText = c.playstyleBonus.style || '';
  const displayText = c.playstyleBonus.displayText || '';
  const bonuses = c.playstyleBonus.bonuses || [];

  const bonusStyles = bonuses.map(b => b.style).join(' / ');

  // Check if styleText claims something different from bonuses array
  let isMismatch = false;

  bonuses.forEach(b => {
    const s = b.style;
    if (!styleText.includes(s) && !displayText.includes(s)) {
      isMismatch = true;
    }
  });

  if (isMismatch) {
    mismatchCount++;
    console.log(`\n[MISMATCH #${mismatchCount}] Card ID: ${c.id}`);
    console.log(`  Name: ${c.name}`);
    console.log(`  playstyleBonus.style: "${styleText}"`);
    console.log(`  playstyleBonus.displayText: "${displayText}"`);
    console.log(`  playstyleBonus.bonuses:`, JSON.stringify(bonuses));
  }
});

console.log(`\nTotal cards with style vs bonuses mismatch in specialCardsData.js: ${mismatchCount}`);
