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

  // Axis 2: Category Match (FW, MF, DF, GK)
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
  } else if (pPos === s) {
    return true;
  }

  // Axis 4: PlayStyle Specific Match ONLY (No position/category fallback!)
  if (!pStyle) return false;

  const isReqSideAttacker = s.includes('サイドアタッカー');
  const isReqAttacker = !isReqSideAttacker && s.includes('アタッカー');

  const isPlayerSideAttacker = pStyle.includes('サイドアタッカー');
  const isPlayerAttacker = !isPlayerSideAttacker && (pStyle === 'アタッカー' || pStyle.startsWith('アタッカー'));

  if (isReqAttacker && isPlayerSideAttacker) return false;
  if (isReqSideAttacker && isPlayerAttacker) return false;

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
    return isPlayerAttacker;
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
    if (s.includes('アタッカー') && pStyle.includes('サイドアタッカー')) return false;
    if (pStyle.includes('アタッカー') && s.includes('サイドアタッカー')) return false;
    if (pStyle.includes(s) || s.includes(pStyle)) return true;
  }

  return false;
}

// Test cases
const testCases = [
  { player: { playStyle: 'サイドアタッカー', mainPosition: 'LW', category: 'FW' }, cardStyle: 'アタッカー 30%', expected: false, label: 'SideAttacker player vs Attacker bonus' },
  { player: { playStyle: 'サイドアタッカーLW', mainPosition: 'LW', category: 'FW' }, cardStyle: 'アタッカー 30%', expected: false, label: 'SideAttackerLW player vs Attacker bonus' },
  { player: { playStyle: 'アタッカー', mainPosition: 'AM', category: 'MF' }, cardStyle: 'サイドアタッカー 25%', expected: false, label: 'Attacker player vs SideAttacker bonus' },
  { player: { playStyle: 'サイドアタッカー', mainPosition: 'LW', category: 'FW' }, cardStyle: 'サイドアタッカー 25%', expected: true, label: 'SideAttacker player vs SideAttacker bonus' },
  { player: { playStyle: 'サイドアタッカーLW', mainPosition: 'LW', category: 'FW' }, cardStyle: 'サイドアタッカー 25%', expected: true, label: 'SideAttackerLW player vs SideAttacker bonus' },
  { player: { playStyle: 'アタッカー', mainPosition: 'AM', category: 'MF' }, cardStyle: 'アタッカー 30%', expected: true, label: 'Attacker player vs Attacker bonus' },
];

let allPassed = true;
testCases.forEach(tc => {
  const result = checkSingleBonusMatch(tc.player, tc.cardStyle);
  const pass = result === tc.expected;
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${tc.label}: expected ${tc.expected}, got ${result}`);
  if (!pass) allPassed = false;
});

if (allPassed) {
  console.log('\nALL TEST CASES PASSED SUCCESSFULLY!');
} else {
  console.error('\nSOME TEST CASES FAILED!');
}
