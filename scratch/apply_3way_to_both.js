const fs = require('fs');

// --- 1. Update src/app.jsx ---
let appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

const targetLoopEndJsx = `            }
          });
        });
      }

      const getEffVal = p => {`;

const replacementLoopJsx = `            }
          });
        });

        // 3スロット循環シフト探索 (例: RWにデンベレ, LWにバルコラ, AMにドゥエ等の複合入れ替え)
        targetFmt.slots.forEach(slotA => {
          const pA = newSquad[slotA.id];
          if (!pA) return;
          targetFmt.slots.forEach(slotB => {
            if (slotA.id === slotB.id) return;
            const pB = newSquad[slotB.id];
            if (!pB) return;
            const pAEligibleB = (!slotB.requiredStyle || checkPlayStyleRequirement(pA, slotB.requiredStyle, slotB.minLevel)) && isPosEligible(pA, slotB.pos);
            if (!pAEligibleB) return;

            targetFmt.slots.forEach(slotC => {
              if (slotC.id === slotA.id || slotC.id === slotB.id) return;
              const pC = newSquad[slotC.id];
              if (!pC) return;
              const pBEligibleC = (!slotC.requiredStyle || checkPlayStyleRequirement(pB, slotC.requiredStyle, slotC.minLevel)) && isPosEligible(pB, slotC.pos);
              if (!pBEligibleC) return;

              const unusedCandidates = players.filter(p => !usedIds.has(p.id));
              for (const cand of unusedCandidates) {
                const candEligibleA = (!slotA.requiredStyle || checkPlayStyleRequirement(cand, slotA.requiredStyle, slotA.minLevel)) && isPosEligible(cand, slotA.pos);
                if (!candEligibleA) continue;

                newSquad[slotA.id] = cand;
                newSquad[slotB.id] = pA;
                newSquad[slotC.id] = pB;
                const testOverall = calcExactOverall(newSquad);
                if (testOverall > bestSquadOverall) {
                  bestSquadOverall = testOverall;
                  usedIds.delete(pC.id);
                  usedIds.add(cand.id);
                  improved = true;
                  break;
                } else {
                  newSquad[slotA.id] = pA;
                  newSquad[slotB.id] = pB;
                  newSquad[slotC.id] = pC;
                }
              }
            });
          });
        });
      }

      const getEffVal = p => {`;

let countJsx = 0;
while (appJsx.includes(targetLoopEndJsx)) {
  appJsx = appJsx.replace(targetLoopEndJsx, replacementLoopJsx);
  countJsx++;
}
console.log('Updated app.jsx loop count:', countJsx);
if (countJsx < 2) {
  console.error('ERROR: Could not replace both loops in app.jsx');
  process.exit(1);
}
fs.writeFileSync('src/app.jsx', appJsx, 'utf-8');
console.log('✅ Updated src/app.jsx with 3-way rotation optimization');

// --- 2. Update src/app.js ---
let appJs = fs.readFileSync('src/app.js', 'utf-8');

const targetLoopEndJs = `newSquad[slotA.id]=pA;newSquad[slotB.id]=pB;}}}});});}const getEffVal=p=>{`;

const replacementLoopJs = `newSquad[slotA.id]=pA;newSquad[slotB.id]=pB;}}}});});targetFmt.slots.forEach(slotA=>{const pA=newSquad[slotA.id];if(!pA)return;targetFmt.slots.forEach(slotB=>{if(slotA.id===slotB.id)return;const pB=newSquad[slotB.id];if(!pB)return;const pAEligibleB=(!slotB.requiredStyle||checkPlayStyleRequirement(pA,slotB.requiredStyle,slotB.minLevel))&&isPosEligible(pA,slotB.pos);if(!pAEligibleB)return;targetFmt.slots.forEach(slotC=>{if(slotC.id===slotA.id||slotC.id===slotB.id)return;const pC=newSquad[slotC.id];if(!pC)return;const pBEligibleC=(!slotC.requiredStyle||checkPlayStyleRequirement(pB,slotC.requiredStyle,slotC.minLevel))&&isPosEligible(pB,slotC.pos);if(!pBEligibleC)return;const unusedCandidates=players.filter(p=>!usedIds.has(p.id));for(const cand of unusedCandidates){const candEligibleA=(!slotA.requiredStyle||checkPlayStyleRequirement(cand,slotA.requiredStyle,slotA.minLevel))&&isPosEligible(cand,slotA.pos);if(!candEligibleA)continue;newSquad[slotA.id]=cand;newSquad[slotB.id]=pA;newSquad[slotC.id]=pB;const testOverall=calcExactOverall(newSquad);if(testOverall>bestSquadOverall){bestSquadOverall=testOverall;usedIds.delete(pC.id);usedIds.add(cand.id);improved=true;break;}else{newSquad[slotA.id]=pA;newSquad[slotB.id]=pB;newSquad[slotC.id]=pC;}}});});});}const getEffVal=p=>{`;

let countJs = 0;
while (appJs.includes(targetLoopEndJs)) {
  appJs = appJs.replace(targetLoopEndJs, replacementLoopJs);
  countJs++;
}
console.log('Updated app.js loop count:', countJs);
if (countJs < 2) {
  console.error('ERROR: Could not replace both loops in app.js');
  process.exit(1);
}
fs.writeFileSync('src/app.js', appJs, 'utf-8');
console.log('✅ Updated src/app.js with 3-way rotation optimization');
