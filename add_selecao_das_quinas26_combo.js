const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== ADDING FORMATION COMBO: セレソン・ダス・キナス’26 ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

// Combo data snippet for JSX
const comboJsxSnippet = `    {
      id: 'selecaoDasQuinas26',
      name: "セレソン・ダス・キナス’26",
      rank: '金',
      policy: 'カウンター',
      formationId: '433b_selecaoDasQuinas26',
      buffs: [
        { name: '突破力', val: '+80%' },
        { name: 'タックル', val: '+80%' },
        { name: 'マーク', val: '+80%' },
        { name: 'コンタクト', val: '+80%' }
      ],
      specialNote: 'フィールド上のポルトガル選手1人につき、上記4能力（突破力・タックル・マーク・コンタクト）が追加で2%強化！'
    },
`;

// Formation data snippet for 433b_selecaoDasQuinas26
const formationJsxSnippet = `    {
      id: '433b_selecaoDasQuinas26',
      name: '4-3-3B (セレソン・ダス・キナス’26)',
      comboId: 'selecaoDasQuinas26',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%', requiredStyle: '攻撃的LFB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '攻撃的RFB', minLevel: 3 },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%', requiredStyle: 'パサーDM', minLevel: 3 },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'サイドアタッカーLW', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' }
      ]
    },
`;

// ==========================================
// 1. UPDATE app.jsx
// ==========================================

// 1.1 FORMATION_COMBOS in app.jsx
if (!jsxCode.includes("id: 'selecaoDasQuinas26'")) {
  jsxCode = jsxCode.replace(
    "const FORMATION_COMBOS = [",
    "const FORMATION_COMBOS = [\n" + comboJsxSnippet
  );
  console.log('✅ 1.1 Added selecaoDasQuinas26 to FORMATION_COMBOS in app.jsx');
}

// 1.2 FORMATIONS in app.jsx
if (!jsxCode.includes("id: '433b_selecaoDasQuinas26'")) {
  jsxCode = jsxCode.replace(
    "const FORMATIONS = [",
    "const FORMATIONS = [\n" + formationJsxSnippet
  );
  console.log('✅ 1.2 Added 433b_selecaoDasQuinas26 to FORMATIONS in app.jsx');
}

// 1.3 Fallback return object in app.jsx
if (!jsxCode.includes("isQuinas: false,")) {
  jsxCode = jsxCode.replace(
    "isLesBleus: false,",
    "isLesBleus: false,\n        isQuinas: false,\n        portugalPlayerCount: 0,\n        portugalBonusPct: 0,"
  );
  console.log('✅ 1.3 Updated fallback return object in app.jsx');
}

// 1.4 Calculation logic in app.jsx
if (!jsxCode.includes("const isQuinas = activeComboData.id === 'selecaoDasQuinas26'")) {
  jsxCode = jsxCode.replace(
    "const isLesBleus = activeComboData.id === 'lesBleus26';",
    "const isLesBleus = activeComboData.id === 'lesBleus26';\n    const isQuinas = activeComboData.id === 'selecaoDasQuinas26';"
  );
  jsxCode = jsxCode.replace(
    "const franceBonusPct = francePlayerCount * 2;",
    "const franceBonusPct = francePlayerCount * 2;\n    const portugalPlayerCount = isQuinas ? starterPlayers.filter(p => p.nationality === 'ポルトガル').length : 0;\n    const portugalBonusPct = portugalPlayerCount * 2;"
  );
  jsxCode = jsxCode.replace(
    "const nationExtraPct = isSelecao ? brazilBonusPct : (isLaRoja ? spainBonusPct : (isLesBleus ? franceBonusPct : 0));",
    "const nationExtraPct = isSelecao ? brazilBonusPct : (isLaRoja ? spainBonusPct : (isLesBleus ? franceBonusPct : (isQuinas ? portugalBonusPct : 0)));"
  );
  jsxCode = jsxCode.replace(
    "isLesBleus,",
    "isLesBleus,\n        isQuinas,\n        portugalPlayerCount,\n        portugalBonusPct,"
  );
  console.log('✅ 1.4 Updated calculation logic in app.jsx');
}

// 1.5 Header badge UI in app.jsx
const targetHeaderBadge = `{comboValidation.isLesBleus && comboValidation.francePlayerCount > 0 && (
                        <span className="text-xs text-blue-300 font-bold flex items-center gap-1">
                          <FlagIcon nationality="フランス" /> フランス選手 {comboValidation.francePlayerCount}名 (+{comboValidation.franceBonusPct}% 適用中)
                        </span>
                      )}`;

const replacementHeaderBadge = `{comboValidation.isLesBleus && comboValidation.francePlayerCount > 0 && (
                        <span className="text-xs text-blue-300 font-bold flex items-center gap-1">
                          <FlagIcon nationality="フランス" /> フランス選手 {comboValidation.francePlayerCount}名 (+{comboValidation.franceBonusPct}% 適用中)
                        </span>
                      )}
                      {comboValidation.isQuinas && comboValidation.portugalPlayerCount > 0 && (
                        <span className="text-xs text-red-400 font-bold flex items-center gap-1">
                          <FlagIcon nationality="ポルトガル" /> ポルトガル選手 {comboValidation.portugalPlayerCount}名 (+{comboValidation.portugalBonusPct}% 適用中)
                        </span>
                      )}`;

if (jsxCode.includes(targetHeaderBadge) && !jsxCode.includes("comboValidation.isQuinas && comboValidation.portugalPlayerCount > 0")) {
  jsxCode = jsxCode.replace(targetHeaderBadge, replacementHeaderBadge);
  console.log('✅ 1.5 Added Portugal header badge in app.jsx');
}

// 1.6 Special Note Banner UI in app.jsx
if (!jsxCode.includes("comboValidation.isQuinas && comboValidation.portugalPlayerCount > 0")) {
  jsxCode = jsxCode.replace(
    "|| (comboValidation.isLesBleus && comboValidation.francePlayerCount > 0)",
    "|| (comboValidation.isLesBleus && comboValidation.francePlayerCount > 0) || (comboValidation.isQuinas && comboValidation.portugalPlayerCount > 0)"
  );
  jsxCode = jsxCode.replace(
    "nationality={comboValidation.isLesBleus ? 'フランス' : (comboValidation.isLaRoja ? 'スペイン' : 'ブラジル')}",
    "nationality={comboValidation.isQuinas ? 'ポルトガル' : (comboValidation.isLesBleus ? 'フランス' : (comboValidation.isLaRoja ? 'スペイン' : 'ブラジル'))}"
  );
  jsxCode = jsxCode.replace(
    `{comboValidation.isLesBleus && (
                    <span className="px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.francePlayerCount}名 (+{comboValidation.franceBonusPct}% 適用中)
                    </span>
                  )}`,
    `{comboValidation.isLesBleus && (
                    <span className="px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.francePlayerCount}名 (+{comboValidation.franceBonusPct}% 適用中)
                    </span>
                  )}
                  {comboValidation.isQuinas && (
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[11px] whitespace-nowrap shadow">
                      スタメン {comboValidation.portugalPlayerCount}名 (+{comboValidation.portugalBonusPct}% 適用中)
                    </span>
                  )}`
  );
  console.log('✅ 1.6 Updated Special Note Banner in app.jsx');
}

// 1.7 nBonusPct in player calculation in app.jsx
if (!jsxCode.includes("comboValidation.isQuinas ? comboValidation.portugalBonusPct")) {
  jsxCode = jsxCode.replace(
    "(comboValidation.isLesBleus ? comboValidation.franceBonusPct : 0)",
    "(comboValidation.isLesBleus ? comboValidation.franceBonusPct : (comboValidation.isQuinas ? comboValidation.portugalBonusPct : 0))"
  );
  console.log('✅ 1.7 Updated nBonusPct in app.jsx');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// ==========================================
// 2. UPDATE app.js
// ==========================================

const comboJsObj = {
  id: 'selecaoDasQuinas26',
  name: "セレソン・ダス・キナス’26",
  rank: '金',
  policy: 'カウンター',
  formationId: '433b_selecaoDasQuinas26',
  buffs: [
    { name: '突破力', val: '+80%' },
    { name: 'タックル', val: '+80%' },
    { name: 'マーク', val: '+80%' },
    { name: 'コンタクト', val: '+80%' }
  ],
  specialNote: 'フィールド上のポルトガル選手1人につき、上記4能力（突破力・タックル・マーク・コンタクト）が追加で2%強化！'
};

const formationJsObj = {
  id: '433b_selecaoDasQuinas26',
  name: '4-3-3B (セレソン・ダス・キナス’26)',
  comboId: 'selecaoDasQuinas26',
  slots: [
    { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
    { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%', requiredStyle: '攻撃的LFB', minLevel: 2 },
    { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
    { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
    { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '攻撃的RFB', minLevel: 3 },
    { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
    { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%', requiredStyle: 'パサーDM', minLevel: 3 },
    { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
    { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'サイドアタッカーLW', minLevel: 2 },
    { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
    { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' }
  ]
};

// 2.1 FORMATION_COMBOS in app.js
if (!jsCode.includes("id:'selecaoDasQuinas26'") && !jsCode.includes('"id":"selecaoDasQuinas26"')) {
  jsCode = jsCode.replace('const FORMATION_COMBOS=[', 'const FORMATION_COMBOS=[' + JSON.stringify(comboJsObj) + ',');
  console.log('✅ 2.1 Added selecaoDasQuinas26 to FORMATION_COMBOS in app.js');
}

// 2.2 FORMATIONS in app.js
if (!jsCode.includes("id:'433b_selecaoDasQuinas26'") && !jsCode.includes('"id":"433b_selecaoDasQuinas26"')) {
  jsCode = jsCode.replace('const FORMATIONS=[', 'const FORMATIONS=[' + JSON.stringify(formationJsObj) + ',');
  console.log('✅ 2.2 Added 433b_selecaoDasQuinas26 to FORMATIONS in app.js');
}

// 2.3 Fallback return object in app.js
if (!jsCode.includes("isQuinas:false,")) {
  jsCode = jsCode.replace(
    "isLesBleus:false,",
    "isLesBleus:false,isQuinas:false,portugalPlayerCount:0,portugalBonusPct:0,"
  );
  console.log('✅ 2.3 Updated fallback return object in app.js');
}

// 2.4 Calculation logic in app.js
if (!jsCode.includes("const isQuinas=activeComboData.id==='selecaoDasQuinas26'")) {
  jsCode = jsCode.replace(
    "const isLesBleus=activeComboData.id==='lesBleus26';",
    "const isLesBleus=activeComboData.id==='lesBleus26';const isQuinas=activeComboData.id==='selecaoDasQuinas26';"
  );
  jsCode = jsCode.replace(
    "const franceBonusPct=francePlayerCount*2;",
    "const franceBonusPct=francePlayerCount*2;const portugalPlayerCount=isQuinas?starterPlayers.filter(p=>p.nationality==='ポルトガル').length:0;const portugalBonusPct=portugalPlayerCount*2;"
  );
  jsCode = jsCode.replace(
    "nationExtraPct=isSelecao?brazilBonusPct:isLaRoja?spainBonusPct:isLesBleus?franceBonusPct:0;",
    "nationExtraPct=isSelecao?brazilBonusPct:isLaRoja?spainBonusPct:isLesBleus?franceBonusPct:isQuinas?portugalBonusPct:0;"
  );
  jsCode = jsCode.replace(
    "isLesBleus,",
    "isLesBleus,isQuinas,portugalPlayerCount,portugalBonusPct,"
  );
  console.log('✅ 2.4 Updated calculation logic in app.js');
}

// 2.5 Header badge UI in app.js
const targetHeaderBadgeJs = 'comboValidation.isLesBleus&&comboValidation.francePlayerCount>0&&/*#__PURE__*/React.createElement("span",{className:"text-xs text-blue-300 font-bold flex items-center gap-1"},/*#__PURE__*/React.createElement(FlagIcon,{nationality:"フランス"})," フランス選手 ",comboValidation.francePlayerCount,"名 (+",comboValidation.franceBonusPct,"% 適用中)")';
const replacementHeaderBadgeJs = targetHeaderBadgeJs + ',comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0&&/*#__PURE__*/React.createElement("span",{className:"text-xs text-red-400 font-bold flex items-center gap-1"},/*#__PURE__*/React.createElement(FlagIcon,{nationality:"ポルトガル"})," ポルトガル選手 ",comboValidation.portugalPlayerCount,"名 (+",comboValidation.portugalBonusPct,"% 適用中)")';

if (jsCode.includes(targetHeaderBadgeJs) && !jsCode.includes("comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0")) {
  jsCode = jsCode.replace(targetHeaderBadgeJs, replacementHeaderBadgeJs);
  console.log('✅ 2.5 Added Portugal header badge in app.js');
}

// 2.6 Special Note Banner UI in app.js
if (!jsCode.includes("comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0")) {
  jsCode = jsCode.replace(
    "comboValidation.isLesBleus&&comboValidation.francePlayerCount>0",
    "comboValidation.isLesBleus&&comboValidation.francePlayerCount>0||comboValidation.isQuinas&&comboValidation.portugalPlayerCount>0"
  );
  jsCode = jsCode.replace(
    'comboValidation.isLesBleus?\'フランス\':comboValidation.isLaRoja?\'スペイン\':\'ブラジル\'',
    'comboValidation.isQuinas?\'ポルトガル\':comboValidation.isLesBleus?\'フランス\':comboValidation.isLaRoja?\'スペイン\':\'ブラジル\''
  );
  const targetFranceButtonJs = 'comboValidation.isLesBleus&&/*#__PURE__*/React.createElement("span",{className:"px-2 py-0.5 rounded bg-blue-500 text-slate-950 font-black text-[11px] whitespace-nowrap shadow"},"スタメン ",comboValidation.francePlayerCount,"名 (+",comboValidation.franceBonusPct,"% 適用中)")';
  const replacementPortugalButtonJs = targetFranceButtonJs + ',comboValidation.isQuinas&&/*#__PURE__*/React.createElement("span",{className:"px-2 py-0.5 rounded bg-red-600 text-white font-black text-[11px] whitespace-nowrap shadow"},"スタメン ",comboValidation.portugalPlayerCount,"名 (+",comboValidation.portugalBonusPct,"% 適用中)")';
  if (jsCode.includes(targetFranceButtonJs)) {
    jsCode = jsCode.replace(targetFranceButtonJs, replacementPortugalButtonJs);
  }
  console.log('✅ 2.6 Updated Special Note Banner in app.js');
}

// 2.7 nBonusPct in player calculation in app.js
if (!jsCode.includes("comboValidation.isQuinas?comboValidation.portugalBonusPct")) {
  jsCode = jsCode.replace(
    "(comboValidation.isLesBleus?comboValidation.franceBonusPct:0)",
    "(comboValidation.isLesBleus?comboValidation.franceBonusPct:(comboValidation.isQuinas?comboValidation.portugalBonusPct:0))"
  );
  console.log('✅ 2.7 Updated nBonusPct in app.js');
}

fs.writeFileSync(appJsPath, jsCode, 'utf-8');

// ==========================================
// 3. UPDATE index.html CACHE BUSTER
// ==========================================
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
const newTimestamp = Date.now().toString();
indexContent = indexContent.replace(/app\.js\?v=\d+/, `app.js?v=${newTimestamp}`);
fs.writeFileSync(indexPath, indexContent, 'utf-8');
console.log('✅ 3. Updated index.html cache buster with', newTimestamp);

console.log('\n🎉 SELECAO DAS QUINAS 26 COMBO ADDED SUCCESSFULLY!');
