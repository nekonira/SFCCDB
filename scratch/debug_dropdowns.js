const fs = require('fs');

global.window = global;

// Read mockData and specialCardsData
const mockDataContent = fs.readFileSync('src/data/mockData.js', 'utf8');
const specialCardsContent = fs.readFileSync('src/data/specialCardsData.js', 'utf8');

// Load MOCK_PLAYERS
const evalPlayers = new Function(mockDataContent + '\nreturn window.INITIAL_PLAYERS || MOCK_PLAYERS;');
const players = evalPlayers();

// Load OFFICIAL_CARDS
const evalCards = new Function(specialCardsContent + '\nreturn OFFICIAL_SPECIAL_CARDS;');
const cards = evalCards();

console.log(`Loaded ${players.length} players and ${cards.length} cards.`);

// Let's test PlayerDB dropdown options:
const sortConfigKeys = [
  'overall', 'totalStats18', 'nationality', 'name', 'pos',
  'playStyle', 'playStyleLevel', 'policy', 'shoot', 'pass',
  'dribble', 'defense', 'physical', 'speed'
];

const POS_ORDER = {
  'GK': 1,
  'CB': 2,
  'LFB': 3, 'LSB': 3,
  'RFB': 4, 'RSB': 4,
  'DM': 5, 'DM': 5, 'CMF': 5,
  'LM': 6, 'LMF': 6,
  'RM': 7, 'RMF': 7,
  'AM': 8, 'AM': 8,
  'LW': 9, 'LWG': 9,
  'RW': 10, 'RWG': 10,
  'CF': 11
};

function getNationalityReading(n) { return n || ''; }

function getPlayerTotalStats18(player) {
  if (!player) return 0;
  if (!player.detailStats) {
    if (!player.baseStats) return 0;
    return Object.values(player.baseStats).reduce((sum, v) => sum + (Number(v) || 0), 0);
  }
  let total = 0;
  Object.keys(player.detailStats).forEach(catKey => {
    const catObj = player.detailStats[catKey];
    Object.values(catObj).forEach(val => {
      total += (Number(val) || 0);
    });
  });
  return total;
}

function getCategoryTotal(player, catKey) {
  if (!player || !player.detailStats || !player.detailStats[catKey]) {
    return player?.baseStats?.[catKey] || 0;
  }
  const obj = player.detailStats[catKey];
  return Object.values(obj).reduce((sum, v) => sum + (Number(v) || 0), 0);
}

console.log('\n--- PLAYER DB SORT TESTS ---');
sortConfigKeys.forEach(sortKey => {
  const direction = (sortKey === 'nationality' || sortKey === 'name' || sortKey === 'pos' || sortKey === 'playStyle') ? 'asc' : 'desc';
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
        const levelMap = { 'Ⅰ': 1, 'Ⅱ': 2, 'Ⅲ': 3, 'Ⅳ': 4, 'Ⅴ': 5 };
        const lvlA = levelMap[a.playStyleLevel] || parseInt(a.playStyleLevel) || 0;
        const lvlB = levelMap[b.playStyleLevel] || parseInt(b.playStyleLevel) || 0;
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
        if (natA !== natB) {
          const readA = getNationalityReading(natA);
          const readB = getNationalityReading(natB);
          primaryResult = readA.localeCompare(readB, 'ja');
        } else {
          primaryResult = 0;
        }
        break;
      }
      case 'overall': {
        primaryResult = (a.overall || 0) - (b.overall || 0);
        break;
      }
      case 'totalStats18': {
        const totA = getPlayerTotalStats18(a);
        const totB = getPlayerTotalStats18(b);
        primaryResult = totA - totB;
        break;
      }
      case 'policy': {
        const polA = a.policy || '';
        const polB = b.policy || '';
        primaryResult = polA.localeCompare(polB, 'ja');
        break;
      }
      case 'shoot':
      case 'pass':
      case 'dribble':
      case 'defense':
      case 'physical':
      case 'speed': {
        const statA = getCategoryTotal(a, sortKey);
        const statB = getCategoryTotal(b, sortKey);
        primaryResult = statA - statB;
        break;
      }
      default: {
        primaryResult = (a.overall || 0) - (b.overall || 0);
      }
    }
    if (primaryResult !== 0) return primaryResult * multiplier;
    return (b.overall || 0) - (a.overall || 0);
  });

  console.log(`Key "${sortKey}" (${direction}): Top 3 ->`, sorted.slice(0, 3).map(p => `${p.name} (${p[sortKey] || getCategoryTotal(p, sortKey) || p.mainPosition})`));
});

console.log('\n--- SPECIAL CARD SIMULATOR SORT TESTS ---');
const cardSortKeys = ['DEFAULT', 'rank', 'category', 'bonus', 'maxSum', 'baseSum', 'name'];

const getRankWeight = (rank) => (rank === 'SSR' ? 2 : rank === 'SR' ? 1 : 0);
const getCardBaseSum = (c) => Object.values(c.stages['無凸'] || {}).reduce((a, b) => a + b, 0);
const getCardMaxSum = (c) => Object.values(c.stages['完凸'] || {}).reduce((a, b) => a + b, 0);
const getCardBonusPercent = (c) => (c.playstyleBonus ? (c.playstyleBonus.percent || 0) : 0);

cardSortKeys.forEach(sortKey => {
  if (sortKey === 'DEFAULT') return;
  const direction = sortKey === 'name' ? 'asc' : 'desc';
  const mult = direction === 'asc' ? 1 : -1;

  const sorted = [...cards].sort((a, b) => {
    let diff = 0;
    switch (sortKey) {
      case 'rank':
        diff = getRankWeight(a.rank) - getRankWeight(b.rank);
        break;
      case 'category':
        const catA = a.category || a.cardType || 'ストライカー';
        const catB = b.category || b.cardType || 'ストライカー';
        diff = catA.localeCompare(catB, 'ja');
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
      default:
        return 0;
    }
    if (diff !== 0) return diff * mult;
    return a.name.localeCompare(b.name, 'ja');
  });

  console.log(`Card Key "${sortKey}" (${direction}): Top 3 ->`, sorted.slice(0, 3).map(c => `${c.name} (val: ${c[sortKey] || getCardBonusPercent(c) || c.rank})`));
});
