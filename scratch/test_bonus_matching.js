const fs = require('fs');
const path = require('path');

// Mock browser globals
global.window = global;

// Load data
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const players = global.INITIAL_PLAYERS;
const cards = global.OFFICIAL_SPECIAL_CARDS;

console.log(`Total Players: ${players.length}`);
console.log(`Total Cards: ${cards.length}`);

// Extract all unique playStyles, mainPositions, categories, nationalities from players
const playerStyles = new Set();
const playerPositions = new Set();
const playerCategories = new Set();
const playerNations = new Set();

players.forEach(p => {
  if (p.playStyle) playerStyles.add(p.playStyle);
  if (p.mainPosition) playerPositions.add(p.mainPosition);
  if (p.category) playerCategories.add(p.category);
  if (p.nationality) playerNations.add(p.nationality);
});

console.log('\n--- Unique Player PlayStyles ---');
console.log(Array.from(playerStyles).sort());

console.log('\n--- Unique Player Positions ---');
console.log(Array.from(playerPositions).sort());

console.log('\n--- Unique Player Categories ---');
console.log(Array.from(playerCategories).sort());

console.log('\n--- Unique Player Nationalities ---');
console.log(Array.from(playerNations).sort());

// Extract all unique card bonus styles
const cardBonusStyles = new Set();
cards.forEach(c => {
  if (c.playstyleBonus) {
    if (c.playstyleBonus.style) cardBonusStyles.add(c.playstyleBonus.style);
    if (Array.isArray(c.playstyleBonus.bonuses)) {
      c.playstyleBonus.bonuses.forEach(b => cardBonusStyles.add(b.style));
    }
  }
});

console.log('\n--- Unique Card Bonus Styles ---');
console.log(Array.from(cardBonusStyles).sort());
