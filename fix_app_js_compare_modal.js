const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== FIXING src/app.js PlayerCompareModal ===');

const appJsPath = path.join(__dirname, 'src', 'app.js');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

// Cleanup any syntax errors near line 990-1000 first
if (jsCode.includes('category));')) {
  // Let's restore the clean PlayerCard line 1000 area
  const badStart = jsCode.indexOf('/* ⚡ スキル & アビリティ 比較セクション */');
  if (badStart !== -1 && badStart < 2000) {
    const badEnd = jsCode.indexOf('}))),', badStart) + 5;
    jsCode = jsCode.substring(0, badStart) + jsCode.substring(badEnd);
    console.log('Cleaned bad injection near PlayerCard.');
  }
}

const targetOld = `renderRankBadge(tot18, allTotalStats18)))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, statGroups.map(grp => {`;

const targetNew = `renderRankBadge(tot18, allTotalStats18)))));
  })), /* ⚡ スキル & アビリティ 比較セクション */
  /*#__PURE__*/React.createElement("div", {
    className: "glass-panel p-4 rounded-2xl border border-emerald-500/40 space-y-4 shadow-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-extrabold text-[#00FF66] uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    className: "w-5 h-5 text-[#00FF66]"
  }), "⚡ スキル & アビリティ 比較"), /*#__PURE__*/React.createElement("div", {
    className: \`grid gap-3 \${colCountClass}\`
  }, adjustedCompareList.map(p => {
    const skill = getPlayerSkill(p);
    const abilities = getPlayerAbilities(p);

    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "bg-slate-950/80 rounded-xl border border-slate-800 p-3 space-y-3 flex flex-col justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] font-extrabold text-slate-300 truncate border-b border-slate-800/80 pb-1.5 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", { className: "truncate" }, p.name), /*#__PURE__*/React.createElement("span", { className: "text-[9px] text-[#00FF66] font-num" }, p.mainPosition)),

    /* 所持スキル */
    /*#__PURE__*/React.createElement("div", {
      className: "space-y-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[9px] text-slate-400 font-bold flex items-center gap-1"
    }, /*#__PURE__*/React.createElement("span", null, "🎯 所持スキル")), skill ? /*#__PURE__*/React.createElement("div", {
      className: "space-y-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 flex-wrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: \`px-1.5 py-0.2 rounded text-[10px] \${getRankBadgeStyle(skill.rank)}\`
    }, skill.rank), /*#__PURE__*/React.createElement("span", {
      className: \`text-xs font-bold \${getRankTextStyle(skill.rank)}\`
    }, skill.name)), skill.description && /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-slate-300 bg-slate-950/60 p-1.5 rounded border border-slate-800/50 leading-relaxed"
    }, skill.description)) : /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-slate-500 italic"
    }, "なし")),

    /* 所持アビリティ */
    /*#__PURE__*/React.createElement("div", {
      className: "space-y-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[9px] text-slate-400 font-bold flex items-center gap-1"
    }, /*#__PURE__*/React.createElement("span", null, "✨ 所持アビリティ (", abilities.length, ")")), abilities && abilities.length > 0 ? /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, abilities.map((ab, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "space-y-1 bg-slate-950/60 p-1.5 rounded border border-slate-800/50"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 flex-wrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: \`px-1.5 py-0.2 rounded text-[9px] \${getRankBadgeStyle(ab.rank)}\`
    }, ab.rank), /*#__PURE__*/React.createElement("span", {
      className: \`text-[11px] font-bold \${getRankTextStyle(ab.rank)}\`
    }, ab.name)), ab.description && /*#__PURE__*/React.createElement("div", {
      className: "text-[9px] text-slate-300 leading-relaxed"
    }, ab.description)))) : /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] text-slate-500 italic"
    }, "なし"))));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, statGroups.map(grp => {`;

if (jsCode.includes(targetOld)) {
  jsCode = jsCode.replace(targetOld, targetNew);
  fs.writeFileSync(appJsPath, jsCode, 'utf-8');
  console.log('Successfully updated src/app.js!');
} else {
  console.log('Target string not found in app.js');
}
