const fs = require('fs');
const mock = fs.readFileSync('src/data/mockData.js', 'utf-8');
const vm = require('vm');
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mock, sandbox);
const players = sandbox.window.INITIAL_PLAYERS;

const FORMATION_COMBOS = [
  {
    id: 'lesBleus26',
    name: 'レ・ブルー’26',
    rank: '金',
    policy: 'ムービング',
    formationId: '433b_lesBleus26',
    buffs: [
      { name: 'ボールタッチ', val: '+80%' },
      { name: 'タックル', val: '+80%' },
      { name: 'マーク', val: '+80%' },
      { name: 'コンタクト', val: '+80%' }
    ],
    specialNote: 'フィールド上のフランス選手1人につき、上記4能力（ボールタッチ・タックル・マーク・コンタクト）が追加で2%強化！'
  }
];

const FORMATIONS = [
  {
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
  }
];

const levelMap = { 'Ⅰ': 1, 'Ⅱ': 2, 'Ⅲ': 3, 'Ⅳ': 4, 'Ⅴ': 5 };
const parsePlayStyleLevel = (val) => {
  if (!val) return 0;
  if (levelMap[val]) return levelMap[val];
  const num = parseInt(String(val).replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
};

const matchPlayStyle = (pStyle, reqStyle) => {
  if (!pStyle || !reqStyle) return false;
  return pStyle.trim() === reqStyle.trim();
};

const checkPlayStyleRequirement = (player, requiredStyle, minLevel) => {
  if (!player) return false;
  const allStyles = [player.playStyle, player.style, ...(player.subPlayStyles || [])].filter(Boolean);
  const styleMatched = allStyles.some(s => matchPlayStyle(s, requiredStyle));
  const levelNum = parsePlayStyleLevel(player.playStyleLevel || player.styleLevel);
  return styleMatched && levelNum >= minLevel;
};

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

const getAdjustedPlayer = (player, targetRarity, isMaxEnhanced) => {
  if (!player) return player;
  if (isMaxEnhanced && player.maxEnhanced) {
    return {
      ...player,
      rarity: '☆5',
      overall: player.maxEnhanced.overall || player.maxOverall || player.overall,
      baseStats: player.maxEnhanced.baseStats || player.baseStats,
      detailStats: player.maxEnhanced.detailStats || player.detailStats
    };
  }
  return player;
};

function runTest(withLesBleus) {
  const targetFmt = FORMATIONS[0];
  const targetCombo = FORMATION_COMBOS[0];
  const pol = 'ムービング';

  const NATIONAL_TEAM_BONUS_COMBOS = {
    'selecao70': 'ブラジル',
    'laRoja26': 'スペイン'
  };
  if (withLesBleus) {
    NATIONAL_TEAM_BONUS_COMBOS['lesBleus26'] = 'フランス';
  }

  const activeCombo = targetCombo;
  const targetNation = activeCombo ? (NATIONAL_TEAM_BONUS_COMBOS[activeCombo.id] || null) : null;

  const newSquad = {};
  const usedIds = new Set();

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

  const isPosEligible = (p, slotPos) => {
    if (!p) return false;
    if (slotPos === 'DM') {
      return p.mainPosition === 'DM' || p.mainPosition === 'DMF';
    }
    return p.mainPosition === slotPos || (p.subPositions && p.subPositions.includes(slotPos));
  };

  const evaluateCandidateForSlot = (slot, candidate) => {
    const isMainMatch = candidate.mainPosition === slot.pos || (slot.pos === 'DM' && (candidate.mainPosition === 'DMF' || candidate.mainPosition === 'DM'));
    const posScore = isMainMatch ? 2000 : 1000;
    const isTargetNation = targetNation && candidate.nationality === targetNation;
    const nationScore = isTargetNation ? 500 : 0;
    const isPolicyMatch = candidate.policy === pol;
    const policyScore = isPolicyMatch ? 10000 : 0;

    newSquad[slot.id] = candidate;
    const teamOverall = calcExactOverall(newSquad);
    delete newSquad[slot.id];

    return teamOverall * 10 + policyScore + posScore + nationScore;
  };

  if (activeCombo) {
    targetFmt.slots.forEach(slot => {
      if (slot.requiredStyle) {
        let candidates = players.filter(p => !usedIds.has(p.id) && p.policy === pol && isPosEligible(p, slot.pos) && checkPlayStyleRequirement(p, slot.requiredStyle, slot.minLevel));
        if (candidates.length === 0) {
          candidates = players.filter(p => !usedIds.has(p.id) && isPosEligible(p, slot.pos) && checkPlayStyleRequirement(p, slot.requiredStyle, slot.minLevel));
        }
        if (candidates.length > 0) {
          const scored = candidates.map(p => ({ player: p, score: evaluateCandidateForSlot(slot, p) }));
          scored.sort((a, b) => b.score - a.score);
          const best = scored[0].player;
          newSquad[slot.id] = best;
          usedIds.add(best.id);
        }
      }
    });
  }

  targetFmt.slots.forEach(slot => {
    if (newSquad[slot.id]) return;
    let candidates = players.filter(p => !usedIds.has(p.id) && p.policy === pol && isPosEligible(p, slot.pos));
    if (candidates.length === 0) {
      candidates = players.filter(p => !usedIds.has(p.id) && isPosEligible(p, slot.pos));
    }
    if (candidates.length === 0) return;
    const scored = candidates.map(p => ({ player: p, score: evaluateCandidateForSlot(slot, p) }));
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0].player;
    newSquad[slot.id] = best;
    usedIds.add(best.id);
  });

  // Hill climbing
  let bestSquadOverall = calcExactOverall(newSquad);
  let improved = true;
  let pass = 0;

  while (improved && pass < 10) {
    improved = false;
    pass++;

    targetFmt.slots.forEach(slot => {
      let currentP = newSquad[slot.id];
      if (!currentP) return;
      const unusedCandidates = players.filter(p => !usedIds.has(p.id));

      for (const candP of unusedCandidates) {
        if (slot.requiredStyle && !checkPlayStyleRequirement(candP, slot.requiredStyle, slot.minLevel)) continue;
        if (!isPosEligible(candP, slot.pos)) continue;
        if (currentP.policy === pol && candP.policy !== pol) continue;

        newSquad[slot.id] = candP;
        const testOverall = calcExactOverall(newSquad);
        if (testOverall > bestSquadOverall) {
          bestSquadOverall = testOverall;
          usedIds.delete(currentP.id);
          usedIds.add(candP.id);
          currentP = candP;
          improved = true;
          break;
        } else {
          newSquad[slot.id] = currentP;
        }
      }
    });
  }

  console.log('Result with withLesBleus = ' + withLesBleus);
  console.log('Total Team Overall: ' + bestSquadOverall);
  console.log('LW Slot (Slot 9): ' + (newSquad[9] ? (newSquad[9].name + ' (' + newSquad[9].nationality + ')') : 'EMPTY'));
  console.log('Starters:');
  Object.entries(newSquad).forEach(([sId, p]) => {
    const slot = targetFmt.slots.find(s => s.id == sId);
    console.log(`  Slot ${sId} (${slot.pos}): ${p.name} [${p.nationality}]`);
  });
}

console.log('=== TEST 1: WITHOUT lesBleus26 ===');
runTest(false);

console.log('\n=== TEST 2: WITH lesBleus26 ===');
runTest(true);
