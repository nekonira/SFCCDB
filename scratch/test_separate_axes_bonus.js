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

  // Axis 3: Exact Position Match
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
  }

  // Axis 4: PlayStyle Specific Match ONLY
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

  if (s.length >= 3 && pStyle.length >= 3) {
    if (pStyle.includes(s) || s.includes(pStyle)) return true;
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

// Test specific multi-bonus cards on players with different attributes
console.log("=== TESTING MULTI-BONUS SEPARATE AXIS CALCULATION ===");

const multiBonusCards = [
  cards.find(c => c.name.includes('ミッキー・ファン・デ・フェン')), // 組立CB 30% / CB 10%
  cards.find(c => c.name.includes('テオ・エルナンデス')),           // 攻撃的FB 30% / LFB 10% / RFB 10%
  cards.find(c => c.name.includes('デクラン・ライス')),             // DM 25% / ハードマーカー 20%
  cards.find(c => c.name.includes('影山優佳')),                     // 組立CB 40% / 日本 10%
  cards.find(c => c.name.includes('フィカヨ・トモリ')),             // ストッパー 20% / CB 10%
];

const testPlayers = [
  players.find(p => p.name.includes('ファン・ダイク')),    // CB, 組立CB, オランダ
  players.find(p => p.name.includes('リュディガー')),      // CB, ストッパー, ドイツ
  players.find(p => p.name.includes('デ・ブライネ')),      // DM, パサーDM, ベルギー
  players.find(p => p.name.includes('遠藤航')),            // DM, ハードマーカー, 日本
  players.find(p => p.name.includes('久保建英')),          // AM, アタッカー, 日本
];

testPlayers.forEach(p => {
  if (!p) return;
  console.log(`\n--------------------------------------------------`);
  console.log(`PLAYER: ${p.name} (Position: ${p.mainPosition} | PlayStyle: ${p.playStyle} | Nation: ${p.nationality})`);
  console.log(`--------------------------------------------------`);

  multiBonusCards.forEach(c => {
    if (!c) return;
    const mult = calculateCardBonusMult(p, c);
    const bonusList = getCardBonusList(c);
    const matchedItems = bonusList.filter(b => checkSingleBonusMatch(p, b.style));
    console.log(`Card: ${c.name}`);
    console.log(`  Bonus Specs: ${c.playstyleBonus.displayText || c.playstyleBonus.style}`);
    console.log(`  Matched Sub-Bonuses:`, matchedItems.map(m => `${m.style} +${m.percent}%`).join(', ') || 'NONE');
    console.log(`  Final Multiplier: ${mult}x (+${Math.round((mult-1)*100)}%)`);
  });
});
