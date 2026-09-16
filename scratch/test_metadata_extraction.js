global.window = {};
require('../src/data/specialCardsData.js');
const cards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const abilityMap = new Map();
const skillMap = new Map();

cards.forEach(c => {
  if (!c || !c.skill) return;
  const s = c.skill;
  const rank = s.rank || '銅';
  
  if (['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(s.type)) {
    if (!skillMap.has(s.name)) {
      skillMap.set(s.name, {
        name: s.name,
        rank: rank,
        type: 'スキル',
        cards: [c.name]
      });
    } else {
      skillMap.get(s.name).cards.push(c.name);
    }
  } else {
    // Ability
    const key = `${rank} ${s.name}`;
    if (!abilityMap.has(key)) {
      abilityMap.set(key, {
        name: s.name,
        rank: rank,
        type: 'アビリティ',
        key: key,
        cards: [c.name]
      });
    } else {
      abilityMap.get(key).cards.push(c.name);
    }
  }
});

console.log('Unique abilities count:', abilityMap.size);
console.log('Abilities sample:');
Array.from(abilityMap.values()).slice(0, 15).forEach(a => {
  console.log(`[${a.rank}] ${a.name} (Cards: ${a.cards.join(', ')})`);
});

console.log('\nUnique skills count:', skillMap.size);
console.log('Skills sample:');
Array.from(skillMap.values()).slice(0, 15).forEach(sk => {
  console.log(`[${sk.rank}] ${sk.name} (Cards: ${sk.cards.join(', ')})`);
});
