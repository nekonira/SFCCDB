const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING SKILL & ABILITY COMPARISON TO PlayerCompareModal ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

const targetStr = `{/* 主要能力 + 直下の18種詳細能力 グラフ表示 */}`;
if (!jsxCode.includes(targetStr)) {
  console.error('Could not find target marker in src/app.jsx');
  process.exit(1);
}

const skillCompareSectionJsx = `{/* ⚡ スキル & アビリティ 比較セクション */}
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/40 space-y-4 shadow-xl">
          <div className="text-xs font-extrabold text-[#00FF66] uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Icon name="zap" className="w-5 h-5 text-[#00FF66]" />
            ⚡ スキル & アビリティ 比較
          </div>

          <div className={\`grid gap-3 \${colCountClass}\`}>
            {adjustedCompareList.map(p => {
              const skill = getPlayerSkill(p);
              const abilities = getPlayerAbilities(p);

              return (
                <div key={p.id} className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[11px] font-extrabold text-slate-300 truncate border-b border-slate-800/80 pb-1.5 flex items-center justify-between">
                      <span className="truncate">{p.name}</span>
                      <span className="text-[9px] text-[#00FF66] font-num">{p.mainPosition}</span>
                    </div>

                    {/* 所持スキル */}
                    <div className="space-y-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <div className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                        <span>🎯 所持スキル</span>
                      </div>
                      {skill ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={\`px-1.5 py-0.2 rounded text-[10px] \${getRankBadgeStyle(skill.rank)}\`}>
                              {skill.rank}
                            </span>
                            <span className={\`text-xs font-bold \${getRankTextStyle(skill.rank)}\`}>
                              {skill.name}
                            </span>
                          </div>
                          {skill.description && (
                            <div className="text-[10px] text-slate-300 bg-slate-950/60 p-1.5 rounded border border-slate-800/50 leading-relaxed">
                              {skill.description}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-500 italic">なし</div>
                      )}
                    </div>

                    {/* 所持アビリティ */}
                    <div className="space-y-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <div className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                        <span>✨ 所持アビリティ ({abilities.length})</span>
                      </div>
                      {abilities && abilities.length > 0 ? (
                        <div className="space-y-2">
                          {abilities.map((ab, i) => (
                            <div key={i} className="space-y-1 bg-slate-950/60 p-1.5 rounded border border-slate-800/50">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={\`px-1.5 py-0.2 rounded text-[9px] \${getRankBadgeStyle(ab.rank)}\`}>
                                  {ab.rank}
                                </span>
                                <span className={\`text-[11px] font-bold \${getRankTextStyle(ab.rank)}\`}>
                                  {ab.name}
                                </span>
                              </div>
                              {ab.description && (
                                <div className="text-[9px] text-slate-300 leading-relaxed">
                                  {ab.description}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-500 italic">なし</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        `;

if (!jsxCode.includes('⚡ スキル & アビリティ 比較')) {
  jsxCode = jsxCode.replace(targetStr, skillCompareSectionJsx + targetStr);
  fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
  console.log('1. Updated src/app.jsx with skill & ability comparison section.');
}

// Now update src/app.js similarly in compiled React.createElement format
const appJsPath = path.join(__dirname, 'src', 'app.js');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

const jsTargetStr = `/*主要能力 + 直下の18種詳細能力 グラフ表示*/`;
const altJsTargetStr = `/* 主要能力 + 直下の18种詳細能力 グラフ表示 */`;
const cleanJsTarget = jsCode.includes(jsTargetStr) ? jsTargetStr : (jsCode.includes('主要能力 + 直下の18種詳細能力') ? jsCode.substring(jsCode.indexOf('/*'), jsCode.indexOf('*/', jsCode.indexOf('主要能力')) + 2) : null);

// Let's create React.createElement equivalent for skillCompareSection in JS
const skillCompareSectionJs = `/* ⚡ スキル & アビリティ 比較セクション */
        React.createElement("div", {
          className: "glass-panel p-4 rounded-2xl border border-emerald-500/40 space-y-4 shadow-xl"
        }, React.createElement("div", {
          className: "text-xs font-extrabold text-[#00FF66] uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2"
        }, React.createElement(Icon, {
          name: "zap",
          className: "w-5 h-5 text-[#00FF66]"
        }), "⚡ スキル & アビリティ 比較"), React.createElement("div", {
          className: \`grid gap-3 \${colCountClass}\`
        }, adjustedCompareList.map(function(p) {
          var skill = getPlayerSkill(p);
          var abilities = getPlayerAbilities(p);

          return React.createElement("div", {
            key: p.id,
            className: "bg-slate-950/80 rounded-xl border border-slate-800 p-3 space-y-3 flex flex-col justify-between"
          }, React.createElement("div", {
            className: "space-y-2"
          }, React.createElement("div", {
            className: "text-[11px] font-extrabold text-slate-300 truncate border-b border-slate-800/80 pb-1.5 flex items-center justify-between"
          }, React.createElement("span", { className: "truncate" }, p.name), React.createElement("span", { className: "text-[9px] text-[#00FF66] font-num" }, p.mainPosition)),

          React.createElement("div", {
            className: "space-y-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80"
          }, React.createElement("div", {
            className: "text-[9px] text-slate-400 font-bold flex items-center gap-1"
          }, React.createElement("span", null, "🎯 所持スキル")), skill ? React.createElement("div", {
            className: "space-y-1"
          }, React.createElement("div", {
            className: "flex items-center gap-1.5 flex-wrap"
          }, React.createElement("span", {
            className: \`px-1.5 py-0.2 rounded text-[10px] \${getRankBadgeStyle(skill.rank)}\`
          }, skill.rank), React.createElement("span", {
            className: \`text-xs font-bold \${getRankTextStyle(skill.rank)}\`
          }, skill.name)), skill.description && React.createElement("div", {
            className: "text-[10px] text-slate-300 bg-slate-950/60 p-1.5 rounded border border-slate-800/50 leading-relaxed"
          }, skill.description)) : React.createElement("div", {
            className: "text-[10px] text-slate-500 italic"
          }, "なし")),

          React.createElement("div", {
            className: "space-y-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80"
          }, React.createElement("div", {
            className: "text-[9px] text-slate-400 font-bold flex items-center gap-1"
          }, React.createElement("span", null, "✨ 所持アビリティ (", abilities.length, ")")), abilities && abilities.length > 0 ? React.createElement("div", {
            className: "space-y-2"
          }, abilities.map(function(ab, i) {
            return React.createElement("div", {
              key: i,
              className: "space-y-1 bg-slate-950/60 p-1.5 rounded border border-slate-800/50"
            }, React.createElement("div", {
              className: "flex items-center gap-1.5 flex-wrap"
            }, React.createElement("span", {
              className: \`px-1.5 py-0.2 rounded text-[9px] \${getRankBadgeStyle(ab.rank)}\`
            }, ab.rank), React.createElement("span", {
              className: \`text-[11px] font-bold \${getRankTextStyle(ab.rank)}\`
            }, ab.name)), ab.description && React.createElement("div", {
              className: "text-[9px] text-slate-300 leading-relaxed"
            }, ab.description));
          })) : React.createElement("div", {
            className: "text-[10px] text-slate-500 italic"
          }, "なし"))));
        })),

        `;

if (!jsCode.includes('⚡ スキル & アビリティ 比較')) {
  const markerIdx = jsCode.indexOf('主要能力');
  const commentStart = jsCode.lastIndexOf('/*', markerIdx);
  const commentEnd = jsCode.indexOf('*/', markerIdx) + 2;
  const targetComment = jsCode.substring(commentStart, commentEnd);

  jsCode = jsCode.replace(targetComment, skillCompareSectionJs + targetComment);
  fs.writeFileSync(appJsPath, jsCode, 'utf-8');
  console.log('2. Updated src/app.js with skill & ability comparison section.');
}
