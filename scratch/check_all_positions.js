const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');

const players = global.INITIAL_PLAYERS;
const positions = new Set();
const playstyles = new Set();

players.forEach(p => {
  if (p.mainPosition) positions.add(p.mainPosition);
  if (p.playStyle) playstyles.add(p.playStyle);
});

console.log("All mainPositions in mockData.js:");
Array.from(positions).sort().forEach(pos => console.log(" -", pos));

console.log("\nAll playStyles in mockData.js:");
Array.from(playstyles).sort().forEach(ps => console.log(" -", ps));
