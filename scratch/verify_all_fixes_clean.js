const fs = require('fs');

const appJs = fs.readFileSync('src/app.js', 'utf8');

// Test checkSingleBonusMatch extracted logic
const evalCode = `
${appJs}

const testP1 = { name: 'ストライカー選手', playStyle: 'ストライカー', mainPosition: 'CF' };
const testP2 = { name: 'ラインブレーカー選手', playStyle: 'ラインブレーカー', mainPosition: 'CF' };

const cardLB = { id: 'c1', name: 'ラインブレーカーカード', playstyleBonus: { style: 'ラインブレーカー 15% / CF 10%', bonuses: [{ style: 'ラインブレーカー', percent: 15 }, { style: 'CF', percent: 10 }] } };
const cardST = { id: 'c2', name: 'ストライカーカード', playstyleBonus: { style: 'ストライカー 15% / CF 10%', bonuses: [{ style: 'ストライカー', percent: 15 }, { style: 'CF', percent: 10 }] } };

console.log('--- TEST VERIFICATION RESULTS ---');
console.log('1. Striker vs LineBreaker Card bonus multiplier:', calculateCardBonusMult(testP1, cardLB));
console.log('   LineBreaker bonus match:', checkSingleBonusMatch(testP1, 'ラインブレーカー'));
console.log('   CF position match:', checkSingleBonusMatch(testP1, 'CF'));

console.log('\n2. LineBreaker vs Striker Card bonus multiplier:', calculateCardBonusMult(testP2, cardST));
console.log('   Striker bonus match:', checkSingleBonusMatch(testP2, 'ストライカー'));
console.log('   CF position match:', checkSingleBonusMatch(testP2, 'CF'));

console.log('\n3. LineBreaker vs LineBreaker Card bonus multiplier:', calculateCardBonusMult(testP2, cardLB));
console.log('   LineBreaker bonus match:', checkSingleBonusMatch(testP2, 'ラインブレーカー'));
console.log('   CF position match:', checkSingleBonusMatch(testP2, 'CF'));

console.log('\n4. Striker vs Striker Card bonus multiplier:', calculateCardBonusMult(testP1, cardST));
console.log('   Striker bonus match:', checkSingleBonusMatch(testP1, 'ストライカー'));
console.log('   CF position match:', checkSingleBonusMatch(testP1, 'CF'));
`;

const vm = require('vm');
const sandbox = {
  console: console,
  window: {},
  React: {
    useState: () => [null, () => {}],
    useEffect: () => {},
    useMemo: (fn) => fn(),
    useRef: () => ({ current: null }),
    useCallback: (fn) => fn,
    createElement: () => ({})
  }
};
vm.createContext(sandbox);
vm.runInContext(evalCode, sandbox);
