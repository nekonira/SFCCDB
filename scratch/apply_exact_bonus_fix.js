const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

// 1. New strict checkSingleBonusMatch function definition
const oldBonusMatchStart = `function normalizeStyle(str) {`;
const oldBonusMatchEnd = `function getCardBonusList(card) {`;

const newBonusMatchCode = `function normalizeStyle(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\d+%/g, '')
    .replace(/up/gi, '')
    .replace(/ブレーカー/g, 'ブレイカー')
    .replace(/\\s+/g, '')
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

`;

const startIndex = content.indexOf(oldBonusMatchStart);
const endIndex = content.indexOf(oldBonusMatchEnd);

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
  content = content.substring(0, startIndex) + newBonusMatchCode + content.substring(endIndex);
  console.log('Successfully updated checkSingleBonusMatch in src/app.jsx');
} else {
  console.error('Failed to locate checkSingleBonusMatch boundaries in src/app.jsx');
}

// 2. Update getCardStatData in 6-slot simulator (TrainingSimulatorTab)
const oldGetCardStatData = `    let bonusMult = 1.0;
    const bonuses = getCardBonuses(c);
    bonuses.forEach(b => {
      if (isBonusActive(c.id, b.style)) {
        bonusMult += (Number(b.percent) || 0) / 100;
      }
    });`;

const newGetCardStatData = `    let bonusMult = 1.0;
    const bonuses = getCardBonuses(c);
    bonuses.forEach(b => {
      const matchesPlayer = currentPlayer ? checkSingleBonusMatch(currentPlayer, b.style) : false;
      const isUserToggledOn = isBonusActive(c.id, b.style);
      if (matchesPlayer && isUserToggledOn) {
        bonusMult += (Number(b.percent) || 0) / 100;
      }
    });`;

if (content.includes(oldGetCardStatData)) {
  content = content.replace(oldGetCardStatData, newGetCardStatData);
  console.log('Successfully updated getCardStatData in 6-slot simulator in src/app.jsx');
} else {
  console.error('Failed to locate oldGetCardStatData in src/app.jsx');
}

// 3. Update Row 3 (bonus buttons rendering) in 6-slot simulator
const oldBonusRender = `{bonuses.map(b => {
                              const active = isBonusActive(c.id, b.style);

                              return (
                                <button
                                  key={b.style}
                                  onClick={() => toggleCardBonus(c.id, b.style)}
                                  className={\`w-full max-w-[135px] px-1 sm:px-1.5 py-0.5 rounded-lg text-[9px] sm:text-[11px] font-extrabold transition-all border cursor-pointer flex items-center justify-center gap-1 \${
                                    active
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm hover:bg-amber-500/30'
                                      : 'bg-slate-900/80 text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-700 opacity-60'
                                  }\`}
                                  title={\`\${b.style} \${b.percent}% UP の適用/非適用切り替え\`}
                                >
                                  <span className="truncate">🎯 \${b.style}</span>
                                  <span className="font-black flex-shrink-0">\${b.percent}%</span>
                                </button>
                              );
                            })}`;

const newBonusRender = `{bonuses.map(b => {
                              const matchesPlayer = currentPlayer ? checkSingleBonusMatch(currentPlayer, b.style) : false;
                              const userToggledOn = isBonusActive(c.id, b.style);
                              const active = matchesPlayer && userToggledOn;

                              return (
                                <button
                                  key={b.style}
                                  onClick={() => toggleCardBonus(c.id, b.style)}
                                  className={\`w-full max-w-[135px] px-1 sm:px-1.5 py-0.5 rounded-lg text-[9px] sm:text-[11px] font-extrabold transition-all border cursor-pointer flex items-center justify-center gap-1 \${
                                    active
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm hover:bg-amber-500/30'
                                      : matchesPlayer
                                      ? 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-slate-200 opacity-80'
                                      : 'bg-slate-950/90 text-slate-600 border-slate-800/80 opacity-50 cursor-not-allowed'
                                  }\`}
                                  title={
                                    matchesPlayer
                                      ? \`\${b.style} +\${b.percent}% UP (\${active ? '適用中' : 'OFF'})\`
                                      : \`\${b.style} (選択中の選手「\${currentPlayer?.playStyle || ''} / \${currentPlayer?.mainPosition || ''}」は対象外)\`
                                  }
                                >
                                  <span className="truncate">{matchesPlayer ? (active ? '🎯' : '⏸️') : '❌'} \${b.style}</span>
                                  <span className="font-black flex-shrink-0">\${b.percent}%</span>
                                </button>
                              );
                            })}`;

if (content.includes(oldBonusRender)) {
  content = content.replace(oldBonusRender, newBonusRender);
  console.log('Successfully updated bonus buttons render in 6-slot simulator in src/app.jsx');
} else {
  console.error('Failed to locate oldBonusRender in src/app.jsx');
}

fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully updated src/app.jsx!');
