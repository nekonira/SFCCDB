const fs = require('fs');

let content = fs.readFileSync('src/app.jsx', 'utf8');

const startStr = `{/* モード 2: 18詳細項目 限界ゲージ */}\n                {limitGaugeMode === 'detail' && (`;
const idx = content.indexOf(startStr);
if (idx === -1) {
  console.error('startStr not found');
  process.exit(1);
}

const endStr = `                )}\n              </div>\n            </div>\n          </div>\n        </div>`;
const endIdx = content.indexOf(`                )}`, idx);

console.log('idx:', idx, 'endIdx:', endIdx);

const newBlock = `{/* モード 2: 18詳細項目 限界ゲージ */}
                {limitGaugeMode === 'detail' && (
                  <div className="space-y-2 pt-1 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {detailStatList.map(stName => {
                      const gainVal = (slotCalcResult && slotCalcResult.statDetailGains && slotCalcResult.statDetailGains[stName]) || 0;
                      const info = getDetailStatLimitInfo(currentPlayer, stName, gainVal);

                      return (
                        <div key={stName} className="bg-slate-950/90 p-2.5 rounded-2xl border border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white font-black flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                              {stName}
                            </span>
                            <div className="flex items-center gap-1.5 font-num text-[11px]">
                              <span className="text-slate-400">能力 {info.baseVal}</span>
                              <span className="text-amber-400/90 text-[10px] bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
                                補正 +{info.addition}
                              </span>
                              {info.gainVal > 0 && (
                                <span className="text-[#00FF66] font-black bg-[#00FF66]/10 px-1.5 py-0.2 rounded border border-[#00FF66]/30">
                                  特練 +{info.gainVal}
                                </span>
                              )}
                              <span className="text-slate-400">/ 限界 <span className="text-amber-400 font-extrabold">{info.maxLimit}</span></span>
                            </div>
                          </div>

                          {/* Visual Bar */}
                          <div className="relative w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 flex">
                            <div
                              style={{ width: info.basePct + '%' }}
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-l-full"
                            />
                            {info.gainPct > 0 && (
                              <div
                                style={{ width: info.gainPct + '%' }}
                                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-[#00FF66] animate-pulse"
                              />
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold font-num">
                            <span>補正後: <span className="text-white font-black">{info.boostedVal}</span></span>
                            {info.isCapped ? (
                              <span className="text-amber-400 font-black">🔥 限界到達 (100%)</span>
                            ) : (
                              <span className="text-amber-300">限界値の <span className="text-amber-400 font-black">{info.pct}%</span></span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}`;

const before = content.slice(0, idx);
const after = content.slice(endIdx + `                )}`.length);

content = before + newBlock + after;
fs.writeFileSync('src/app.jsx', content, 'utf8');
console.log('Successfully replaced mode 2 rendering!');
