const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mockPath = path.join(__dirname, 'src', 'data', 'mockData.js');
let code = fs.readFileSync(mockPath, 'utf-8');

console.log('--- Verifying 148 Player Database in Node VM ---');

// Replace any remaining garbled characters
const replacements = [
  ['繧ｫ繧ｦ繝ｳ繧ｿ繝ｼ', 'カウンター'],
  ['繝繝ｼ繝薙Φ繧ｰ', 'ムービング'],
  ['繝昴ぞ繝・す繝ｧ繝ｳ', 'ポゼッション'],
  ['繝ｪ繧｢繧ｯ繧ｷ繝ｧ繝ｳ', 'リアクション'],
  ['笘・', '☆3'],
  ['竇', 'Ⅰ'],
  ['竇｡', 'Ⅱ'],
  ['竇｢', 'Ⅲ'],
  ['竇｣', 'Ⅳ'],
  ['竇､', 'Ⅴ'],
  ['繧ｹ繝医Λ繧､繧ｫ繝ｼ', 'ストライカー'],
  ['繝ｩ繧､繝ｳ繝悶Ξ繝ｼ繧ｫ繝ｼ', 'ラインブレーカー'],
  ['繧ｵ繧､繝峨い繧ｿ繝・き繝ｼ', 'サイドアタッカー'],
  ['繧ｿ繝ｼ繧ｲ繝・ヨ繝槭Φ', 'ターゲットマン'],
  ['繝√Ε繝ｳ繧ｹ繝｡繝ｼ繧ｫ繝ｼ', 'チャンスメーカー'],
  ['繧｢繧ｿ繝・き繝ｼ', 'アタッカー'],
  ['ハードタッカー', 'ハードタッカー'],
  ['セントラルMF', 'セントラルMF'],
  ['パサーDM', 'パサーDM'],
  ['潰し屋', '潰し屋'],
  ['クロサー', 'クロサー'],
  ['攻撃的SB', '攻撃的SB'],
  ['守備的SB', '守備的SB'],
  ['オーソドックスGK', 'オーソドックスGK'],
  ['スイーパーGK', 'スイーパーGK']
];

for (const [garbled, clean] of replacements) {
  code = code.split(garbled).join(clean);
}

fs.writeFileSync(mockPath, code, 'utf-8');

const sandbox = { window: {} };
try {
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const count = sandbox.window.INITIAL_PLAYERS.length;
  console.log(`SUCCESS! Evaluated mockData.js cleanly! Total players: ${count}`);
  if (count === 148) {
    console.log('🎉 100% COMPLETE: ALL 148 PLAYERS ARE LOADED AND READY!');
  } else {
    console.log(`Loaded ${count} players.`);
  }
} catch (err) {
  console.error('Syntax error during VM eval:', err.message);
}
