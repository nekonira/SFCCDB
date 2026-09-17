const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

const targetStr = `{bonuses.map(b => {
                              const active = isBonusActive(c.id, b.style);

                              return (
                                <button
                                  key={b.style}
                                  onClick={() => toggleCardBonus(c.id, b.style)}
                                  className={\`w-full max-w-[135px] px-1 sm:px-1.5 py-0.5 rounded-lg text-[9px] sm:text-[11px] font-extrabold transition-all border cursor-pointer flex items-center justify-center gap-1 \${
                                    active
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm hover:bg-amber-500/30'
                                      : 'bg-slate-900/80 text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-700 opacity-60'
                                  }\`}
                                  title={\`\${b.style} \${b.percent}% UP の適用/非適用切り替え\`}
                                >
                                  <span className="truncate">🎯 \${b.style}</span>
                                  <span className="font-black flex-shrink-0">\${b.percent}%</span>
                                </button>
                              );
                            })}`;

const replacementStr = `{bonuses.map(b => {
                              const matchesPlayer = currentPlayer ? checkSingleBonusMatch(currentPlayer, b.style) : false;
                              const userToggledOn = isBonusActive(c.id, b.style);
                              const active = matchesPlayer && userToggledOn;

                              return (
                                <button
                                  key={b.style}
                                  onClick={() => toggleCardBonus(c.id, b.style)}
                                  className={\`w-full max-w-[135px] px-1 sm:px-1.5 py-0.5 rounded-lg text-[9px] sm:text-[11px] font-extrabold transition-all border cursor-pointer flex items-center justify-center gap-1 \${
                                    active
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm hover:bg-amber-500/30'
                                      : matchesPlayer
                                      ? 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-slate-200 opacity-80'
                                      : 'bg-slate-950/90 text-slate-600 border-slate-800/80 opacity-50 cursor-not-allowed'
                                  }\`}
                                  title={
                                    matchesPlayer
                                      ? \`\${b.style} +\${b.percent}% UP (\${active ? '適用中' : 'OFF'})\`
                                      : \`\${b.style} (選択中の選手「\${currentPlayer?.playStyle || ''} / \${currentPlayer?.mainPosition || ''}」は対象外)\`
                                  }
                                >
                                  <span className="truncate">{matchesPlayer ? (active ? '🎯' : '⏸️') : '❌'} \${b.style}</span>
                                  <span className="font-black flex-shrink-0">\${b.percent}%</span>
                                </button>
                              );
                            })}`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/app.jsx', content, 'utf8');
  console.log('Successfully updated Row 3 bonus render in src/app.jsx');
} else {
  console.error('Target string not found in src/app.jsx');
}
