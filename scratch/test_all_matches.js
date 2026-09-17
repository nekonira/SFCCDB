const fs = require('fs');

global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const players = global.INITIAL_PLAYERS;
const cards = global.OFFICIAL_SPECIAL_CARDS;

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

// Check how many players get bonus > 1.0 for each card
console.log('--- Card Bonus Match Report ---');
let cardsWithZeroMatches = 0;

cards.forEach(card => {
  if (!card.playstyleBonus) {
    console.log(`[NO BONUS] Card: ${card.name}`);
    return;
  }
  let matchCount = 0;
  players.forEach(p => {
    if (calculateCardBonusMult(p, card) > 1.0) {
      matchCount++;
    }
  });
  console.log(`Card: ${card.name} | BonusStyle: "${card.playstyleBonus.style}" | Matched Players: ${matchCount}/${players.length}`);
  if (matchCount === 0) cardsWithZeroMatches++;
});

console.log(`\nCards with 0 player matches: ${cardsWithZeroMatches}`);
