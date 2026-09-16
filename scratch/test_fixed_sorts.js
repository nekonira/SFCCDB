const fs = require('fs');

global.window = global;

const mockDataContent = fs.readFileSync('src/data/mockData.js', 'utf8');
const specialCardsContent = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

const players = new Function(mockDataContent + '\nreturn window.INITIAL_PLAYERS || MOCK_PLAYERS;')();
const cards = new Function(specialCardsContent + '\nreturn OFFICIAL_SPECIAL_CARDS;')();

console.log(`Loaded ${players.length} players and ${cards.length} cards.`);

// Position map fix
const POS_ORDER = {
  'GK': 1,
  'CB': 2,
  'LB': 3, 'LFB': 3, 'LSB': 3,
  'RB': 4, 'RFB': 4, 'RSB': 4,
  'DM': 5, 'DMF': 5, 'CMF': 5,
  'LM': 6, 'LMF': 6, 'SMF': 6,
  'RM': 7, 'RMF': 7,
  'AM': 8, 'OMF': 8,
  'LW': 9, 'LWG': 9, 'WG': 9,
  'RW': 10, 'RWG': 10,
  'ST': 10.5,
  'CF': 11, 'FW': 11
};

// PlayStyleLevel parser fix
const levelMap = { 'Ⅰ': 1, 'Ⅱ': 2, 'Ⅲ': 3, 'Ⅳ': 4, 'Ⅴ': 5 };
function parseLevel(val) {
  if (!val) return 0;
  if (levelMap[val]) return levelMap[val];
  const str = String(val).trim();
  if (levelMap[str]) return levelMap[str];
  const clean = str.replace(/[^0-9]/g, '');
  const num = parseInt(clean, 10);
  return isNaN(num) ? 0 : num;
}

// Card stat sum parser fix
const parseStatVal = (val) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const clean = val.replace(/\(.*?\)/g, '').replace(/[^0-9.-]/g, '');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

const getCardBaseSum = (c) => Object.values(c.stages?.['無凸'] || {}).reduce((a, b) => a + parseStatVal(b), 0);
const getCardMaxSum = (c) => Object.values(c.stages?.['完凸'] || {}).reduce((a, b) => a + parseStatVal(b), 0);

const getCardBonusPercent = (c) => {
  if (!c || !c.playstyleBonus) return 0;
  if (typeof c.playstyleBonus.percent === 'number' && c.playstyleBonus.percent > 0) {
    return c.playstyleBonus.percent;
  }
  if (Array.isArray(c.playstyleBonus.bonuses)) {
    return c.playstyleBonus.bonuses.reduce((sum, b) => sum + (Number(b.percent) || 0), 0);
  }
  return 0;
};

console.log('\n--- VERIFYING PLAYER DB SORTS ---');
const pSortKeys = [
  'overall', 'totalStats18', 'nationality', 'name', 'pos',
  'playStyle', 'playStyleLevel', 'policy', 'shoot', 'pass',
  'dribble', 'defense', 'physical', 'speed'
];

pSortKeys.forEach(sortKey => {
  const direction = (sortKey === 'nationality' || sortKey === 'name' || sortKey === 'pos' || sortKey === 'playStyle' || sortKey === 'policy') ? 'asc' : 'desc';
  const multiplier = direction === 'asc' ? 1 : -1;

  const sorted = [...players].sort((a, b) => {
    let primaryResult = 0;
    switch (sortKey) {
      case 'playStyle': {
        const styleA = a.playStyle || '';
        const styleB = b.playStyle || '';
        primaryResult = styleA.localeCompare(styleB, 'ja');
        break;
      }
      case 'playStyleLevel': {
        const lvlA = parseLevel(a.playStyleLevel);
        const lvlB = parseLevel(b.playStyleLevel);
        primaryResult = lvlA - lvlB;
        break;
      }
      case 'name': {
        const nameA = a.readingName || a.name || '';
        const nameB = b.readingName || b.name || '';
        primaryResult = nameA.localeCompare(nameB, 'ja');
        break;
      }
      case 'pos': {
        const orderA = POS_ORDER[a.mainPosition] || 99;
        const orderB = POS_ORDER[b.mainPosition] || 99;
        primaryResult = orderA - orderB;
        break;
      }
      case 'nationality': {
        const natA = (a.nationality || 'その他').trim();
        const natB = (b.nationality || 'その他').trim();
        primaryResult = natA.localeCompare(natB, 'ja');
        break;
      }
      case 'overall': {
        primaryResult = (a.overall || 0) - (b.overall || 0);
        break;
      }
      case 'policy': {
        const polA = a.policy || '';
        const polB = b.policy || '';
        primaryResult = polA.localeCompare(polB, 'ja');
        break;
      }
      default:
        primaryResult = (a.overall || 0) - (b.overall || 0);
    }
    if (primaryResult !== 0) return primaryResult * multiplier;
    return (b.overall || 0) - (a.overall || 0);
  });

  console.log(`Player Key "${sortKey}" (${direction}): Top 3 ->`, sorted.slice(0, 3).map(p => `${p.name} (${p[sortKey] || p.mainPosition})`));
});

console.log('\n--- VERIFYING CARD SIMULATOR SORTS ---');
const cSortKeys = ['rank', 'category', 'bonus', 'maxSum', 'baseSum', 'name'];

cSortKeys.forEach(sortKey => {
  const direction = sortKey === 'name' ? 'asc' : 'desc';
  const mult = direction === 'asc' ? 1 : -1;

  const sorted = [...cards].sort((a, b) => {
    let diff = 0;
    switch (sortKey) {
      case 'rank':
        diff = (a.rank === 'SSR' ? 2 : 1) - (b.rank === 'SSR' ? 2 : 1);
        break;
      case 'category':
        diff = (a.category || a.cardType || '').localeCompare(b.category || b.cardType || '', 'ja');
        break;
      case 'name':
        diff = a.name.localeCompare(b.name, 'ja');
        break;
      case 'bonus':
        diff = getCardBonusPercent(a) - getCardBonusPercent(b);
        break;
      case 'baseSum':
        diff = getCardBaseSum(a) - getCardBaseSum(b);
        break;
      case 'maxSum':
        diff = getCardMaxSum(a) - getCardMaxSum(b);
        break;
    }
    if (diff !== 0) return diff * mult;
    return a.name.localeCompare(b.name, 'ja');
  });

  console.log(`Card Key "${sortKey}" (${direction}): Top 3 ->`, sorted.slice(0, 3).map(c => {
    let val = '';
    if (sortKey === 'baseSum') val = getCardBaseSum(c).toFixed(1);
    else if (sortKey === 'maxSum') val = getCardMaxSum(c).toFixed(1);
    else if (sortKey === 'bonus') val = getCardBonusPercent(c) + '%';
    else val = c[sortKey] || c.rank;
    return `${c.name} (${val})`;
  }));
});
