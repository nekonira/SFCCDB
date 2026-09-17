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

function checkSingleBonusMatchStrict(player, rawStyle) {
  if (!player || !rawStyle) return false;
  
  const s = normalizeStyle(rawStyle);
  if (!s) return false;

  const pStyle = normalizeStyle(player.playStyle);
  const pPos = normalizeStyle(player.mainPosition || player.position);
  const pCat = normalizeStyle(player.category);
  const pNation = normalizeStyle(player.nationality);

  // 1. Nationality Match
  if (pNation && pNation === s) return true;

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

  // 4. PlayStyle Match ONLY
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

// Test cases
const testPlayers = [
  { name: 'Player Striker', playStyle: 'ストライカー', mainPosition: 'CF' },
  { name: 'Player LineBreaker', playStyle: 'ラインブレーカー', mainPosition: 'CF' },
  { name: 'Player SideAttacker', playStyle: 'サイドアタッカーLM', mainPosition: 'LM' },
  { name: 'Player Attacker', playStyle: 'アタッカー', mainPosition: 'AM' },
];

const testStyles = ['ストライカー', 'ラインブレーカー', 'CF', 'AM', 'サイドアタッカー', 'アタッカー'];

console.log('=== STRICT MATCHING TEST RESULTS ===');
testPlayers.forEach(p => {
  console.log(`\nPlayer: ${p.name} (Style: ${p.playStyle}, Pos: ${p.mainPosition})`);
  testStyles.forEach(st => {
    const match = checkSingleBonusMatchStrict(p, st);
    console.log(`  Bonus '${st}' -> ${match ? 'MATCH' : 'NO MATCH'}`);
  });
});
