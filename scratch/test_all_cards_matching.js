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

    // 1. Nationality Match
    if (pNation && (pNation === s || pNation.includes(s) || s.includes(pNation))) return true;

    // 2. Category Match (FW, MF, DF, GK)
    if (s === 'fw' || s === 'mf' || s === 'df' || s === 'gk') {
      if (pCat === s) return true;
    }

    // 3. Position Match (Exact position match)
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
      if (posMap[s].includes(pPos)) return true;
    } else if (pPos === s) {
      return true;
    }

    // 4. PlayStyle Specific Match ONLY (No position/category fallback!)
    if (pStyle) {
      if (pStyle === s || pStyle.includes(s) || s.includes(pStyle)) return true;

      if (s === 'ストライカー') {
        if (pStyle.includes('ストライカー') || pStyle.includes('ラインブレイカー') || pStyle.includes('ポストプレーヤー') || pStyle.includes('ターゲットマン') || pStyle.includes('ワイドストライカー')) return true;
      }
      if (s.includes('ラインブレイカー')) {
        if (pStyle.includes('ラインブレイカー')) return true;
      }
      if (s.includes('ポストプレーヤー')) {
        if (pStyle.includes('ポストプレーヤー') || pStyle.includes('ターゲットマン')) return true;
      }
      if (s.includes('ワイドストライカー')) {
        if (pStyle.includes('ワイドストライカー')) return true;
      }
      if (s.includes('サイドアタッカー')) {
        if (pStyle.includes('サイドアタッカー') || pStyle.includes('ウイングバック') || pStyle.includes('ウインガー')) return true;
      }
      if (s.includes('ドリブラー')) {
        if (pStyle.includes('ドリブラー') || pStyle.includes('テクニシャン')) return true;
      }
      if (s.includes('アタッカー')) {
        if (pStyle.includes('アタッカー') || pStyle.includes('サイドアタッカー') || pStyle.includes('ストライカー') || pStyle.includes('チャンスメーカー')) return true;
      }
      if (s.includes('パサー')) {
        if (pStyle.includes('パサー') || pStyle.includes('司令塔') || pStyle.includes('ゲームメーカー')) return true;
      }
      if (s.includes('セントラル')) {
        if (pStyle.includes('セントラル') || pStyle.includes('インサイドハーフ') || pStyle.includes('ボックス')) return true;
      }
      if (s.includes('ハードマーカー')) {
        if (pStyle.includes('ハードマーカー') || pStyle.includes('ハードプレス') || pStyle.includes('クラッシャー') || pStyle.includes('ハードタッカー')) return true;
      }
      if (s.includes('攻撃的fb')) {
        if (pStyle.includes('攻撃的')) return true;
      }
      if (s.includes('守備的fb')) {
        if (pStyle.includes('守備的')) return true;
      }
      if (s.includes('ストッパー')) {
        if (pStyle.includes('ストッパー')) return true;
      }
      if (s.includes('組立cb')) {
        if (pStyle.includes('組立') || pStyle.includes('ビルドアップ')) return true;
      }
      if (s.includes('スプリントcb')) {
        if (pStyle.includes('スプリント')) return true;
      }
      if (s.includes('オーソドックスgk')) {
        if (pStyle.includes('オーソドックス')) return true;
      }
      if (s.includes('スイーパーgk')) {
        if (pStyle.includes('スイーパー')) return true;
      }
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

console.log("=== COMPREHENSIVE CARD BONUS MATCH REPORT ===");

const testPlayers = [
  players.find(p => p.name === 'ペレ'),
  players.find(p => p.name === 'クリスティアーノ・ロナウド'),
  players.find(p => p.name === 'アーリング・ハーランド'),
  players.find(p => p.name === 'ケヴィン・デ・ブライネ'),
  players.find(p => p.name.includes('ファン・ダイク')),
  players.find(p => p.name.includes('バストーニ')),
  players.find(p => p.name.includes('マルティネス')),
  players.find(p => p.name === '久保建英')
].filter(Boolean);

testPlayers.forEach(p => {
  console.log(`\n--------------------------------------------------`);
  console.log(`PLAYER: ${p.name} (${p.mainPosition} | ${p.playStyle} | ${p.nationality})`);
  console.log(`--------------------------------------------------`);

  const matchingCards = cards.map(c => {
    const mult = calculateCardBonusMult(p, c);
    return { card: c, mult };
  }).filter(item => item.mult > 1.0);

  console.log(`Matched Cards: ${matchingCards.length}`);
  matchingCards.forEach(item => {
    console.log(` - ${item.card.name} => ${item.mult}x (Bonus: "${item.card.playstyleBonus?.displayText || item.card.playstyleBonus?.style}")`);
  });
});
