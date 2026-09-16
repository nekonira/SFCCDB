const fs = require('fs');

// Load mockData and specialCardsData
const mockDataContent = fs.readFileSync('src/data/mockData.js', 'utf8');
const specialCardsContent = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const appJsxContent = fs.readFileSync('src/app.jsx', 'utf8');

console.log('--- Testing PlayerDB Sort logic ---');

// Extract POS_ORDER and sort function logic from app.jsx
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

function getNationalityReading(nat) {
  return nat || '';
}

function getPlayerTotalStats18(p) {
  if (!p || !p.stats) return 0;
  return Object.values(p.stats).reduce((a, b) => a + (Number(b) || 0), 0);
}

function getCategoryTotal(p, catKey) {
  if (!p) return 0;
  // Simplified for testing
  return p.overall || 0;
}

// Let's test the PlayerDB sort keys:
const sortKeys = [
  'overall', 'totalStats18', 'nationality', 'name', 'pos',
  'playStyle', 'playStyleLevel', 'policy', 'shoot', 'pass',
  'dribble', 'defense', 'physical', 'speed'
];

sortKeys.forEach(key => {
  const direction = (key === 'nationality' || key === 'name' || key === 'pos' || key === 'playStyle') ? 'asc' : 'desc';
  const multiplier = direction === 'asc' ? 1 : -1;
  console.log(`Testing PlayerDB sort key: "${key}" (dir: ${direction})`);
});

console.log('\n--- Testing Special Card Simulator Sort logic ---');
const cardSortKeys = ['DEFAULT', 'rank', 'category', 'bonus', 'maxSum', 'baseSum', 'name'];

cardSortKeys.forEach(key => {
  const direction = key === 'name' ? 'asc' : 'desc';
  console.log(`Testing Card sort key: "${key}" (dir: ${direction})`);
});
