const fs = require('fs');
const vm = require('vm');

const mockCode = fs.readFileSync('src/data/mockData.js', 'utf-8');
const sandbox = { window: {}, console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS;

const FORMATION_COMBOS = [
  {
    id: 'lesBleus26',
    name: "レ・ブルー’26",
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

const targetFmt = {
  id: '433b_lesBleus26',
  name: '4-3-3B (レ・ブルー’26)',
  comboId: 'lesBleus26',
  slots: [
    { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
    { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
    { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'スプリントCB', minLevel: 2 },
    { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
    { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '守備的RFB', minLevel: 2 },
    { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'セントラルDM', minLevel: 3 },
    { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
    { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 3 },
    { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
    { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
    { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' }
  ]
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

const normalizePosition = (pos) => {
  if (!pos || pos === 'ALL') return 'ALL';
  const str = String(pos).trim().toUpperCase();
  if (str === 'GK') return 'GK';
  if (['CB', 'LCB', 'RCB', 'DF', 'DC'].includes(str)) return 'CB';
  if (['LFB', 'LB', 'LSB', 'DL', 'SB'].includes(str)) return 'LFB';
  if (['RFB', 'RB', 'RSB', 'DR'].includes(str)) return 'RFB';
  if (['DM', 'LDM', 'RDM', 'DM', 'DH', 'CH', 'CMF', 'CM'].includes(str)) return 'DM';
  if (['AM', 'LAM', 'RAM', 'AMF', 'AM', 'OH'].includes(str)) return 'AM';
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

// Now let's extract runAutoBuildForFormation logic from app.jsx
const appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

// Function 1: original auto build
const isPosEligible = (p, slotPos) => {
  if (!p) return false;
  return p.mainPosition === slotPos || (p.subPositions && p.subPositions.includes(slotPos));
};

console.log('--- Testing isPosEligible ---');
const doue = players.find(p => p.name.includes('ドゥエ'));
console.log('Doue for LW:', isPosEligible(doue, 'LW'));
console.log('Doue for AM:', isPosEligible(doue, 'AM'));
const mitoma = players.find(p => p.name.includes('三笘薫(日本代表)'));
console.log('Mitoma for AM:', isPosEligible(mitoma, 'AM'));
console.log('Mitoma for LM:', isPosEligible(mitoma, 'LM'));
