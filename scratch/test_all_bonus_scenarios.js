const fs = require('fs');

function normalizeStyle(str) {
  if (!str) return '';
  return String(str)
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
  const pPos = normalizeStyle(player.mainPosition || player.position);
  const pCat = normalizeStyle(player.category);
  const pNation = normalizeStyle(player.nationality);

  // 1. Nationality Match
  if (pNation && (pNation === s || pNation.includes(s) || s.includes(pNation))) return true;

  // 2. Category Match (FW, MF, DF, GK)
  if (s === 'fw' || s === 'mf' || s === 'df' || s === 'gk') {
    return pCat === s;
  }

  // 3. Position Match
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

  // 4. PlayStyle Strict Matching
  if (!pStyle) return false;

  if (s === 'ストライカー') return pStyle === 'ストライカー';
  if (s === 'ラインブレイカー') return pStyle === 'ラインブレイカー';
  if (s === 'ポストプレイヤー') return pStyle === 'ポストプレイヤー';
  if (s === 'アタッカー') return pStyle === 'アタッカー';
  if (s === 'ハードマーカー') return pStyle === 'ハードマーカー';
  if (s === 'ストッパー') return pStyle === 'ストッパー';
  if (s === 'スプリントcb') return pStyle === 'スプリントcb';
  if (s === '組立cb') return pStyle === '組立cb';
  if (s === 'オーソドックスgk') return pStyle === 'オーソドックスgk';
  if (s === 'スイーパーgk') return pStyle === 'スイーパーgk';

  if (s.startsWith('サイドアタッカー')) return pStyle.startsWith('サイドアタッカー');
  if (s.startsWith('ワイドストライカー')) return pStyle.startsWith('ワイドストライカー');
  if (s.startsWith('ドリブラー')) return pStyle.startsWith('ドリブラー');
  if (s.startsWith('パサー')) return pStyle.startsWith('パサー');
  if (s.startsWith('セントラル')) return pStyle.startsWith('セントラル');
  if (s.startsWith('攻撃的')) return pStyle.startsWith('攻撃的');
  if (s.startsWith('守備的')) return pStyle.startsWith('守備的');

  return pStyle === s;
}

function checkBonusMatch(player, rawStyle) {
  if (!player || !rawStyle) return false;
  const parts = rawStyle.split('/');
  return parts.some(part => checkSingleBonusMatch(player, part));
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
      result.push({ style: match[1].trim(), percent: Number(match[2]) });
    } else {
      result.push({ style: part.trim(), percent: totalPercent });
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

// Test cases with realistic players & cards
const playerStriker = { name: '浅野拓磨', playStyle: 'ストライカー', mainPosition: 'CF', nationality: '日本' };
const playerLineBreaker = { name: '古橋亨梧', playStyle: 'ラインブレーカー', mainPosition: 'CF', nationality: '日本' };

const cardLineBreaker = {
  id: 'c1',
  name: 'ラインブレーカー特練',
  playstyleBonus: {
    style: 'ラインブレーカー 15% / CF 10%',
    displayText: 'ラインブレーカー 15% UP / CF 10% UP',
    bonuses: [
      { style: 'ラインブレーカー', percent: 15 },
      { style: 'CF', percent: 10 }
    ]
  }
};

const cardStriker = {
  id: 'c2',
  name: 'ストライカー特練',
  playstyleBonus: {
    style: 'ストライカー 15% / CF 10%',
    displayText: 'ストライカー 15% UP / CF 10% UP',
    bonuses: [
      { style: 'ストライカー', percent: 15 },
      { style: 'CF', percent: 10 }
    ]
  }
};

console.log('--- TEST 1: Striker Player vs LineBreaker Card ---');
console.log('Player:', playerStriker.name, 'PlayStyle:', playerStriker.playStyle, 'Pos:', playerStriker.mainPosition);
const strikerVsLineBreakerMult = calculateCardBonusMult(playerStriker, cardLineBreaker);
console.log('Bonus Multiplier for LineBreaker Card:', strikerVsLineBreakerMult);
console.log('Check style "ラインブレーカー":', checkSingleBonusMatch(playerStriker, 'ラインブレーカー'));
console.log('Check style "CF":', checkSingleBonusMatch(playerStriker, 'CF'));
// Expected: LineBreaker style bonus (15%) is NO MATCH. CF position bonus (10%) IS MATCH. Total = 1.10.

console.log('\n--- TEST 2: LineBreaker Player vs Striker Card ---');
console.log('Player:', playerLineBreaker.name, 'PlayStyle:', playerLineBreaker.playStyle, 'Pos:', playerLineBreaker.mainPosition);
const lineBreakerVsStrikerMult = calculateCardBonusMult(playerLineBreaker, cardStriker);
console.log('Bonus Multiplier for Striker Card:', lineBreakerVsStrikerMult);
console.log('Check style "ストライカー":', checkSingleBonusMatch(playerLineBreaker, 'ストライカー'));
console.log('Check style "CF":', checkSingleBonusMatch(playerLineBreaker, 'CF'));
// Expected: Striker style bonus (15%) is NO MATCH. CF position bonus (10%) IS MATCH. Total = 1.10.

console.log('\n--- TEST 3: LineBreaker Player vs LineBreaker Card ---');
const lineBreakerVsLineBreakerMult = calculateCardBonusMult(playerLineBreaker, cardLineBreaker);
console.log('Bonus Multiplier for LineBreaker Card:', lineBreakerVsLineBreakerMult);
console.log('Check style "ラインブレーカー":', checkSingleBonusMatch(playerLineBreaker, 'ラインブレーカー'));
console.log('Check style "CF":', checkSingleBonusMatch(playerLineBreaker, 'CF'));
// Expected: LineBreaker style (15%) MATCH + CF position (10%) MATCH. Total = 1.25.
