const fs = require('fs');

let appJs = fs.readFileSync('src/app.js', 'utf-8');
console.log('Original app.js size:', appJs.length);

// 1. In runAutoBuildForFormation:
const oldRunCode = `const isPosEligible=(p,slotPos)=>{if(!p)return false;return p.mainPosition===slotPos||p.subPositions&&p.subPositions.includes(slotPos);};const evaluateCandidateForSlot=(slot,candidate)=>{const isMainMatch=candidate.mainPosition===slot.pos;const posScore=isMainMatch?2000:1000;const isTargetNation=targetNation&&candidate.nationality===targetNation;const nationScore=isTargetNation?500:0;newSquad[slot.id]=candidate;const teamOverall=calcExactOverall(newSquad);delete newSquad[slot.id];return teamOverall*10+posScore+nationScore;};`;

const newRunCode = `const isPosEligible=(p,slotPos)=>{if(!p)return false;return isPositionMatch(p.mainPosition,slotPos)||(p.subPositions&&p.subPositions.some(sp=>isPositionMatch(sp,slotPos)));};const evaluateCandidateForSlot=(slot,candidate)=>{const isTargetNation=targetNation&&candidate.nationality===targetNation;const nationScore=isTargetNation?50:0;const isPolicyMatch=candidate.policy===pol;const policyScore=isPolicyMatch?100:0;const isMainMatch=candidate.mainPosition===slot.pos;const posScore=isMainMatch?5:0;newSquad[slot.id]=candidate;const teamOverall=calcExactOverall(newSquad);delete newSquad[slot.id];return teamOverall*100+policyScore+nationScore+posScore;};`;

if (!appJs.includes(oldRunCode)) {
  console.error('ERROR: oldRunCode not found in app.js');
  process.exit(1);
}
appJs = appJs.replace(oldRunCode, newRunCode);
console.log('Replaced runAutoBuildForFormation in app.js');

// 2. In handleUnifiedPolicyAutoBuild:
const oldUnifiedCode = `const isPosEligible=(p,slotPos)=>{if(!p)return false;return p.mainPosition===slotPos||p.subPositions&&p.subPositions.includes(slotPos);};const evaluateCandidateForSlot=(slot,candidate)=>{const isMainMatch=candidate.mainPosition===slot.pos;const posScore=isMainMatch?2000:1000;const isTargetNation=targetNation&&candidate.nationality===targetNation;const nationScore=isTargetNation?500:0;const isPolicyMatch=candidate.policy===pol;const policyScore=isPolicyMatch?10000:0;newSquad[slot.id]=candidate;const teamOverall=calcExactOverall(newSquad);delete newSquad[slot.id];return teamOverall*10+policyScore+posScore+nationScore;};`;

const newUnifiedCode = `const isPosEligible=(p,slotPos)=>{if(!p)return false;return isPositionMatch(p.mainPosition,slotPos)||(p.subPositions&&p.subPositions.some(sp=>isPositionMatch(sp,slotPos)));};const evaluateCandidateForSlot=(slot,candidate)=>{const isTargetNation=targetNation&&candidate.nationality===targetNation;const nationScore=isTargetNation?50:0;const isPolicyMatch=candidate.policy===pol;const policyScore=isPolicyMatch?100000:0;const isMainMatch=candidate.mainPosition===slot.pos;const posScore=isMainMatch?5:0;newSquad[slot.id]=candidate;const teamOverall=calcExactOverall(newSquad);delete newSquad[slot.id];return teamOverall*100+policyScore+nationScore+posScore;};`;

if (!appJs.includes(oldUnifiedCode)) {
  console.error('ERROR: oldUnifiedCode not found in app.js');
  process.exit(1);
}
appJs = appJs.replace(oldUnifiedCode, newUnifiedCode);
console.log('Replaced handleUnifiedPolicyAutoBuild in app.js');

// 3. In modalPlayers: text search posMatch
const oldPosMatch = `const posMatch=p.mainPosition&&p.mainPosition.toLowerCase().includes(q)||p.subPositions&&p.subPositions.some(sp=>sp.toLowerCase().includes(q));`;
const newPosMatch = `const posMatch=isPositionMatch(p.mainPosition,q)||(p.subPositions&&p.subPositions.some(sp=>isPositionMatch(sp,q)))||(p.mainPosition&&p.mainPosition.toLowerCase().includes(q))||(p.subPositions&&p.subPositions.some(sp=>sp.toLowerCase().includes(q)));`;

if (!appJs.includes(oldPosMatch)) {
  console.error('ERROR: oldPosMatch not found in app.js');
  process.exit(1);
}
appJs = appJs.replace(oldPosMatch, newPosMatch);
console.log('Replaced modalPlayers posMatch in app.js');

// 4. In modal player card badge UI: display subPositions
const oldBadgeJs = `/*#__PURE__*/React.createElement("span",{className:"px-1.5 py-0.2 rounded text-[10px] font-black bg-slate-800 text-[#00FF66]"},p.mainPosition),/*#__PURE__*/React.createElement("span",{className:"text-[10px] font-bold text-amber-400"},p.rarity)`;
const newBadgeJs = `/*#__PURE__*/React.createElement("span",{className:"px-1.5 py-0.2 rounded text-[10px] font-black bg-slate-800 text-[#00FF66]"},p.mainPosition),p.subPositions&&p.subPositions.length>0&&/*#__PURE__*/React.createElement("span",{className:"px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-400/30"},"サブ: "+p.subPositions.join(', ')),/*#__PURE__*/React.createElement("span",{className:"text-[10px] font-bold text-amber-400"},p.rarity)`;

if (!appJs.includes(oldBadgeJs)) {
  console.error('ERROR: oldBadgeJs not found in app.js');
  process.exit(1);
}
appJs = appJs.replace(oldBadgeJs, newBadgeJs);
console.log('Replaced modal player badge in app.js');

// 5. In pitch slot display: show (サブ) if placed in subPosition
const oldSlotLabelJs = `/*#__PURE__*/React.createElement("div",{className:"text-[6px] sm:text-[8px] font-bold text-[#00FF66] truncate"},slot.label)`;
const newSlotLabelJs = `/*#__PURE__*/React.createElement("div",{className:"text-[6px] sm:text-[8px] font-bold text-[#00FF66] truncate"},slot.label,!isPositionMatch(player.mainPosition,slot.pos)&&/*#__PURE__*/React.createElement("span",{className:"text-amber-300 ml-0.5 text-[6px] font-bold"},"(サブ)"))`;

if (!appJs.includes(oldSlotLabelJs)) {
  console.error('ERROR: oldSlotLabelJs not found in app.js');
  process.exit(1);
}
appJs = appJs.replace(oldSlotLabelJs, newSlotLabelJs);
console.log('Replaced pitch slot label in app.js');

fs.writeFileSync('src/app.js', appJs, 'utf-8');
console.log('Successfully written updated src/app.js');
