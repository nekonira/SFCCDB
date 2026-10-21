const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {}, console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS;

const STAT_NAME_MAP = {
  '決定力': ['shoot', 'finishing'],
  'キック力': ['shoot', 'power'],
  '冷静さ': ['shoot', 'composure'],
  'ショートパス': ['pass', 'shortPass'],
  'ロングパス': ['pass', 'longPass'],
  'キック精度': ['pass', 'accuracy'],
  '突破力': ['dribble', 'breakout'],
  'キープ力': ['dribble', 'keeping'],
  'ボールタッチ': ['dribble', 'ballTouch'],
  'タックル': ['defense', 'tackle'],
  'パスカット': ['defense', 'interception'],
  'マーク': ['defense', 'marking'],
  'ジャンプ': ['physical', 'jumping'],
  'コンタクト': ['physical', 'contact'],
  'スタミナ': ['physical', 'stamina'],
  '走力': ['speed', 'running'],
  '敏捷性': ['speed', 'agility']
};

const getPlayerStatValue = (player, statName) => {
  if (!player) return 0;
  if (player.detailStats) {
    const entry = STAT_NAME_MAP[statName];
    if (entry) {
      const [cat, key] = entry;
      if (player.detailStats[cat] && player.detailStats[cat][key] !== undefined) {
        return Number(player.detailStats[cat][key]) || 0;
      }
    }
  }
  return Math.round((player.overall || 0) / 18);
};

const normalizePosition = (pos) => {
  if (!pos || pos === 'ALL') return 'ALL';
  const str = String(pos).trim().toUpperCase();
  if (str === 'GK') return 'GK';
  if (['CB', 'LCB', 'RCB', 'DF', 'DC'].includes(str)) return 'CB';
  if (['LFB', 'LB', 'LSB', 'DL', 'SB'].includes(str)) return 'LFB';
  if (['RFB', 'RB', 'RSB', 'DR'].includes(str)) return 'RFB';
  if (['DM', 'LDM', 'RDM', 'DH', 'CH', 'CMF', 'CM'].includes(str)) return 'DM';
  if (['AM', 'LAM', 'RAM', 'AMF', 'OH'].includes(str)) return 'AM';
  if (['LM', 'LMF', 'LSH', 'SMF'].includes(str)) return 'LM';
  if (['RM', 'RMF', 'RSH'].includes(str)) return 'RM';
  if (['LW', 'LWG'].includes(str)) return 'LW';
  if (['RW', 'RWG'].includes(str)) return 'RW';
  if (['CF', 'LCF', 'RCF', 'ST', 'FW'].includes(str)) return 'CF';
  return str;
};

const isPositionMatch = (playerPos, targetPos) => {
  if (!playerPos || !targetPos) return false;
  const targetNorm = normalizePosition(targetPos);
  if (targetNorm === 'ALL') return true;
  const playerNorm = normalizePosition(playerPos);
  return playerNorm === targetNorm;
};

const parsePlayStyleLevel = (lvl) => {
  if (!lvl) return 1;
  const s = String(lvl).trim().toUpperCase();
  if (s === 'V' || s === '5' || s === 'LV5') return 5;
  if (s === 'IV' || s === '4' || s === 'LV4') return 4;
  if (s === 'III' || s === '3' || s === 'LV3' || s === 'Ⅲ') return 3;
  if (s === 'II' || s === '2' || s === 'LV2' || s === 'Ⅱ') return 2;
  if (s === 'I' || s === '1' || s === 'LV1' || s === 'Ⅰ') return 1;
  return 1;
};

const matchPlayStyle = (playerStyle, requiredStyle) => {
  if (!playerStyle || !requiredStyle) return false;
  const normP = String(playerStyle).trim();
  const normReq = String(requiredStyle).trim();
  if (normP === normReq) return true;
  if (normReq === 'サイドアタッカー') return normP.startsWith('サイドアタッカー');
  return normP.startsWith(normReq) || normReq.startsWith(normP);
};

const checkPlayStyleRequirement = (player, requiredStyle, minLevel) => {
  if (!player) return false;
  const allStyles = [player.playStyle, player.style, ...(player.subPlayStyles || [])].filter(Boolean);
  const styleMatched = allStyles.some(s => matchPlayStyle(s, requiredStyle));
  const levelNum = parsePlayStyleLevel(player.playStyleLevel || player.styleLevel);
  return styleMatched && levelNum >= minLevel;
};

const getAdjustedPlayer = (p, rarity, maxEnh) => {
  if (maxEnh && p.maxEnhanced) {
    return {
      ...p,
      overall: p.maxEnhanced.overall,
      baseStats: p.maxEnhanced.baseStats,
      detailStats: p.maxEnhanced.detailStats
    };
  }
  return p;
};

const isPosEligible = (p, slotPos) => {
  if (!p) return false;
  return isPositionMatch(p.mainPosition, slotPos) || (p.subPositions && p.subPositions.some(sp => isPositionMatch(sp, slotPos)));
};

const targetFmt = {
  id: '433b_lesBleus26',
  name: '4-3-3B (レ・ブルー’26)',
  comboId: 'lesBleus26',
  slots: [
    { id: 1, pos: 'GK', label: 'GK' },
    { id: 2, pos: 'LFB', label: 'LFB' },
    { id: 3, pos: 'CB', label: 'LCB', requiredStyle: 'スプリントCB', minLevel: 2 },
    { id: 4, pos: 'CB', label: 'RCB' },
    { id: 5, pos: 'RFB', label: 'RFB', requiredStyle: '守備的RFB', minLevel: 2 },
    { id: 6, pos: 'DM', label: 'LDM', requiredStyle: 'セントラルDM', minLevel: 3 },
    { id: 7, pos: 'DM', label: 'RDM' },
    { id: 8, pos: 'AM', label: 'AM', requiredStyle: 'アタッカー', minLevel: 3 },
    { id: 9, pos: 'LW', label: 'LW' },
    { id: 10, pos: 'CF', label: 'CF' },
    { id: 11, pos: 'RW', label: 'RW' }
  ]
};

const activeCombo = {
  id: 'lesBleus26',
  name: "レ・ブルー’26",
  buffs: [
    { name: 'ボールタッチ', val: '+80%' },
    { name: 'タックル', val: '+80%' },
    { name: 'マーク', val: '+80%' },
    { name: 'コンタクト', val: '+80%' }
  ]
};

const targetNation = 'フランス';
const pol = 'ムービング';

const calcExactOverall = (sq) => {
  const starters = Object.values(sq).filter(Boolean).map(p => getAdjustedPlayer(p, '☆5', true));
  const rawBaseOverall = starters.reduce((acc, p) => acc + (p.overall || 0), 0);
  const policyAdjustedOverall = starters.reduce((acc, p) => acc + (p.policy === pol ? Math.floor((p.overall || 0) * 1.05) : (p.overall || 0)), 0);
  const policyBonusGained = policyAdjustedOverall - rawBaseOverall;

  let totalComboStatBonus = 0;
  if (activeCombo) {
    const reqResults = targetFmt.slots.filter(s => s.requiredStyle).map(s => {
      const pInSlot = sq[s.id];
      return checkPlayStyleRequirement(pInSlot, s.requiredStyle, s.minLevel);
    });
    const allFulfilled = reqResults.length > 0 && reqResults.every(Boolean);
    if (allFulfilled && activeCombo.buffs) {
      const natCnt = targetNation ? starters.filter(p => p.nationality === targetNation).length : 0;
      const nEx = natCnt * 2;

      activeCombo.buffs.forEach(b => {
        const basePct = parseInt(String(b.val).replace(/[^0-9]/g, ''), 10) || 0;
        const effectivePct = basePct + nEx;
        starters.forEach(p => {
          const statVal = getPlayerStatValue(p, b.name);
          totalComboStatBonus += Math.floor(statVal * (effectivePct / 100));
        });
      });
    }
  }
  return rawBaseOverall + policyBonusGained + totalComboStatBonus;
};

// Let's test combinations of fixed French core and find best RW / alternatives
const core = {
  1: players.find(p => p.name === 'リュカ・シュヴァリエ'),
  2: players.find(p => p.name === 'テオ・エルナンデス'),
  3: players.find(p => p.name === 'イブラヒマ・コナテ'),
  4: players.find(p => p.name === 'マクサンス・ラクロワ'),
  5: players.find(p => p.name === 'マロ・ギュスト'),
  6: players.find(p => p.name === 'アドリアン・ラビオ'),
  7: players.find(p => p.name === 'エンゴロ・カンテ'),
  8: players.find(p => p.name.includes('ウスマン・デンベレ')),
  9: players.find(p => p.name === 'デジレ・ドゥエ'),
  10: players.find(p => p.name === 'キリアン・エンバペ')
};

console.log('Testing RW candidates for Slot 11:');
const rwCandidates = players.filter(p => isPosEligible(p, 'RW'));
const results = [];

rwCandidates.forEach(cand => {
  const sq = { ...core, 11: cand };
  const ovr = calcExactOverall(sq);
  results.push({ player: cand, overall: ovr });
});

results.sort((a,b) => b.overall - a.overall);

console.log('\nTop 10 RW options:');
results.slice(0, 10).forEach(r => {
  console.log(`${r.player.name} (${r.player.nationality}, ${r.player.policy}, maxOvr: ${r.player.maxEnhanced?.overall||r.player.overall}) -> Team Total Overall: ${r.overall}`);
});

console.log('\nTop 5 MOVING RW options (for unified policy):');
results.filter(r => r.player.policy === 'ムービング').slice(0, 5).forEach(r => {
  console.log(`${r.player.name} (${r.player.nationality}, ${r.player.policy}, maxOvr: ${r.player.maxEnhanced?.overall||r.player.overall}) -> Team Total Overall: ${r.overall}`);
});

// Also test if replacing any other slot (e.g. GK with Courtois/Alisson/etc., or CB with Van Dijk/Saliba) yields higher overall
console.log('\nTesting alternative GK/CB/LFB/etc. against French buff:');
const testGks = players.filter(p => isPosEligible(p, 'GK'));
const gkResults = testGks.map(gk => {
  const sq = { ...core, 1: gk, 11: results[0].player };
  return { gk, overall: calcExactOverall(sq) };
}).sort((a,b) => b.overall - a.overall);
console.log('Best GK:', gkResults[0].gk.name, gkResults[0].overall, 'vs Chevalier:', gkResults.find(r => r.gk.name === 'リュカ・シュヴァリエ').overall);

const testCbs = players.filter(p => isPosEligible(p, 'CB'));
const cbResults = testCbs.map(cb => {
  const sq = { ...core, 4: cb, 11: results[0].player };
  return { cb, overall: calcExactOverall(sq) };
}).sort((a,b) => b.overall - a.overall);
console.log('Best RCB:', cbResults[0].cb.name, cbResults[0].overall, 'vs Lacroix:', cbResults.find(r => r.cb.name === 'マクサンス・ラクロワ').overall);
