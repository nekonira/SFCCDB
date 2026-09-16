global.window = {};
require('../src/data/mockData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];

const fs = require('fs');
const appJs = fs.readFileSync('src/app.js', 'utf8');

const startIdx = appJs.indexOf('var OFFSETS =');
const endIdx = appJs.indexOf('var PLAY_TENDENCY_ITEMS =');

const code = appJs.slice(startIdx, endIdx);
(0, eval)(code);

const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log(`Testing Pele stat scaling across player ranks:`);

const rarities = ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
rarities.forEach(r => {
  const adjusted = getAdjustedPlayer(pele, r, false);
  console.log(`Rank ${r}: 決定力 ${adjusted.detailStats.shoot.finishing} (addedOffset: +${adjusted.addedOffset})`);
});

const maxPele = getAdjustedPlayer(pele, '☆5', true);
console.log(`Rank 🔥 ☆5 (最大強化): 決定力 ${maxPele.detailStats.shoot.finishing}`);
