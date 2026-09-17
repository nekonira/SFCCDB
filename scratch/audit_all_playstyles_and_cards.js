const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const players = global.INITIAL_PLAYERS;
const cards = global.OFFICIAL_SPECIAL_CARDS;

console.log("Total players:", players.length);

// Group players by playStyle
const stylePlayerMap = {};
players.forEach(p => {
  const ps = p.playStyle || 'なし';
  if (!stylePlayerMap[ps]) stylePlayerMap[ps] = [];
  stylePlayerMap[ps].push(p);
});

console.log("\nAll Unique Player PlayStyles in mockData.js:");
Object.keys(stylePlayerMap).sort().forEach(ps => {
  console.log(` - "${ps}" (${stylePlayerMap[ps].length} players)`);
});
