global.window = {};
require('../src/data/specialCardsData.js');
const cards = global.window.OFFICIAL_SPECIAL_CARDS || [];

function extractAbilitiesAndSkills(officialCards) {
  const abilityMap = new Map();
  const skillMap = new Map();

  (officialCards || []).forEach(c => {
    if (!c || !c.skill) return;
    const s = c.skill;
    const rank = s.rank || '銅';

    if (['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(s.type)) {
      if (s.name && !skillMap.has(s.name)) {
        skillMap.set(s.name, {
          name: s.name,
          rank: rank,
          type: 'スキル',
          cardNames: [c.name],
          desc: s.description || ''
        });
      } else if (s.name) {
        const item = skillMap.get(s.name);
        if (!item.cardNames.includes(c.name)) item.cardNames.push(c.name);
      }
    } else {
      // Ability
      const name = s.name;
      const key = `${rank} ${name}`;
      if (!abilityMap.has(key)) {
        abilityMap.set(key, {
          key: key,
          name: name,
          rank: rank,
          type: 'アビリティ',
          cardNames: [c.name],
          desc: s.description || ''
        });
      } else {
        const item = abilityMap.get(key);
        if (!item.cardNames.includes(c.name)) item.cardNames.push(c.name);
      }
    }
  });

  const RANK_WEIGHTS = { '虹': 1, '金': 2, '銀': 3, '銅': 4, '特殊効果': 5, '特殊': 5 };

  const availableAbilities = Array.from(abilityMap.values()).sort((a, b) => {
    const rA = RANK_WEIGHTS[a.rank] || 9;
    const rB = RANK_WEIGHTS[b.rank] || 9;
    if (rA !== rB) return rA - rB;
    return a.name.localeCompare(b.name, 'ja');
  });

  const availableSkills = Array.from(skillMap.values()).sort((a, b) => {
    const rA = RANK_WEIGHTS[a.rank] || 9;
    const rB = RANK_WEIGHTS[b.rank] || 9;
    if (rA !== rB) return rA - rB;
    return a.name.localeCompare(b.name, 'ja');
  });

  return { availableAbilities, availableSkills };
}

const { availableAbilities, availableSkills } = extractAbilitiesAndSkills(cards);
console.log('Processed Abilities count:', availableAbilities.length);
console.log('Sample Sorted Abilities (first 10):');
availableAbilities.slice(0, 10).forEach(a => {
  console.log(`[${a.rank}] ${a.name} (Cards: ${a.cardNames.join(', ')})`);
});

console.log('\nProcessed Skills count:', availableSkills.length);
console.log('Sample Sorted Skills (first 10):');
availableSkills.slice(0, 10).forEach(s => {
  console.log(`[${s.rank}] ${s.name} (Cards: ${s.cardNames.join(', ')})`);
});
