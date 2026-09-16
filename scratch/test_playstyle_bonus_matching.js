global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

// Test player: Pele (Pos: CF, playStyle: ラインブレイカー, nationality: ブラジル)
const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log('Player Pele details:', {
  name: pele.name,
  mainPosition: pele.mainPosition,
  playStyle: pele.playStyle,
  category: pele.category,
  nationality: pele.nationality
});

function getBonusMultiplier(player, card) {
  if (!player || !card || !card.playstyleBonus) return 1.0;
  let mult = 1.0;

  const processStyleObj = (styleStr, percentVal) => {
    if (!styleStr) return;
    const parts = styleStr.split('/');
    parts.forEach(part => {
      const targetStyle = part.replace(/\d+%/g, '').trim();
      if (!targetStyle) return;

      const matchStyle = player.playStyle && player.playStyle.includes(targetStyle);
      const matchPos = (player.mainPosition && player.mainPosition.includes(targetStyle)) || (player.category && player.category.includes(targetStyle));
      const matchNation = player.nationality && player.nationality.includes(targetStyle);

      if (matchStyle || matchPos || matchNation) {
        mult += (Number(percentVal) / 100);
      }
    });
  };

  if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
    card.playstyleBonus.bonuses.forEach(b => {
      processStyleObj(b.style, b.percent);
    });
  } else if (card.playstyleBonus.style) {
    processStyleObj(card.playstyleBonus.style, card.playstyleBonus.percent);
  }

  return mult;
}

console.log('\nTesting cards matching Pele:');
officialCards.forEach(c => {
  const mult = getBonusMultiplier(pele, c);
  if (mult > 1.0) {
    console.log(`- Card: ${c.name} (Bonus: ${JSON.stringify(c.playstyleBonus)}) -> Multiplier: ${mult}x (+${Math.round((mult - 1) * 100)}%)`);
  }
});
