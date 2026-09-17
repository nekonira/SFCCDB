const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');

const players = global.INITIAL_PLAYERS;
console.log("Total players in mockData:", players.length);

const bastonis = players.filter(p => p.name.includes('バストーニ'));
console.log("Bastoni entries:");
bastonis.forEach(p => console.log(` - ID: ${p.id}, Name: ${p.name}, Position: ${p.mainPosition}, PlayStyle: "${p.playStyle}", Nationality: ${p.nationality}`));

console.log("\nSample Players PlayStyle & MainPosition:");
players.slice(0, 20).forEach(p => {
  console.log(` - ${p.name} (${p.mainPosition} | ${p.playStyle} | ${p.nationality})`);
});
