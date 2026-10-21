const fs = require('fs');

let appJs = fs.readFileSync('src/app.js', 'utf-8');

const targetJsLoop = `selectedFormation.slots.map(slot=>{const rawP=squadMap[slot.id];const player=displaySquadMap[slot.id];const isPolicyMatched=player&&player.policy===teamPolicy;// 位置条件達成チェック
const isReqSlot=!!slot.requiredStyle;const isReqFulfilled=isReqSlot&&checkPlayStyleRequirement(rawP,slot.requiredStyle,slot.minLevel);return/*#__PURE`;

const replacementJsLoop = `selectedFormation.slots.map(slot=>{const rawP=squadMap[slot.id];const player=displaySquadMap[slot.id];const isPolicyMatched=player&&player.policy===teamPolicy;const isReqSlot=!!slot.requiredStyle;const isReqFulfilled=isReqSlot&&checkPlayStyleRequirement(rawP,slot.requiredStyle,slot.minLevel);let effectiveOverall=player?player.overall:0;let policyGain=0;let comboGain=0;if(player){if(isPolicyMatched){policyGain=Math.floor(player.overall*1.05)-player.overall;}if(comboValidation.allReqsFulfilled&&activeComboData?.buffs){const nBonusPct=comboValidation.isSelecao?comboValidation.brazilBonusPct:(comboValidation.isLaRoja?comboValidation.spainBonusPct:(comboValidation.isLesBleus?comboValidation.franceBonusPct:0));activeComboData.buffs.forEach(b=>{const basePct=parseInt(String(b.val).replace(/[^0-9]/g,""),10)||0;const effectivePct=basePct+nBonusPct;const statVal=getPlayerStatValue(player,b.name);comboGain+=Math.floor(statVal*(effectivePct/100));});}effectiveOverall=player.overall+policyGain+comboGain;}return/*#__PURE`;

if (!appJs.includes(targetJsLoop)) {
  console.error('ERROR: targetJsLoop not found in app.js');
  process.exit(1);
}
appJs = appJs.replace(targetJsLoop, replacementJsLoop);

const targetJsBadge = `\`absolute bottom-0 left-0 right-0 py-0.2 text-center text-[7px] sm:text-[9px] font-black font-num \${getRarityBadgeStyle(player.rarity)}\`},player.overall)),/*#__PURE__*/React.create`;

const replacementJsBadge = `\`absolute bottom-0 left-0 right-0 py-0.2 text-center text-[7px] sm:text-[9px] font-black font-num \${getRarityBadgeStyle(player.rarity)}\`},effectiveOverall)),/*#__PURE__*/React.create`;

if (!appJs.includes(targetJsBadge)) {
  console.error('ERROR: targetJsBadge not found in app.js');
  process.exit(1);
}
appJs = appJs.replace(targetJsBadge, replacementJsBadge);

fs.writeFileSync('src/app.js', appJs, 'utf-8');
console.log('✅ Successfully updated src/app.js with effectiveOverall in formation pitch view');
