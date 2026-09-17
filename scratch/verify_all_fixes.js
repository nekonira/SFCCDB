const fs = require('fs');

// Create sandbox to test app logic with mockData & specialCardsData
const mockContent = fs.readFileSync('src/data/mockData.js', 'utf8');
const cardsContent = fs.readFileSync('src/data/specialCardsData.js', 'utf8');
const appJsContent = fs.readFileSync('src/app.js', 'utf8');

// Use Node VM to evaluate and run verification
const vm = require('vm');
const sandbox = {
  window: {},
  console: console,
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

vm.runInContext(mockContent, sandbox);
vm.runInContext(cardsContent, sandbox);

// Extract helper functions checkSingleBonusMatch, calculateCardBonusMult from appJsContent
const evalScript = `
${appJsContent}

// Run verification tests
const players = window.INITIAL_PLAYERS || [];
const cards = window.OFFICIAL_SPECIAL_CARDS || [];

const strikerPlayer = players.find(p => p.playStyle === 'ストライカー') || { name: 'ストライカー選手', playStyle: 'ストライカー', mainPosition: 'CF' };
const lineBreakerPlayer = players.find(p => p.playStyle === 'ラインブレーカー') || { name: 'ラインブレーカー選手', playStyle: 'ラインブレーカー', mainPosition: 'CF' };

const lineBreakerCard = cards.find(c => c.playstyleBonus && c.playstyleBonus.style && c.playstyleBonus.style.includes('ラインブレーカー')) || {
  id: 'c_lb', name: 'ラインブレーカー特練', playstyleBonus: { style: 'ラインブレーカー 15% / CF 10%', bonuses: [{ style: 'ラインブレーカー', percent: 15 }, { style: 'CF', percent: 10 }] }
};

const strikerCard = cards.find(c => c.playstyleBonus && c.playstyleBonus.style && c.playstyleBonus.style.includes('ストライカー')) || {
  id: 'c_st', name: 'ストライカー特練', playstyleBonus: { style: 'ストライカー 15% / CF 10%', bonuses: [{ style: 'ストライカー', percent: 15 }, { style: 'CF', percent: 10 }] }
};

console.log('=== END-TO-END VERIFICATION ===');
console.log('Striker Player:', strikerPlayer.name, 'Style:', strikerPlayer.playStyle, 'Pos:', strikerPlayer.mainPosition);
console.log('LineBreaker Player:', lineBreakerPlayer.name, 'Style:', lineBreakerPlayer.playStyle, 'Pos:', lineBreakerPlayer.mainPosition);

console.log('\n1. Striker Player + LineBreaker Card:');
console.log('   Mult:', calculateCardBonusMult(strikerPlayer, lineBreakerCard));
console.log('   Match LineBreaker style:', checkSingleBonusMatch(strikerPlayer, 'ラインブレーカー'));
console.log('   Match CF position:', checkSingleBonusMatch(strikerPlayer, 'CF'));

console.log('\n2. LineBreaker Player + Striker Card:');
console.log('   Mult:', calculateCardBonusMult(lineBreakerPlayer, strikerCard));
console.log('   Match Striker style:', checkSingleBonusMatch(lineBreakerPlayer, 'ストライカー'));
console.log('   Match CF position:', checkSingleBonusMatch(lineBreakerPlayer, 'CF'));

console.log('\n3. LineBreaker Player + LineBreaker Card:');
console.log('   Mult:', calculateCardBonusMult(lineBreakerPlayer, lineBreakerCard));
console.log('   Match LineBreaker style:', checkSingleBonusMatch(lineBreakerPlayer, 'ラインブレーカー'));
console.log('   Match CF position:', checkSingleBonusMatch(lineBreakerPlayer, 'CF'));

console.log('\n4. Striker Player + Striker Card:');
console.log('   Mult:', calculateCardBonusMult(strikerPlayer, strikerCard));
console.log('   Match Striker style:', checkSingleBonusMatch(strikerPlayer, 'ストライカー'));
console.log('   Match CF position:', checkSingleBonusMatch(strikerPlayer, 'CF'));
`;

try {
  vm.runInContext(evalScript, sandbox);
} catch (err) {
  console.error('Verification error:', err);
}
