const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');
require('../src/data/specialCardsData.js');

const cards = global.OFFICIAL_SPECIAL_CARDS;
const players = global.INITIAL_PLAYERS;

// Apply updates to the 12 mismatch cards in memory for testing
const cardFixes = {
  'card_offense_basic_training_ssr': { style: 'ドリブラー 30% / CF 10% / LW 10% / RW 10%', displayText: 'ドリブラー 30% UP / CF 10% UP / LW 10% UP / RW 10% UP', percent: 60 },
  'card_johnson_wide_shooter_sr': { style: 'LW 10% / RW 10%', displayText: 'LW 10% UP / RW 10% UP', percent: 20 },
  'card_yamal_young_legend_ssr': { style: 'LW 10% / RW 10%', displayText: 'LW 10% UP / RW 10% UP', percent: 20 },
  'card_son_world_sonny_ssr': { style: 'サイドアタッカー 25% / LW 10% / RW 10% / LM 10% / RM 10%', displayText: 'サイドアタッカー 25% UP / LW 10% UP / RW 10% UP / LM 10% UP / RM 10% UP', percent: 65 },
  'card_pulisic_milano_11_sr': { style: 'LM 10% / RM 10%', displayText: 'LM 10% UP / RM 10% UP', percent: 20 },
  'card_gibbs_white_hitman_sr': { style: 'アタッカー 20% / AM 10%', displayText: 'アタッカー 20% UP / AM 10% UP', percent: 30 },
  'card_honda_new_world_ssr': { style: 'アタッカー 40% / AM 10%', displayText: 'アタッカー 40% UP / AM 10% UP', percent: 50 },
  'card_calhanoglu_brave_commander_ssr': { style: 'パサー 20% / DM 20%', displayText: 'パサー 20% UP / DM 20% UP', percent: 40 },
  'card_parejo_yellow_submarine_sr': { style: 'パサー 10% / AM 10%', displayText: 'パサー 10% UP / AM 10% UP', percent: 20, bonuses: [{ style: 'パサー', percent: 10 }, { style: 'AM', percent: 10 }] },
  'card_kamada_south_london_sr': { style: 'セントラルMF 10% / DM 10%', displayText: 'セントラルMF 10% UP / DM 10% UP', percent: 20 },
  'card_modric_matured_maestro_ssr': { style: 'セントラルMF 10% / DM 20% / AM 20%', displayText: 'セントラルMF 10% UP / DM 20% UP / AM 20% UP', percent: 50 },
  'card_rice_ruler_of_gunners_ssr': { style: 'ハードマーカー 20% / DM 25%', displayText: 'ハードマーカー 20% UP / DM 25% UP', percent: 45 },
};

cards.forEach(c => {
  if (cardFixes[c.id]) {
    Object.assign(c.playstyleBonus, cardFixes[c.id]);
  }
});

function normalizeStyle(str) {
  if (!str) return '';
  return str
    .replace(/\d+%/g, '')
    .replace(/up/gi, '')
    .replace(/ブレーカー/g, 'ブレイカー')
    .replace(/\s+/g, '')
    .toLowerCase();
}

function checkSingleBonusMatch(player, rawStyle) {
  if (!player || !rawStyle) return false;
  
  const s = normalizeStyle(rawStyle);
  if (!s) return false;

  const pStyle = normalizeStyle(player.playStyle);
  const pPos = normalizeStyle(player.mainPosition);
  const pCat = normalizeStyle(player.category);
  const pNation = normalizeStyle(player.nationality);

  // Axis 1: Nationality Match
  if (pNation && (pNation === s || pNation.includes(s) || s.includes(pNation))) return true;

  // Axis 2: Category Match (fw, mf, df, gk)
  if (s === 'fw' || s === 'mf' || s === 'df' || s === 'gk') {
    return pCat === s;
  }

  // Axis 3: Position Match
  const posMap = {
    'cf': ['cf', 'st'],
    'st': ['cf', 'st'],
    'lw': ['lw', 'lwg', 'lwf'],
    'rw': ['rw', 'rwg', 'rwf'],
    'lm': ['lm', 'lmf'],
    'rm': ['rm', 'rmf'],
    'am': ['am', 'omf', 'amf', 'cam', 'om'],
    'dm': ['dm', 'dmf', 'dh', 'cmf', 'cm'],
    'lfb': ['lfb', 'lsb', 'lb', 'wb'],
    'rfb': ['rfb', 'rsb', 'rb', 'wb'],
    'cb': ['cb'],
    'gk': ['gk']
  };

  if (posMap[s]) {
    return posMap[s].includes(pPos);
  } else if (pPos === s) {
    return true;
  }

  // Axis 4: PlayStyle Specific Match ONLY (Strict matching)
  if (!pStyle) return false;

  if (pStyle === s) return true;

  if (s === 'ストライカー') {
    return pStyle.includes('ストライカー') || pStyle.includes('ラインブレイカー') || pStyle.includes('ポストプレーヤー') || pStyle.includes('ターゲットマン') || pStyle.includes('ワイドストライカー');
  }
  if (s.includes('ラインブレイカー')) {
    return pStyle.includes('ラインブレイカー');
  }
  if (s.includes('ポストプレーヤー')) {
    return pStyle.includes('ポストプレーヤー') || pStyle.includes('ターゲットマン');
  }
  if (s.includes('ワイドストライカー')) {
    return pStyle.includes('ワイドストライカー');
  }
  if (s.includes('サイドアタッカー')) {
    return pStyle.includes('サイドアタッカー') || pStyle.includes('ウイングバック') || pStyle.includes('ウインガー');
  }
  if (s.includes('ドリブラー')) {
    return pStyle.includes('ドリブラー') || pStyle.includes('テクニシャン');
  }
  if (s.includes('アタッカー')) {
    return pStyle.includes('アタッカー') || pStyle.includes('サイドアタッカー') || pStyle.includes('ストライカー') || pStyle.includes('チャンスメーカー');
  }
  if (s.includes('パサー')) {
    return pStyle.includes('パサー') || pStyle.includes('司令塔') || pStyle.includes('ゲームメーカー');
  }
  if (s.includes('セントラル')) {
    return pStyle.includes('セントラル') || pStyle.includes('インサイドハーフ') || pStyle.includes('ボックス');
  }
  if (s.includes('ハードマーカー')) {
    return pStyle.includes('ハードマーカー') || pStyle.includes('ハードプレス') || pStyle.includes('クラッシャー') || pStyle.includes('ハードタッカー');
  }
  if (s.includes('攻撃的fb') || s.includes('攻撃的sb')) {
    return pStyle.includes('攻撃的');
  }
  if (s.includes('守備的fb') || s.includes('守備的sb')) {
    return pStyle.includes('守備的');
  }
  if (s.includes('ストッパー')) {
    return pStyle.includes('ストッパー');
  }
  if (s.includes('組立cb') || s.includes('ビルドアップ')) {
    return pStyle.includes('組立') || pStyle.includes('ビルドアップ');
  }
  if (s.includes('スプリントcb')) {
    return pStyle.includes('スプリント');
  }
  if (s.includes('オーソドックスgk')) {
    return pStyle.includes('オーソドックス');
  }
  if (s.includes('スイーパーgk')) {
    return pStyle.includes('スイーパー');
  }

  return false;
}

function getCardBonusList(card) {
  if (!card || !card.playstyleBonus) return [];

  if (card.playstyleBonus.bonuses && Array.isArray(card.playstyleBonus.bonuses) && card.playstyleBonus.bonuses.length > 0) {
    return card.playstyleBonus.bonuses;
  }

  const rawStyle = card.playstyleBonus.style || '';
  const totalPercent = card.playstyleBonus.percent || 0;
  
  if (!rawStyle) return [];

  const parts = rawStyle.split('/');
  const result = [];

  parts.forEach(part => {
    const match = part.match(/([^\d%]+)\s*(\d+)%/);
    if (match) {
      result.push({
        style: match[1].trim(),
        percent: Number(match[2])
      });
    } else {
      result.push({
        style: part.trim(),
        percent: totalPercent
      });
    }
  });

  return result;
}

function calculateCardBonusMult(player, card) {
  if (!player || !card || !card.playstyleBonus) return 1.0;

  const bonusList = getCardBonusList(card);
  if (!bonusList.length) return 1.0;

  let mult = 1.0;

  bonusList.forEach(b => {
    if (checkSingleBonusMatch(player, b.style)) {
      mult += (Number(b.percent) || 0) / 100;
    }
  });

  return parseFloat(mult.toFixed(2));
}

// Test players on Calhanoglu card and Parejo card
const centralDmPlayer = players.find(p => p.name.includes('バルベルデ')); // DM, セントラルDM
const passerDmPlayer = players.find(p => p.name.includes('デ・ブライネ'));   // DM, パサーDM
const centralAmPlayer = players.find(p => p.name.includes('鎌田大地'));    // AM, セントラルAM

console.log("=== VERIFYING FIX ON PASSER & CENTRAL CARDS ===");

const testCards = [
  cards.find(c => c.name.includes('チャルハノール')),
  cards.find(c => c.name.includes('パレホ')),
  cards.find(c => c.name.includes('鎌田大地')),
  cards.find(c => c.name.includes('モドリッチ'))
];

[centralDmPlayer, passerDmPlayer, centralAmPlayer].forEach(p => {
  console.log(`\nPlayer: ${p.name} (Position: ${p.mainPosition} | PlayStyle: ${p.playStyle})`);
  testCards.forEach(c => {
    const mult = calculateCardBonusMult(p, c);
    const matched = getCardBonusList(c).filter(b => checkSingleBonusMatch(p, b.style));
    console.log(` - Card: "${c.name}" [Display: "${c.playstyleBonus.displayText}"]`);
    console.log(`     Matched:`, matched.map(m => `${m.style} +${m.percent}%`).join(', ') || 'NONE');
    console.log(`     Mult: ${mult}x (+${Math.round((mult-1)*100)}%)`);
  });
});
