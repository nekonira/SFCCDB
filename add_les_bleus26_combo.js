const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING FORMATION COMBO: レ・ブルー’26 ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

// Combo data snippet
const comboJsxSnippet = `    {
      id: 'lesBleus26',
      name: "レ・ブルー’26",
      rank: '金',
      policy: 'ムービング',
      formationId: '433b_lesBleus26',
      buffs: [
        { name: 'ボールタッチ', val: '+80%' },
        { name: 'タックル', val: '+80%' },
        { name: 'マーク', val: '+80%' },
        { name: 'コンタクト', val: '+80%' }
      ],
      specialNote: 'フィールド上のフランス選手1人につき、上記4能力（ボールタッチ・タックル・マーク・コンタクト）が追加で2%強化！'
    },
`;

// Formation data snippet for 433b_lesBleus26
const formationJsxSnippet = `    {
      id: '433b_lesBleus26',
      name: '4-3-3B (レ・ブルー’26)',
      comboId: 'lesBleus26',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'スプリントCB', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '守備的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'セントラルDM', minLevel: 3 },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 3 },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' }
      ]
    },
`;

// 1. Update app.jsx FORMATION_COMBOS
if (!jsxCode.includes("id: 'lesBleus26'")) {
  jsxCode = jsxCode.replace(
    "const FORMATION_COMBOS = [",
    "const FORMATION_COMBOS = [\n" + comboJsxSnippet
  );
  console.log('✅ 1. Added lesBleus26 to FORMATION_COMBOS in app.jsx');
}

// 2. Update app.jsx FORMATIONS
if (!jsxCode.includes("id: '433b_lesBleus26'")) {
  jsxCode = jsxCode.replace(
    "const FORMATIONS = [",
    "const FORMATIONS = [\n" + formationJsxSnippet
  );
  console.log('✅ 2. Added 433b_lesBleus26 to FORMATIONS in app.jsx');
}

// 3. Update French player bonus logic in app.jsx
if (!jsxCode.includes("const isLesBleus = activeComboData.id === 'lesBleus26'")) {
  jsxCode = jsxCode.replace(
    "const isLaRoja = activeComboData.id === 'laRoja26';",
    "const isLaRoja = activeComboData.id === 'laRoja26';\n    const isLesBleus = activeComboData.id === 'lesBleus26';"
  );
  jsxCode = jsxCode.replace(
    "const spainPlayerCount = isLaRoja ? starterPlayers.filter(p => p.nationality === 'スペイン').length : 0;\n    const spainBonusPct = spainPlayerCount * 2;",
    "const spainPlayerCount = isLaRoja ? starterPlayers.filter(p => p.nationality === 'スペイン').length : 0;\n    const spainBonusPct = spainPlayerCount * 2;\n    const francePlayerCount = isLesBleus ? starterPlayers.filter(p => p.nationality === 'フランス').length : 0;\n    const franceBonusPct = francePlayerCount * 2;"
  );
  jsxCode = jsxCode.replace(
    "const nationExtraPct = isSelecao ? brazilBonusPct : (isLaRoja ? spainBonusPct : 0);",
    "const nationExtraPct = isSelecao ? brazilBonusPct : (isLaRoja ? spainBonusPct : (isLesBleus ? franceBonusPct : 0));"
  );
  jsxCode = jsxCode.replace(
    "isLaRoja,",
    "isLaRoja,\n        isLesBleus,\n        francePlayerCount,\n        franceBonusPct,"
  );
  console.log('✅ 3. Updated France player bonus logic in app.jsx');
}

// Update UI rendering in app.jsx for France bonus
if (!jsxCode.includes("comboValidation.isLesBleus && comboValidation.francePlayerCount > 0")) {
  jsxCode = jsxCode.replace(
    `{comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0 && (
                        <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                          <FlagIcon nationality="スペイン" /> スペイン選手 {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                        </span>
                      )}`,
    `{comboValidation.isLaRoja && comboValidation.spainPlayerCount > 0 && (
                        <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                          <FlagIcon nationality="スペイン" /> スペイン選手 {comboValidation.spainPlayerCount}名 (+{comboValidation.spainBonusPct}% 適用中)
                        </span>
                      )}
                      {comboValidation.isLesBleus && comboValidation.francePlayerCount > 0 && (
                        <span className="text-xs text-blue-300 font-bold flex items-center gap-1">
                          <FlagIcon nationality="フランス" /> フランス選手 {comboValidation.francePlayerCount}名 (+{comboValidation.franceBonusPct}% 適用中)
                        </span>
                      )}`
  );
  console.log('✅ 4. Added France bonus UI badge in app.jsx');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// Also update src/app.js for pre-compiled bundle parity
let jsCodeUpdated = false;
if (!jsCode.includes("id:'lesBleus26'") && !jsCode.includes('lesBleus26')) {
  // Add to FORMATION_COMBOS in app.js
  const comboJsStr = JSON.stringify({
    id: 'lesBleus26',
    name: "レ・ブルー’26",
    rank: '金',
    policy: 'ムービング',
    formationId: '433b_lesBleus26',
    buffs: [
      { name: 'ボールタッチ', val: '+80%' },
      { name: 'タックル', val: '+80%' },
      { name: 'マーク', val: '+80%' },
      { name: 'コンタクト', val: '+80%' }
    ],
    specialNote: 'フィールド上のフランス選手1人につき、上記4能力（ボールタッチ・タックル・マーク・コンタクト）が追加で2%強化！'
  });

  const formationJsObj = {
    id: '433b_lesBleus26',
    name: '4-3-3B (レ・ブルー’26)',
    comboId: 'lesBleus26',
    slots: [
      { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
      { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
      { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'スプリントCB', minLevel: 2 },
      { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
      { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '守備的RFB', minLevel: 2 },
      { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'セントラルDM', minLevel: 3 },
      { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
      { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 3 },
      { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
      { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
      { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' }
    ]
  };

  jsCode = jsCode.replace('const FORMATION_COMBOS=[', 'const FORMATION_COMBOS=[' + comboJsStr + ',');
  jsCode = jsCode.replace('const FORMATIONS=[', 'const FORMATIONS=[' + JSON.stringify(formationJsObj) + ',');
  fs.writeFileSync(appJsPath, jsCode, 'utf-8');
  console.log('✅ 5. Updated src/app.js with lesBleus26 data');
}

console.log('\n🎉 LES BLEUS 26 FORMATION COMBO ADDED SUCCESSFULLY!');
