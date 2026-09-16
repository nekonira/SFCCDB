global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const playerStyles = new Set();
PLAYERS.forEach(p => { if (p.playStyle) playerStyles.add(p.playStyle); });

const cardStyles = new Set();
officialCards.forEach(c => {
  if (c.playstyleBonus) {
    if (c.playstyleBonus.style) cardStyles.add(c.playstyleBonus.style);
    if (c.playstyleBonus.bonuses) {
      c.playstyleBonus.bonuses.forEach(b => cardStyles.add(b.style));
    }
  }
});

console.log('Player styles in mockData.js:', Array.from(playerStyles));
console.log('Card styles in specialCardsData.js:', Array.from(cardStyles));
