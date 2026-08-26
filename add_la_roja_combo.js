const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING FORMATION COMBO: LA ROJA 26 ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

// Combo data snippet for JSX
const comboJsxSnippet = `    {
      id: 'laRoja26',
      name: "ラ・ロハ’26",
      rank: '金',
      policy: 'ポゼッション',
      formationId: '433b_laRoja26',
      buffs: [
        { name: '決定力', val: '+80%' },
        { name: 'ショートパス', val: '+80%' },
        { name: 'タックル', val: '+80%' },
        { name: 'マーク', val: '+80%' }
      ],
      specialNote: 'フィールド上のスペイン選手1人につき、上記4能力（決定力・ショートパス・タックル・マーク）が追加で2%強化！'
    },
`;

// Combo data snippet for JS (transpiled JS style if needed, but plain object works in JS too)
const comboJsSnippet = comboJsxSnippet;

// Formation data snippet for 433b_laRoja26
const formationJsxSnippet = `    {
      id: '433b_laRoja26',
      name: '4-3-3B (ラ・ロハ’26)',
      comboId: 'laRoja26',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%', requiredStyle: '攻撃的LFB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: '組立CB', minLevel: 3 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'サイドアタッカーLW', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%', requiredStyle: 'ワイドストライカーRW', minLevel: 3 }
      ]
    },
`;

const formationJsSnippet = formationJsxSnippet;

// 1. Update app.jsx FORMATION_COMBOS
if (!jsxCode.includes("id: 'laRoja26'")) {
  jsxCode = jsxCode.replace(
    "const FORMATION_COMBOS = [",
    "const FORMATION_COMBOS = [\n" + comboJsxSnippet
  );
  console.log('1. Added laRoja26 to FORMATION_COMBOS in app.jsx');
}

// 2. Update app.jsx FORMATIONS
if (!jsxCode.includes("id: '433b_laRoja26'")) {
  jsxCode = jsxCode.replace(
    "const FORMATIONS = [",
    "const FORMATIONS = [\n" + formationJsxSnippet
  );
  console.log('2. Added 433b_laRoja26 to FORMATIONS in app.jsx');
}

// 3. Update Spain player bonus logic in app.jsx
if (!jsxCode.includes("const isLaRoja = activeComboData.id === 'laRoja26'")) {
  jsxCode = jsxCode.replace(
    "const isSelecao = activeComboData.id === 'selecao70';",
    "const isSelecao = activeComboData.id === 'selecao70';\n    const isLaRoja = activeComboData.id === 'laRoja26';"
  );
  jsxCode = jsxCode.replace(
    "const brazilPlayerCount = isSelecao ? starterPlayers.filter(p => p.nationality === 'ブラジル').length : 0;\n    const brazilBonusPct = brazilPlayerCount * 2;",
    "const brazilPlayerCount = isSelecao ? starterPlayers.filter(p => p.nationality === 'ブラジル').length : 0;\n    const brazilBonusPct = brazilPlayerCount * 2;\n    const spainPlayerCount = isLaRoja ? starterPlayers.filter(p => p.nationality === 'スペイン').length : 0;\n    const spainBonusPct = spainPlayerCount * 2;\n    const nationExtraPct = isSelecao ? brazilBonusPct : (isLaRoja ? spainBonusPct : 0);"
  );
  jsxCode = jsxCode.replace(
    "const effectivePct = basePct + (isSelecao ? brazilBonusPct : 0);",
    "const effectivePct = basePct + nationExtraPct;"
  );
  jsxCode = jsxCode.replace(
    "isSelecao,",
    "isSelecao,\n        isLaRoja,\n        spainPlayerCount,\n        spainBonusPct,"
  );
  console.log('3. Updated Spain player bonus logic in app.jsx');
}

// Update UI rendering in app.jsx for Spain bonus
if (!jsxCode.includes("comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0")) {
  jsxCode = jsxCode.replace(
    `{comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0 && (
                        <span className="text-xs text-amber-300 font-bold">
                          🇧🇷 ブラジル選手 {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                        </span>
                      )}`,
    `{comboValidation.isSelecao && comboValidation.brazilPlayerCount > 0 && (
                        <span className="text-xs text-amber-300 font-bold">
                          🇧🇷 ブラジル選手 {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                        </span>
                      )}
                      {comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0 && (
                        <span className="text-xs text-amber-300 font-bold">
                          🇪🇸 スペイン選手 {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                        </span>
                      )}`
  );

  jsxCode = jsxCode.replace(
    `{comboValidation.isSelecao && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                    </span>
                  )}`,
    `{comboValidation.isSelecao && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}% 適用中)
                    </span>
                  )}
                  {comboValidation.isLaRoja && (
                    <span className="px-2 py-0.5 rounded bg-red-500 text-white font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                    </span>
                  )}`
  );
  console.log('4. Updated Spain bonus UI rendering in app.jsx');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// Now update app.js
if (!jsCode.includes("id: 'laRoja26'")) {
  jsCode = jsCode.replace(
    "const FORMATION_COMBOS = [",
    "const FORMATION_COMBOS = [\n" + comboJsSnippet
  );
}

if (!jsCode.includes("id: '433b_laRoja26'")) {
  jsCode = jsCode.replace(
    "const FORMATIONS = [",
    "const FORMATIONS = [\n" + formationJsSnippet
  );
}

if (!jsCode.includes("const isLaRoja = activeComboData.id === 'laRoja26'")) {
  jsCode = jsCode.replace(
    "const isSelecao = activeComboData.id === 'selecao70';",
    "const isSelecao = activeComboData.id === 'selecao70';\n    const isLaRoja = activeComboData.id === 'laRoja26';"
  );
  jsCode = jsCode.replace(
    "const brazilPlayerCount = isSelecao ? starterPlayers.filter(p => p.nationality === 'ブラジル').length : 0;\n    const brazilBonusPct = brazilPlayerCount * 2;",
    "const brazilPlayerCount = isSelecao ? starterPlayers.filter(p => p.nationality === 'ブラジル').length : 0;\n    const brazilBonusPct = brazilPlayerCount * 2;\n    const spainPlayerCount = isLaRoja ? starterPlayers.filter(p => p.nationality === 'スペイン').length : 0;\n    const spainBonusPct = spainPlayerCount * 2;\n    const nationExtraPct = isSelecao ? brazilBonusPct : (isLaRoja ? spainBonusPct : 0);"
  );
  jsCode = jsCode.replace(
    "const effectivePct = basePct + (isSelecao ? brazilBonusPct : 0);",
    "const effectivePct = basePct + nationExtraPct;"
  );
  jsCode = jsCode.replace(
    "isSelecao,",
    "isSelecao,\n      isLaRoja,\n      spainPlayerCount,\n      spainBonusPct,"
  );
}

fs.writeFileSync(appJsPath, jsCode, 'utf-8');
console.log('5. Updated app.js successfully.');

console.log('=== FORMATION COMBO LA ROJA 26 ADDED SUCCESSFULLY! ===');
