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

    // Direct or substring matches
    if (pStyle && (pStyle.includes(s) || s.includes(pStyle))) return true;
    if (pPos && (pPos.includes(s) || s.includes(pPos))) return true;
    if (pCat && (pCat.includes(s) || s.includes(pCat))) return true;
    if (pNation && (pNation.includes(s) || s.includes(pNation))) return true;

    // Check individual tokens inside composite style (e.g. "サイドアタッカーRM" -> "サイドアタッカー" & "RM")
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

const pele = PLAYERS.find(p => p.name.includes('ペレ')) || PLAYERS[0];
console.log(`Matching cards for ${pele.name} (${pele.mainPosition}, ${pele.playStyle}, ${pele.nationality}):`);

officialCards.forEach(c => {
  const mult = calculateCardBonusMult(pele, c);
  if (mult > 1.0) {
    console.log(`- Card: ${c.name} -> Multiplier: ${mult.toFixed(2)}x (+${Math.round((mult - 1) * 100)}%)`);
  }
});
