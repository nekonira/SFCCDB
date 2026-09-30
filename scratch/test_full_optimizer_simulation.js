const fs = require('fs');
const path = require('path');

const appJsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app.js'), 'utf-8');

console.log('=== Running Full Simulation of Auto-Optimizer across Conditions ===');

// Run a simulation test by creating a mock environment and running evaluateSetScore logic
// We can extract officialCards and a test player to evaluate optimization scores
const evalTest = () => {
  // Extract limits and cards from code or simulate standard numbers
  const playerLimits = {
    "決定力": { base: 2850, maxLimit: 3000 },
    "キック力": { base: 2880, maxLimit: 3000 },
    "冷静さ": { base: 2800, maxLimit: 3000 },
    "突破力": { base: 2820, maxLimit: 3000 },
    "ボ-ルタッチ": { base: 2860, maxLimit: 3000 }
  };

  const sampleCards = [
    { id: 'c1', name: 'カードA (+90)', boost: 90 },
    { id: 'c2', name: 'カードB (+85)', boost: 85 },
    { id: 'c3', name: 'カードC (+80)', boost: 80 },
    { id: 'c4', name: 'カードD (+75)', boost: 75 },
    { id: 'c5', name: 'カードE (+70)', boost: 70 },
    { id: 'c6', name: 'カードF (+65)', boost: 65 },
  ];

  const evalSet = (cardSet, multiplier, overflowCoeff) => {
    let effectiveScore = 0;
    let overflowPenalty = 0;
    let totalEffectiveGain = 0;

    Object.entries(playerLimits).forEach(([stName, lim]) => {
      let gainVal = 0;
      cardSet.forEach(c => gainVal += c.boost * multiplier);
      const rawVal = lim.base + gainVal;
      const effectiveVal = Math.min(lim.maxLimit, rawVal);
      const effectiveGain = effectiveVal - lim.base;
      effectiveScore += effectiveGain * 3.0;
      totalEffectiveGain += effectiveGain;

      if (rawVal > lim.maxLimit) {
        overflowPenalty += (rawVal - lim.maxLimit) * overflowCoeff;
      }
    });

    return { score: effectiveScore - overflowPenalty, effectiveGain: totalEffectiveGain };
  };

  console.log('\n--- Comparing Old (5.0 penalty) vs Fixed (0.001 penalty) ---');

  [1.0, 1.25, 1.5].forEach(mult => {
    const oldRes = evalSet(sampleCards, mult, 5.0);
    const fixedRes = evalSet(sampleCards, mult, 0.001);
    console.log(`Multiplier ${mult}x:`);
    console.log(`  OLD Score (coeff=5.0):   ${oldRes.score.toFixed(1)} (Effective Gain: ${oldRes.effectiveGain})`);
    console.log(`  FIXED Score (coeff=0.001): ${fixedRes.score.toFixed(1)} (Effective Gain: ${fixedRes.effectiveGain})`);
  });
};

evalTest();
