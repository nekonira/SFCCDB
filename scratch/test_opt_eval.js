global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {} };

const fs = require('fs');

// Read data
const playersCode = fs.readFileSync('c:/Users/nekon/SFCCdeta/src/data/mockData.js', 'utf8')
  .replace(/export const /g, 'global.')
  .replace(/export default /g, 'global.defaultExport =');
const cardsCode = fs.readFileSync('c:/Users/nekon/SFCCdeta/src/data/specialCardsData.js', 'utf8')
  .replace(/export const /g, 'global.')
  .replace(/export default /g, 'global.defaultExport =');

eval(playersCode);
eval(cardsCode);

const appJsx = fs.readFileSync('c:/Users/nekon/SFCCdeta/src/app.jsx', 'utf8');

// Extract getPositionGroup, checkBonusMatch, calculateCardBonusMult, getPlayerBaseStat, POSITION_LIMIT_ADDITIONS, optimizeSpecialCardSlots
const scope = {};
const funcExtract = appJsx + `
module.exports = {
  optimizeSpecialCardSlots,
  POSITION_LIMIT_ADDITIONS
};
`;

// Let's run babel or simple eval with mocked React
// Or extract optimizeSpecialCardSlots string directly
const match = appJsx.match(/function optimizeSpecialCardSlots[\s\S]*?\n\}/);
console.log('Found function match:', !!match);
