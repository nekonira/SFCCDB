global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

function optimizeSpecialCardSlots(player, options = {}) {
  const {
    targetGoal = 'TOTAL',
    targetStage = '完凸',
    requiredAbilities = [],
    requiredSkills = [],
    matchPlaystyleBonusOnly = false
  } = options;

  if (!player || !officialCards.length) return null;

  // Filter candidates
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

  // Card abilities helper
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

  // Card skill helper
  function getCardSkillName(c) {
    if (c.skill && (c.skill.type === 'スキル' || c.skill.type === 'シュート' || c.skill.type === 'パス' || c.skill.type === 'ドリブル' || c.skill.type === 'ディフェンス' || c.skill.type === 'GK' || c.skill.type === 'フィジカル')) {
      return c.skill.name;
    }
    return null;
  }

  // Pick cards for required items
  const selectedCards = [];
  const usedCardIds = new Set();

  // Pick for required abilities
  for (const reqAbs of requiredAbilities) {
    const matching = candidates
      .filter(c => !usedCardIds.has(c.id) && getCardAbilities(c).some(a => a.includes(reqAbs) || reqAbs.includes(a)))
      .sort((a, b) => getCardScore(b) - getCardScore(a));

    if (matching.length > 0) {
      const best = matching[0];
      selectedCards.push(best);
      usedCardIds.add(best.id);
    } else {
      // No card found for this required ability
      console.warn(`Warning: No available card matching required ability "${reqAbs}"`);
    }
  }

  // Pick for required skills
  for (const reqSkill of requiredSkills) {
    const matching = candidates
      .filter(c => !usedCardIds.has(c.id) && getCardSkillName(c) === reqSkill)
      .sort((a, b) => getCardScore(b) - getCardScore(a));

    if (matching.length > 0) {
      const best = matching[0];
      selectedCards.push(best);
      usedCardIds.add(best.id);
    } else {
      console.warn(`Warning: No available card matching required skill "${reqSkill}"`);
    }
  }

  // Fill remaining slots up to 6 with highest scoring cards
  const remainingCandidates = candidates
    .filter(c => !usedCardIds.has(c.id))
    .sort((a, b) => getCardScore(b) - getCardScore(a));

  while (selectedCards.length < 6 && remainingCandidates.length > 0) {
    const top = remainingCandidates.shift();
    selectedCards.push(top);
    usedCardIds.add(top.id);
  }

  // Return slot state objects
  return Array.from({ length: 6 }, (_, i) => {
    const card = selectedCards[i] || candidates[i] || officialCards[0];
    return {
      id: i + 1,
      active: true,
      cardId: card.id,
      stage: targetStage
    };
  });
}

// Test optimization for Pele
const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log(`\n--- Test 1: Total Optimization for ${pele.name} ---`);
const slots1 = optimizeSpecialCardSlots(pele, { targetGoal: 'TOTAL', targetStage: '完凸' });
slots1.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`Slot ${idx + 1}: ${card.name} (${card.rank})`);
});

console.log(`\n--- Test 2: Optimization with Required Ability "銅 スピードドリブラー" and Required Skill "一撃必殺" ---`);
const slots2 = optimizeSpecialCardSlots(pele, {
  targetGoal: 'dribble',
  targetStage: '完凸',
  requiredAbilities: ['スピードドリブラー'],
  requiredSkills: ['一撃必殺']
});
slots2.forEach((s, idx) => {
  const card = officialCards.find(c => c.id === s.cardId);
  console.log(`Slot ${idx + 1}: ${card.name} (${card.rank}) - Skill: ${card.skill?.name}`);
});
