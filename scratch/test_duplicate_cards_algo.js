global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

function optimizeSpecialCardSlots(player, officialCards, options = {}) {
  const {
    targetGoal = 'TOTAL',
    targetStage = '完凸',
    requiredAbilities = [],
    requiredSkills = [],
    matchPlaystyleBonusOnly = false
  } = options;

  if (!player || !officialCards || !officialCards.length) return Array.from({ length: 6 }, (_, i) => ({ id: i + 1, active: false, cardId: '', stage: targetStage }));

  // Candidate filtering
  let candidates = officialCards.filter(c => {
    if (!c || !c.stages || !c.stages[targetStage]) return false;
    if (matchPlaystyleBonusOnly && c.playstyleBonus) {
      let isMatch = false;
      if (c.playstyleBonus.bonuses && Array.isArray(c.playstyleBonus.bonuses)) {
        isMatch = c.playstyleBonus.bonuses.some(b =>
          (player.playStyle && player.playStyle.includes(b.style)) ||
          (player.nationality && player.nationality.includes(b.style))
        );
      } else if (c.playstyleBonus.style) {
        isMatch = (player.playStyle && player.playStyle.includes(c.playstyleBonus.style)) ||
                  (player.nationality && player.nationality.includes(c.playstyleBonus.style));
      }
      if (!isMatch) return false;
    }
    return true;
  });

  if (!candidates.length) candidates = officialCards;

  // Calculate score for each card
  function getCardScore(card) {
    const stageStats = card.stages[targetStage] || card.stages['完凸'] || {};
    let bonusMult = 1.0;
    if (card.playstyleBonus) {
      if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
        card.playstyleBonus.bonuses.forEach(b => {
          if ((player.playStyle && player.playStyle.includes(b.style)) ||
              (player.nationality && player.nationality.includes(b.style))) {
            bonusMult += (b.percent / 100);
          }
        });
      } else if ((player.playStyle && player.playStyle.includes(card.playstyleBonus.style)) ||
                 (player.nationality && player.nationality.includes(card.playstyleBonus.style))) {
        bonusMult += (card.playstyleBonus.percent / 100);
      }
    }

    let score = 0;
    Object.entries(stageStats).forEach(([stName, val]) => {
      const boosted = val * bonusMult;
      if (targetGoal === 'TOTAL') {
        score += boosted;
      } else if (targetGoal === 'shoot' && ['決定力', 'キック力', '冷静さ'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'pass' && ['ショートパス', 'ロングパス', 'パス精度', 'キック精度'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'dribble' && ['突破力', 'キープ力', 'キープ', 'ボールタッチ'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'defense' && ['タックル', 'パスカット', 'マーク', 'セービング'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'physical' && ['ジャンプ', 'コンタクト', 'スタミナ'].includes(stName)) {
        score += boosted * 3.0;
      } else if (targetGoal === 'speed' && ['走力', '敏捷性'].includes(stName)) {
        score += boosted * 3.0;
      } else {
        score += boosted;
      }
    });

    return score;
  }

  function getCardAbilities(c) {
    const abs = [];
    if (c.skill && c.skill.type !== 'スキル') {
      abs.push(`${c.skill.rank || ''} ${c.skill.name}`.trim());
      abs.push(c.skill.name);
    }
    if (c.ability) abs.push(c.ability);
    if (c.abilities) {
      if (Array.isArray(c.abilities)) c.abilities.forEach(a => abs.push(typeof a === 'string' ? a : a.name));
    }
    return abs;
  }

  function getCardSkillName(c) {
    if (c.skill && ['スキル', 'シュート', 'パス', 'ドリブル', 'ディフェンス', 'GK', 'フィジカル'].includes(c.skill.type)) {
      return c.skill.name;
    }
    return null;
  }

  const selectedCards = [];

  // 1. Required abilities selection
  for (const reqAbs of requiredAbilities) {
    const matching = candidates
      .filter(c => getCardAbilities(c).some(a => a.includes(reqAbs) || reqAbs.includes(a)))
      .sort((a, b) => getCardScore(b) - getCardScore(a));

    if (matching.length > 0) {
      selectedCards.push(matching[0]);
    }
  }

  // 2. Required skills selection
  for (const reqSkill of requiredSkills) {
    const matching = candidates
      .filter(c => getCardSkillName(c) === reqSkill)
      .sort((a, b) => getCardScore(b) - getCardScore(a));

    if (matching.length > 0) {
      selectedCards.push(matching[0]);
    }
  }

  // 3. Fill remaining slots with highest scoring card (duplicate allowed!)
  const sortedCandidates = [...candidates].sort((a, b) => getCardScore(b) - getCardScore(a));
  const bestCard = sortedCandidates[0] || officialCards[0];

  while (selectedCards.length < 6) {
    selectedCards.push(bestCard);
  }

  return Array.from({ length: 6 }, (_, i) => {
    const card = selectedCards[i] || bestCard;
    return {
      id: i + 1,
      active: true,
      cardId: card ? card.id : officialCards[0].id,
      stage: targetStage
    };
  });
}

const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log('--- Pele (Total Optimization with Duplicate Cards Allowed) ---');
const slots = optimizeSpecialCardSlots(pele, officialCards, { targetGoal: 'TOTAL', targetStage: '完凸' });
slots.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`Slot ${idx + 1}: ${card.name}`);
});

console.log('\n--- Pele (Required Skill: "一撃必殺" + Duplicate Best Cards for rest) ---');
const slots2 = optimizeSpecialCardSlots(pele, officialCards, {
  targetGoal: 'TOTAL',
  targetStage: '完凸',
  requiredSkills: ['一撃必殺']
});
slots2.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`Slot ${idx + 1}: ${card.name} (${card.skill ? card.skill.name : ''})`);
});
