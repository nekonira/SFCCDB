global.window = {};
require('../src/data/specialCardsData.js');
const cards = global.window.OFFICIAL_SPECIAL_CARDS || [];

console.log('Total cards count:', cards.length);
if (cards.length > 0) {
  console.log('Sample card structure:');
  console.log(JSON.stringify(cards[0], null, 2));
}

// Collect unique skills and abilities
const skills = new Set();
const abilities = new Set();
cards.forEach(c => {
  if (c.skill && c.skill.name) skills.add(c.skill.name);
  if (c.ability) abilities.add(c.ability);
  if (c.abilities) {
    if (Array.isArray(c.abilities)) c.abilities.forEach(a => abilities.add(a));
    else if (typeof c.abilities === 'object') {
      Object.values(c.abilities).forEach(a => {
        if (typeof a === 'string') abilities.add(a);
        else if (a && a.name) abilities.add(a.name);
      });
    }
  }
});

console.log('\nSample Unique Skills:', Array.from(skills).slice(0, 15));
console.log('Sample Unique Abilities:', Array.from(abilities).slice(0, 15));
