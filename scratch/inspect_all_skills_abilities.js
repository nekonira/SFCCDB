global.window = {};
require('../src/data/specialCardsData.js');
const cards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const skillNames = new Set();
const abilityNames = new Set();
const cardTypes = new Set();

cards.forEach(c => {
  if (c.cardType) cardTypes.add(c.cardType);
  if (c.category) cardTypes.add(c.category);

  if (c.skill) {
    if (c.skill.type === 'スキル' || c.skill.type === 'シュート' || c.skill.type === 'パス' || c.skill.type === 'ドリブル' || c.skill.type === 'ディフェンス' || c.skill.type === 'GK' || c.skill.type === 'フィジカル') {
      if (c.skill.name) skillNames.add(c.skill.name);
    } else {
      if (c.skill.name) abilityNames.add(`${c.skill.rank || ''} ${c.skill.name}`.trim());
    }
  }
  if (c.ability) abilityNames.add(c.ability);
  if (c.abilities) {
    if (Array.isArray(c.abilities)) c.abilities.forEach(a => abilityNames.add(typeof a === 'string' ? a : a.name));
  }
});

console.log('Card Categories / Types:', Array.from(cardTypes));
console.log('Skills count:', skillNames.size, 'Abilities count:', abilityNames.size);
console.log('All Skills:', Array.from(skillNames).sort());
console.log('All Abilities:', Array.from(abilityNames).sort());
