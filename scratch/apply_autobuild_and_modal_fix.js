const fs = require('fs');

// 1. Update src/app.jsx
let appJsx = fs.readFileSync('src/app.jsx', 'utf-8');

// Check target strings in app.jsx
console.log('Original app.jsx size:', appJsx.length);

// 1.1 In runAutoBuildForFormation:
// Replace isPosEligible and evaluateCandidateForSlot
const oldRunCode = `      const isPosEligible = (p, slotPos) => {
        if (!p) return false;
        return p.mainPosition === slotPos || (p.subPositions && p.subPositions.includes(slotPos));
      };

      const evaluateCandidateForSlot = (slot, candidate) => {
        const isMainMatch = candidate.mainPosition === slot.pos;
        const posScore = isMainMatch ? 2000 : 1000;
        const isTargetNation = targetNation && candidate.nationality === targetNation;
        const nationScore = isTargetNation ? 500 : 0;

        newSquad[slot.id] = candidate;
        const teamOverall = calcExactOverall(newSquad);
        delete newSquad[slot.id];

        return teamOverall * 10 + posScore + nationScore;
      };`;

const newRunCode = `      const isPosEligible = (p, slotPos) => {
        if (!p) return false;
        return isPositionMatch(p.mainPosition, slotPos) || (p.subPositions && p.subPositions.some(sp => isPositionMatch(sp, slotPos)));
      };

      const evaluateCandidateForSlot = (slot, candidate) => {
        const isTargetNation = targetNation && candidate.nationality === targetNation;
        const nationScore = isTargetNation ? 50 : 0;
        const isPolicyMatch = candidate.policy === pol;
        const policyScore = isPolicyMatch ? 100 : 0;
        const isMainMatch = candidate.mainPosition === slot.pos;
        const posScore = isMainMatch ? 5 : 0;

        newSquad[slot.id] = candidate;
        const teamOverall = calcExactOverall(newSquad);
        delete newSquad[slot.id];

        return teamOverall * 100 + policyScore + nationScore + posScore;
      };`;

if (!appJsx.includes(oldRunCode)) {
  console.error('ERROR: oldRunCode not found in app.jsx');
  process.exit(1);
}
appJsx = appJsx.replace(oldRunCode, newRunCode);
console.log('Replaced runAutoBuildForFormation evaluateCandidateForSlot in app.jsx');

// 1.2 In handleUnifiedPolicyAutoBuild:
const oldUnifiedCode = `      const isPosEligible = (p, slotPos) => {
        if (!p) return false;
        return p.mainPosition === slotPos || (p.subPositions && p.subPositions.includes(slotPos));
      };

      const evaluateCandidateForSlot = (slot, candidate) => {
        const isMainMatch = candidate.mainPosition === slot.pos;
        const posScore = isMainMatch ? 2000 : 1000;
        const isTargetNation = targetNation && candidate.nationality === targetNation;
        const nationScore = isTargetNation ? 500 : 0;
        const isPolicyMatch = candidate.policy === pol;
        const policyScore = isPolicyMatch ? 10000 : 0;

        newSquad[slot.id] = candidate;
        const teamOverall = calcExactOverall(newSquad);
        delete newSquad[slot.id];

        return teamOverall * 10 + policyScore + posScore + nationScore;
      };`;

const newUnifiedCode = `      const isPosEligible = (p, slotPos) => {
        if (!p) return false;
        return isPositionMatch(p.mainPosition, slotPos) || (p.subPositions && p.subPositions.some(sp => isPositionMatch(sp, slotPos)));
      };

      const evaluateCandidateForSlot = (slot, candidate) => {
        const isTargetNation = targetNation && candidate.nationality === targetNation;
        const nationScore = isTargetNation ? 50 : 0;
        const isPolicyMatch = candidate.policy === pol;
        const policyScore = isPolicyMatch ? 100000 : 0;
        const isMainMatch = candidate.mainPosition === slot.pos;
        const posScore = isMainMatch ? 5 : 0;

        newSquad[slot.id] = candidate;
        const teamOverall = calcExactOverall(newSquad);
        delete newSquad[slot.id];

        return teamOverall * 100 + policyScore + nationScore + posScore;
      };`;

if (!appJsx.includes(oldUnifiedCode)) {
  console.error('ERROR: oldUnifiedCode not found in app.jsx');
  process.exit(1);
}
appJsx = appJsx.replace(oldUnifiedCode, newUnifiedCode);
console.log('Replaced handleUnifiedPolicyAutoBuild evaluateCandidateForSlot in app.jsx');

// 1.3 In modalPlayers: text search enhancement for position match
const oldModalPlayersText = `        const posMatch = (p.mainPosition && p.mainPosition.toLowerCase().includes(q)) || (p.subPositions && p.subPositions.some(sp => sp.toLowerCase().includes(q)));`;
const newModalPlayersText = `        const posMatch = isPositionMatch(p.mainPosition, q) || (p.subPositions && p.subPositions.some(sp => isPositionMatch(sp, q))) || (p.mainPosition && p.mainPosition.toLowerCase().includes(q)) || (p.subPositions && p.subPositions.some(sp => sp.toLowerCase().includes(q)));`;

if (!appJsx.includes(oldModalPlayersText)) {
  console.error('ERROR: oldModalPlayersText not found in app.jsx');
  process.exit(1);
}
appJsx = appJsx.replace(oldModalPlayersText, newModalPlayersText);
console.log('Replaced modalPlayers posMatch in app.jsx');

// 1.4 In modal player card badge UI: display subPositions
const oldBadgeCode = `                              <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-slate-800 text-[#00FF66]">
                                {p.mainPosition}
                              </span>
                              <span className="text-[10px] font-bold text-amber-400">
                                {p.rarity}
                              </span>`;

const newBadgeCode = `                              <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-slate-800 text-[#00FF66]">
                                {p.mainPosition}
                              </span>
                              {p.subPositions && p.subPositions.length > 0 && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                                  サブ: {p.subPositions.join(', ')}
                                </span>
                              )}
                              <span className="text-[10px] font-bold text-amber-400">
                                {p.rarity}
                              </span>`;

if (!appJsx.includes(oldBadgeCode)) {
  console.error('ERROR: oldBadgeCode not found in app.jsx');
  process.exit(1);
}
appJsx = appJsx.replace(oldBadgeCode, newBadgeCode);
console.log('Replaced modal player badge in app.jsx');

// 1.5 In pitch slot display: show (サブ) if placed in subPosition
const oldSlotLabelCode = `<div className="text-[6px] sm:text-[8px] font-bold text-[#00FF66] truncate">{slot.label}</div>`;
const newSlotLabelCode = `<div className="text-[6px] sm:text-[8px] font-bold text-[#00FF66] truncate">{slot.label}{!isPositionMatch(player.mainPosition, slot.pos) && <span className="text-amber-300 ml-0.5 text-[6px] font-bold">(サブ)</span>}</div>`;

if (!appJsx.includes(oldSlotLabelCode)) {
  console.error('ERROR: oldSlotLabelCode not found in app.jsx');
  process.exit(1);
}
appJsx = appJsx.replace(oldSlotLabelCode, newSlotLabelCode);
console.log('Replaced pitch slot label in app.jsx');

fs.writeFileSync('src/app.jsx', appJsx, 'utf-8');
console.log('Successfully written updated src/app.jsx');
