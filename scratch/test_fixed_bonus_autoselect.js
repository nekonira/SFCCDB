global.window = {};
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const PLAYERS = global.window.INITIAL_PLAYERS || [];
const officialCards = global.window.OFFICIAL_SPECIAL_CARDS || [];

function normalizeStyle(str) {
  if (!str) return '';
  return str
    .replace(/\d+%/g, '')
    .replace(/ブレーカー/g, 'ブレイカー')
    .replace(/\s+/g, '')
    .toLowerCase();
}

function checkBonusMatch(player, rawStyle) {
  if (!player || !rawStyle) return false;
  const parts = rawStyle.split('/');

  for (const part of parts) {
    const s = normalizeStyle(part);
    if (!s) continue;

    const pStyle = normalizeStyle(player.playStyle);
    const pPos = normalizeStyle(player.mainPosition);
    const pCat = normalizeStyle(player.category);
    const pNation = normalizeStyle(player.nationality);

    if (pStyle && (pStyle.includes(s) || s.includes(pStyle))) return true;
    if (pPos && (pPos.includes(s) || s.includes(pPos))) return true;
    if (pCat && (pCat.includes(s) || s.includes(pCat))) return true;
    if (pNation && (pNation.includes(s) || s.includes(pNation))) return true;

    if (pStyle.includes('サイドアタッカー') && s.includes('サイドアタッカー')) return true;
    if (pStyle.includes('ワイドストライカー') && s.includes('ワイドストライカー')) return true;
    if (pStyle.includes('ドリブラー') && s.includes('ドリブラー')) return true;
    if (pStyle.includes('ストライカー') && s.includes('ストライカー')) return true;
    if (pStyle.includes('ポストプレーヤー') && s.includes('ポストプレーヤー')) return true;
    if (pStyle.includes('アタッカー') && s.includes('アタッカー')) return true;
    if (pStyle.includes('パサー') && s.includes('パサー')) return true;
    if (pStyle.includes('セントラル') && (s.includes('セントラル') || s.includes('セントラルmf'))) return true;
    if (pStyle.includes('ハードマーカー') && s.includes('ハードマーカー')) return true;
    if (pStyle.includes('攻撃的') && (s.includes('攻撃的fb') || s.includes('攻撃的'))) return true;
    if (pStyle.includes('守備的') && (s.includes('守備的fb') || s.includes('守備的'))) return true;
    if (pStyle.includes('ストッパー') && s.includes('ストッパー')) return true;
    if (pStyle.includes('組立') && s.includes('組立')) return true;
    if (pStyle.includes('スプリント') && s.includes('スプリント')) return true;
  }

  return false;
}

function calculateCardBonusMult(player, card) {
  if (!player || !card || !card.playstyleBonus) return 1.0;
  let mult = 1.0;

  if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses)) {
    card.playstyleBonus.bonuses.forEach(b => {
      if (checkBonusMatch(player, b.style)) {
        mult += (Number(b.percent) || 0) / 100;
      }
    });
  } else if (card.playstyleBonus.style) {
    if (checkBonusMatch(player, card.playstyleBonus.style)) {
      mult += (Number(card.playstyleBonus.percent) || 0) / 100;
    }
  }

  return mult;
}

function optimizeSpecialCardSlots(player, officialCards, options = {}) {
  const { targetGoal = 'TOTAL', targetStage = '完凸', allowDuplicates = true } = options;

  function getCardScore(card) {
    const stageStats = card.stages[targetStage] || card.stages['完凸'] || {};
    const bonusMult = calculateCardBonusMult(player, card);

    let score = 0;
    Object.entries(stageStats).forEach(([stName, val]) => {
      const boosted = val * bonusMult;
      score += boosted;
    });

    return score;
  }

  const sortedCandidates = [...officialCards].sort((a, b) => getCardScore(b) - getCardScore(a));
  return sortedCandidates.slice(0, 6);
}

const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log(`Optimal cards for ${pele.name} after fixing playstyle bonus matching:`);
const topCards = optimizeSpecialCardSlots(pele, officialCards);
topCards.forEach((c, i) => {
  const mult = calculateCardBonusMult(pele, c);
  console.log(`Top ${i + 1}: ${c.name} (Bonus Mult: ${mult.toFixed(2)}x (+${Math.round((mult - 1) * 100)}%))`);
});
