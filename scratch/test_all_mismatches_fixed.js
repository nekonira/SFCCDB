const fs = require('fs');
global.window = global;
require('../src/data/mockData.js');

// Test data updates on specialCardsData
const specialCardsPath = './src/data/specialCardsData.js';
let cardsContent = fs.readFileSync(specialCardsPath, 'utf8');

// Update the 12 mismatch cards in specialCardsData code string or test memory
require('../src/data/specialCardsData.js');
const cards = global.OFFICIAL_SPECIAL_CARDS;
const players = global.INITIAL_PLAYERS;

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

// Test Calhanoglu card (Card #8) and Parejo card (Card #9) on Central MF players
console.log("=== TESTING PASSER CARDS ON CENTRAL PLAYERS ===");

const centralPlayer = players.find(p => p.name.includes('バルベルデ'));
const calhanogluCard = cards.find(c => c.name.includes('チャルハノール'));
const parejoCard = cards.find(c => c.name.includes('パレホ'));
const deBruynePlayer = players.find(p => p.name.includes('デ・ブライネ'));

console.log(`Player: ${centralPlayer.name} (${centralPlayer.mainPosition} | ${centralPlayer.playStyle})`);
console.log(` - Calhanoglu Card: Mult = ${calculateCardBonusMult(centralPlayer, calhanogluCard)}x (Matched sub-bonuses: ${getCardBonusList(calhanogluCard).filter(b => checkSingleBonusMatch(centralPlayer, b.style)).map(b=>b.style).join(', ') || 'NONE'})`);
console.log(` - Parejo Card: Mult = ${calculateCardBonusMult(centralPlayer, parejoCard)}x (Matched sub-bonuses: ${getCardBonusList(parejoCard).filter(b => checkSingleBonusMatch(centralPlayer, b.style)).map(b=>b.style).join(', ') || 'NONE'})`);

console.log(`\nPlayer: ${deBruynePlayer.name} (${deBruynePlayer.mainPosition} | ${deBruynePlayer.playStyle})`);
console.log(` - Calhanoglu Card: Mult = ${calculateCardBonusMult(deBruynePlayer, calhanogluCard)}x (Matched sub-bonuses: ${getCardBonusList(deBruynePlayer, calhanogluCard).filter(b => checkSingleBonusMatch(deBruynePlayer, b.style)).map(b=>b.style).join(', ') || 'NONE'})`);
