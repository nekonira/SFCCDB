global.window = {};
require('../src/data/specialCardsData.js');
const cards = global.window.OFFICIAL_SPECIAL_CARDS || [];

console.log('Inspecting all cards for ability rank fields:');

const abilitiesList = [];
cards.forEach((c, idx) => {
  if (c.skill) {
    abilitiesList.push({
      cardName: c.name,
      cardRank: c.rank,
      skillType: c.skill.type,
      skillName: c.skill.name,
      skillRank: c.skill.rank,
      desc: c.skill.description
    });
  }
  if (c.ability) {
    abilitiesList.push({
      cardName: c.name,
      cardRank: c.rank,
      abilityProp: c.ability
    });
  }
  if (c.abilities) {
    abilitiesList.push({
      cardName: c.name,
      cardRank: c.rank,
      abilitiesProp: c.abilities
    });
  }
});

console.log('Total card ability entries:', abilitiesList.length);
console.log('First 20 items:');
console.log(JSON.stringify(abilitiesList.slice(0, 20), null, 2));

// Check missing ranks
const missingRankItems = abilitiesList.filter(item => {
  if (item.skillType && item.skillType !== 'スキル') {
    return !item.skillRank;
  }
  return false;
});

console.log('\nAbilities with missing rank property:', missingRankItems.length);
missingRankItems.slice(0, 10).forEach(item => {
  console.log(`- Card: ${item.cardName}, SkillName: ${item.skillName}, Desc: ${item.desc}`);
});
