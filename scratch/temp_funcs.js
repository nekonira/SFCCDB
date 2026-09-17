
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

  // 1. Nationality Match (e.g. 日本, スペイン, ブラジル, etc.)
  if (pNation && (pNation === s || pNation.includes(s) || s.includes(pNation))) return true;

  // 2. Category Match (FW, MF, DF, GK)
  if (s === 'fw' || s === 'mf' || s === 'df' || s === 'gk') {
    return pCat === s;
  }

  // 3. Position Match (CF, ST, LW, RW, LM, RM, AM, DM, LFB, RFB, CB, GK)
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

  // 4. PlayStyle Match ONLY (Strict & Exact matching - No cross-playstyle fallback!)
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

const floor1Decimal = (num) => {
  const n = Number(num) || 0;
  const sign = n < 0 ? -1 : 1;
  const abs = Math.abs(n);
  return (Math.floor((abs + 0.0000001) * 10) / 10) * sign;
};









module.exports = {
  normalizeStyle,
  checkSingleBonusMatch,
  checkBonusMatch,
  getCardBonusList,
  calculateCardBonusMult
};
