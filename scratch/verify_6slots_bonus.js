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
    .replace(/up/gi, '')
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

    if (pPos && (pPos === s || (s.length >= 2 && pPos.includes(s)) || (pPos.length >= 2 && s.includes(pPos)))) return true;
    if (pCat && (pCat === s || pCat.includes(s) || s.includes(pCat))) return true;
    if (pNation && (pNation === s || pNation.includes(s) || s.includes(pNation))) return true;

    if (pStyle) {
      if (pStyle === s || pStyle.includes(s) || s.includes(pStyle)) return true;

      if ((s === 'cf' || s === 'st' || s === 'ストライカー') && (pPos === 'cf' || pStyle.includes('ストライカー') || pStyle.includes('ラインブレイカー') || pStyle.includes('ポストプレーヤー') || pStyle.includes('ワイドストライカー'))) return true;
      if (s.includes('ラインブレイカー') && (pStyle.includes('ラインブレイカー') || pStyle.includes('ストライカー') || pPos === 'cf')) return true;
      if (s.includes('ポストプレーヤー') && (pStyle.includes('ポストプレーヤー') || pStyle.includes('ストライカー') || pPos === 'cf')) return true;
      if (s.includes('ワイドストライカー') && (pStyle.includes('ワイドストライカー') || pPos === 'lw' || pPos === 'rw')) return true;

      if (s.includes('サイドアタッカー') && (pStyle.includes('サイドアタッカー') || pPos === 'lm' || pPos === 'rm' || pPos === 'lw' || pPos === 'rw')) return true;
      if (s.includes('ドリブラー') && (pStyle.includes('ドリブラー') || pPos === 'lw' || pPos === 'rw' || pPos === 'lm' || pPos === 'rm')) return true;
      if (s.includes('アタッカー') && (pStyle.includes('アタッカー') || pStyle.includes('サイドアタッカー') || pCat === 'fw' || pCat === 'mf')) return true;

      if (s.includes('パサー') && (pStyle.includes('パサー') || pCat === 'mf')) return true;
      if ((s.includes('セントラル') || s.includes('セントラルmf')) && (pStyle.includes('セントラル') || pPos === 'am' || pPos === 'dm' || pCat === 'mf')) return true;
      if (s.includes('ハードマーカー') && (pStyle.includes('ハードマーカー') || pStyle.includes('ハードタッカー') || pPos === 'dm' || pPos === 'cb')) return true;

      if (s.includes('攻撃的fb') && (pStyle.includes('攻撃的') || pPos === 'lfb' || pPos === 'rfb')) return true;
      if (s.includes('守備的fb') && (pStyle.includes('守備的') || pPos === 'lfb' || pPos === 'rfb')) return true;
      if ((s === 'fb' || s === 'lfb' || s === 'rfb' || s.includes('サイドバック')) && (pPos === 'lfb' || pPos === 'rfb' || pStyle.includes('lfb') || pStyle.includes('rfb'))) return true;

      if (s.includes('ストッパー') && (pStyle.includes('ストッパー') || pPos === 'cb')) return true;
      if (s.includes('組立cb') && (pStyle.includes('組立') || pPos === 'cb')) return true;
      if (s.includes('スプリントcb') && (pStyle.includes('スプリント') || pPos === 'cb')) return true;
      if (s === 'cb' && (pPos === 'cb' || pStyle.includes('cb') || pCat === 'df')) return true;

      if ((s.includes('オーソドックスgk') || s.includes('スイーパーgk') || s === 'gk') && (pPos === 'gk' || pCat === 'gk' || pStyle.includes('gk'))) return true;
    }
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

  return parseFloat(mult.toFixed(2));
}

// Test running calculateBoostedPlayer-like logic on sample players
const testPlayerNames = ['ペレ', 'クリスティアーノ・ロナウド', '上田綺世', 'デ・ブライネ', 'バストーニ'];

testPlayerNames.forEach(name => {
  const player = players.find(p => p.name.includes(name));
  if (!player) return;

  console.log(`\n==================================================`);
  console.log(`PLAYER: ${player.name} (${player.mainPosition} | ${player.playStyle} | ${player.nationality})`);
  console.log(`==================================================`);

  // Select 6 cards matching player
  const sampleCards = [
    cards.find(c => c.name.includes('ハーランド')),
    cards.find(c => c.name.includes('佐藤寿人')),
    cards.find(c => c.name.includes('上田綺世')),
    cards.find(c => c.name.includes('ケイン')),
    cards.find(c => c.name.includes('エンバペ')),
    cards.find(c => c.name.includes('ペレ'))
  ].filter(Boolean);

  sampleCards.forEach((card, i) => {
    const mult = calculateCardBonusMult(player, card);
    const stageStats = card.stages['完凸'] || {};
    console.log(`Slot ${i+1}: ${card.name}`);
    console.log(`   Bonus Style: "${card.playstyleBonus?.style}" -> Mult: ${mult}x (+${Math.round((mult-1)*100)}% UP)`);
    Object.entries(stageStats).slice(0, 3).forEach(([stName, rawVal]) => {
      const boosted = parseFloat((rawVal * mult).toFixed(1));
      console.log(`   - ${stName}: 素 +${rawVal} => 補正後 +${boosted}`);
    });
  });
});
