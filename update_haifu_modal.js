const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== UPDATING HAIFU PLAYER MODAL & RARITY LOGIC ===');

// 1. Update src/app.jsx
const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');

// Add helper isHaifuPlayer if not present
if (!jsxCode.includes('const isHaifuPlayer =')) {
  jsxCode = jsxCode.replace(
    '// 指定レアリティおよび強化状態(初期/最大強化)に応じて能力値を自動計算・適用する動的プレイヤー生成関数',
    `const isHaifuPlayer = (p) => {\n  if (!p) return false;\n  const name = p.name || (p.rawPlayer && p.rawPlayer.name) || '';\n  return name.includes('配布') || !!p.isHaifu || !!(p.rawPlayer && p.rawPlayer.isHaifu);\n};\n\n// 指定レアリティおよび強化状態(初期/最大強化)に応じて能力値を自動計算・適用する動的プレイヤー生成関数`
  );
}

// Update getAdjustedPlayer in jsxCode
const oldGetAdjustedPlayerJsx = `const getAdjustedPlayer = (player, targetRarity, useMaxEnhanced = false) => {
  if (!player) return null;
  // 加工済みの調整済みオブジェクトが渡された場合も常に無加工な元プレイヤーデータ(rawPlayer)を参照
  const basePlayer = player.rawPlayer || player;
  const avatar = getPlayerAvatarUrl(basePlayer);

  // 🔥 最大強化選択時は全選手をレアリティ☆5固定およびisMaxEnhanced: trueとして生成
  if (useMaxEnhanced) {
    if (basePlayer.maxEnhanced) {
      const sourceObj = basePlayer.maxEnhanced;
      return {
        ...basePlayer,
        rawPlayer: basePlayer,
        rarity: '☆5',
        simulatedRarity: '☆5',
        overall: sourceObj.overall,
        baseStats: sourceObj.baseStats,
        detailStats: sourceObj.detailStats,
        addedOffset: 0,
        avatarUrl: avatar,
        isMaxEnhanced: true
      };
    } else {
      // 専用最大強化データ未入力の選手も自動的に☆5育成完了状態(isMaxEnhanced: true)で生成
      const baseResult = getAdjustedPlayer(basePlayer, '☆5', false);
      return {
        ...baseResult,
        rawPlayer: basePlayer,
        rarity: '☆5',
        simulatedRarity: '☆5',
        isMaxEnhanced: true
      };
    }
  }

  // 🌱 通常初期値選択時のレアリティ別加算計算
  const currentRarity = targetRarity || basePlayer.simulatedRarity || basePlayer.rarity || '☆3';`;

const newGetAdjustedPlayerJsx = `const getAdjustedPlayer = (player, targetRarity, useMaxEnhanced = false) => {
  if (!player) return null;
  // 加工済みの調整済みオブジェクトが渡された場合も常に無加工な元プレイヤーデータ(rawPlayer)を参照
  const basePlayer = player.rawPlayer || player;
  const avatar = getPlayerAvatarUrl(basePlayer);
  const isHaifu = isHaifuPlayer(basePlayer);

  // 🔥 最大強化選択時は通常選手は☆5固定、配布選手は元レアリティ維持
  if (useMaxEnhanced) {
    const targetRarityVal = isHaifu ? (basePlayer.rarity || '☆3') : '☆5';
    if (basePlayer.maxEnhanced) {
      const sourceObj = basePlayer.maxEnhanced;
      return {
        ...basePlayer,
        rawPlayer: basePlayer,
        rarity: targetRarityVal,
        simulatedRarity: targetRarityVal,
        overall: sourceObj.overall,
        baseStats: sourceObj.baseStats,
        detailStats: sourceObj.detailStats,
        addedOffset: 0,
        avatarUrl: avatar,
        isMaxEnhanced: true
      };
    } else {
      // 専用最大強化データ未入力の選手も自動的に育成完了状態(isMaxEnhanced: true)で生成
      const baseResult = getAdjustedPlayer(basePlayer, targetRarityVal, false);
      return {
        ...baseResult,
        rawPlayer: basePlayer,
        rarity: targetRarityVal,
        simulatedRarity: targetRarityVal,
        isMaxEnhanced: true
      };
    }
  }

  // 🌱 通常初期値選択時のレアリティ別加算計算 (配布選手はレアリティ固定)
  const currentRarity = isHaifu ? (basePlayer.rarity || '☆3') : (targetRarity || basePlayer.simulatedRarity || basePlayer.rarity || '☆3');`;

if (jsxCode.includes(oldGetAdjustedPlayerJsx)) {
  jsxCode = jsxCode.replace(oldGetAdjustedPlayerJsx, newGetAdjustedPlayerJsx);
  console.log('1. getAdjustedPlayer in app.jsx updated.');
} else {
  console.log('1. getAdjustedPlayer pattern check in app.jsx...');
}

// Hide simulator in PlayerDetailModal in jsxCode
const oldModalSimulatorJsx = `{/* 🌟 成長・レアリティ段階切替シミュレーター */}`;
const newModalSimulatorJsx = `{/* 🌟 成長・レアリティ段階切替シミュレーター (※配布選手は非表示) */}
        {!isHaifuPlayer(player) && (`;

if (jsxCode.includes(oldModalSimulatorJsx)) {
  // Find where the simulator block ends and add closing bracket
  const simStart = jsxCode.indexOf(oldModalSimulatorJsx);
  const simHeaderEnd = jsxCode.indexOf('<div className="grid grid-cols-2 gap-3', simStart);
  
  // Insert closing bracket before grid-cols-2
  jsxCode = jsxCode.substring(0, simHeaderEnd) + `)}\n\n        ` + jsxCode.substring(simHeaderEnd);
  jsxCode = jsxCode.replace(oldModalSimulatorJsx, newModalSimulatorJsx);
  console.log('2. PlayerDetailModal simulator in app.jsx updated.');
}

fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');

// 2. Update src/app.js
const appJsPath = path.join(__dirname, 'src', 'app.js');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

if (!jsCode.includes('const isHaifuPlayer =')) {
  jsCode = jsCode.replace(
    'const getAdjustedPlayer = (player, targetRarity, useMaxEnhanced = false) => {',
    `const isHaifuPlayer = p => {\n  if (!p) return false;\n  const name = p.name || p.rawPlayer && p.rawPlayer.name || '';\n  return name.includes('配布') || !!p.isHaifu || !!(p.rawPlayer && p.rawPlayer.isHaifu);\n};\nconst getAdjustedPlayer = (player, targetRarity, useMaxEnhanced = false) => {`
  );
}

const oldGetAdjustedPlayerJs = `const getAdjustedPlayer = (player, targetRarity, useMaxEnhanced = false) => {
  if (!player) return null;
  // 加工済みの調整済みオブジェクトが渡された場合も常に無加工な元プレイヤーデータ(rawPlayer)を参照
  const basePlayer = player.rawPlayer || player;
  const avatar = getPlayerAvatarUrl(basePlayer);

  // 🔥 最大強化選択時は全選手をレアリティ☆5固定およびisMaxEnhanced: trueとして生成
  if (useMaxEnhanced) {
    if (basePlayer.maxEnhanced) {
      const sourceObj = basePlayer.maxEnhanced;
      return {
        ...basePlayer,
        rawPlayer: basePlayer,
        rarity: '☆5',
        simulatedRarity: '☆5',
        overall: sourceObj.overall,
        baseStats: sourceObj.baseStats,
        detailStats: sourceObj.detailStats,
        addedOffset: 0,
        avatarUrl: avatar,
        isMaxEnhanced: true
      };
    } else {
      // 専用最大強化データ未入力の選手も自動的に☆5育成完了状態(isMaxEnhanced: true)で生成
      const baseResult = getAdjustedPlayer(basePlayer, '☆5', false);
      return {
        ...baseResult,
        rawPlayer: basePlayer,
        rarity: '☆5',
        simulatedRarity: '☆5',
        isMaxEnhanced: true
      };
    }
  }

  // 🌱 通常初期値選択時のレアリティ別加算計算
  const currentRarity = targetRarity || basePlayer.simulatedRarity || basePlayer.rarity || '☆3';`;

const newGetAdjustedPlayerJs = `const getAdjustedPlayer = (player, targetRarity, useMaxEnhanced = false) => {
  if (!player) return null;
  const basePlayer = player.rawPlayer || player;
  const avatar = getPlayerAvatarUrl(basePlayer);
  const isHaifu = isHaifuPlayer(basePlayer);

  if (useMaxEnhanced) {
    const targetRarityVal = isHaifu ? (basePlayer.rarity || '☆3') : '☆5';
    if (basePlayer.maxEnhanced) {
      const sourceObj = basePlayer.maxEnhanced;
      return {
        ...basePlayer,
        rawPlayer: basePlayer,
        rarity: targetRarityVal,
        simulatedRarity: targetRarityVal,
        overall: sourceObj.overall,
        baseStats: sourceObj.baseStats,
        detailStats: sourceObj.detailStats,
        addedOffset: 0,
        avatarUrl: avatar,
        isMaxEnhanced: true
      };
    } else {
      const baseResult = getAdjustedPlayer(basePlayer, targetRarityVal, false);
      return {
        ...baseResult,
        rawPlayer: basePlayer,
        rarity: targetRarityVal,
        simulatedRarity: targetRarityVal,
        isMaxEnhanced: true
      };
    }
  }

  const currentRarity = isHaifu ? (basePlayer.rarity || '☆3') : (targetRarity || basePlayer.simulatedRarity || basePlayer.rarity || '☆3');`;

if (jsCode.includes(oldGetAdjustedPlayerJs)) {
  jsCode = jsCode.replace(oldGetAdjustedPlayerJs, newGetAdjustedPlayerJs);
  console.log('3. getAdjustedPlayer in app.js updated.');
}

// In app.js PlayerDetailModal simulator conditionally rendered:
const jsSimHeader = `/*#__PURE__*/React.createElement("div", {
    className: \`bg-slate-900/90 p-3.5 rounded-2xl border space-y-2 transition-all \${isMaxEnhanced ? 'border-orange-500/40' : 'border-amber-500/40'}\`
  }, /*#__PURE__*/React.createElement("div", {`;

const jsSimHeaderWrapped = `!isHaifuPlayer(player) && /*#__PURE__*/React.createElement("div", {
    className: \`bg-slate-900/90 p-3.5 rounded-2xl border space-y-2 transition-all \${isMaxEnhanced ? 'border-orange-500/40' : 'border-amber-500/40'}\`
  }, /*#__PURE__*/React.createElement("div", {`;

if (jsCode.includes(jsSimHeader)) {
  jsCode = jsCode.replace(jsSimHeader, jsSimHeaderWrapped);
  console.log('4. PlayerDetailModal simulator in app.js updated.');
}

fs.writeFileSync(appJsPath, jsCode, 'utf-8');

console.log('=== HAIFU PLAYER MODAL & RARITY LOGIC UPDATED SUCCESSFULLY! ===');
