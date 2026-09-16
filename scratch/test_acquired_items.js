global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

const sampleSlots = [
  { id: 1, active: true, cardId: officialCards[0]?.id || 'card_lee_kin_wo_rapid_wf_sr', stage: '完凸' },
  { id: 2, active: true, cardId: officialCards[1]?.id || 'card_haaland_demon_ssr', stage: '完凸' },
  { id: 3, active: false, cardId: officialCards[2]?.id || '', stage: '完凸' }
];

function getAcquiredItems(slots, officialCards) {
  const items = [];
  slots.forEach((s, idx) => {
    if (!s.active) return;
    const card = officialCards.find(c => c.id === s.cardId);
    if (!card) return;

    if (card.skill) {
      const isSkill = ['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(card.skill.type);
      items.push({
        slotId: s.id || (idx + 1),
        cardName: card.name,
        name: card.skill.name,
        rank: card.skill.rank || '銅',
        isSkill: isSkill,
        type: card.skill.type || 'アビリティ',
        desc: card.skill.description || ''
      });
    } else if (card.ability) {
      items.push({
        slotId: s.id || (idx + 1),
        cardName: card.name,
        name: card.ability,
        rank: '銅',
        isSkill: false,
        type: 'アビリティ',
        desc: ''
      });
    }
  });
  return items;
}

const items = getAcquiredItems(sampleSlots, officialCards);
console.log('Acquired Items count:', items.length);
console.log(JSON.stringify(items, null, 2));
