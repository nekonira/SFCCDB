const fs = require('fs');
let content = fs.readFileSync('src/app.jsx', 'utf8');

const targetStr = `                  </div>
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
                      })
                    )}
                  </div>
                )}`;

const replacementStr = `                  </div>
                )}`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/app.jsx', content, 'utf8');
  console.log('Successfully cleaned up mode 2 leftovers!');
} else {
  console.error('Target leftover string not found');
}
