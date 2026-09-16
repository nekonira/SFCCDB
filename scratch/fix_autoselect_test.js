const fs = require('fs');

const helperDefs = `
const STAT_MAP = {
  '決定力': ['shoot', 'finishing'], 'キック力': ['shoot', 'power'], '冷静さ': ['shoot', 'composure'],
  'ショートパス': ['pass', 'shortPass'], 'ロングパス': ['pass', 'longPass'], 'キック精度': ['pass', 'accuracy'], 'パス精度': ['pass', 'accuracy'],
  '突破力': ['dribble', 'breakout'], 'キープ力': ['dribble', 'keeping'], 'キープ': ['dribble', 'keeping'], 'ボールタッチ': ['dribble', 'ballTouch'],
  'タックル': ['defense', 'tackle'], 'パスカット': ['defense', 'interception'], 'マーク': ['defense', 'marking'],
  'セービング': ['defense', 'save'], '反応速度': ['defense', 'interception'], '1VS1': ['defense', 'marking'],
  'ジャンプ': ['physical', 'jumping'], 'コンタクト': ['physical', 'contact'], 'スタミナ': ['physical', 'stamina'],
  '走力': ['speed', 'running'], '敏捷性': ['speed', 'agility']
};

function getPositionGroup(pos) {
  if (!pos) return 'CF';
  const p = pos.toUpperCase();
  if (p === 'CF' || p === 'ST' || p === 'FW') return 'CF';
  if (['LW', 'RW', 'LM', 'RM', 'LWF', 'RWF', 'LMF', 'RMF', 'WG', 'WING_SIDE'].includes(p)) return 'WING_SIDE';
  if (['AM', 'OM', 'AMF', 'OMF', 'CAM'].includes(p)) return 'AM';
  if (['DM', 'CM', 'DMF', 'CMF', 'DH', 'CH'].includes(p)) return 'DM';
  if (['LFB', 'RFB', 'LB', 'RB', 'LSB', 'RSB', 'SB', 'WB', 'FB'].includes(p)) return 'FB';
  if (['CB', 'DF'].includes(p)) return 'CB';
  if (['GK'].includes(p)) return 'GK';
  return 'CF';
}

function getPlayerBaseStat(player, stName) {
  if (!player || !player.detailStats) return 400;
  const path = STAT_MAP[stName];
  if (!path || !player.detailStats[path[0]]) return 400;
  return player.detailStats[path[0]][path[1]] || 400;
}
`;

// Test patching app.js
let appJs = fs.readFileSync('src/app.js', 'utf8');

if (!appJs.includes('function getPositionGroup')) {
  const targetStr = 'function optimizeSpecialCardSlots';
  appJs = appJs.replace(targetStr, helperDefs + '\n' + targetStr);
  fs.writeFileSync('src/app.js', appJs);
  console.log('Patched src/app.js with missing helper functions getPositionGroup and getPlayerBaseStat!');
} else {
  console.log('src/app.js already has getPositionGroup');
}

// Also patch app.jsx if exists
if (fs.existsSync('src/app.jsx')) {
  let appJsx = fs.readFileSync('src/app.jsx', 'utf8');
  if (!appJsx.includes('function getPositionGroup')) {
    const targetStr = 'function optimizeSpecialCardSlots';
    appJsx = appJsx.replace(targetStr, helperDefs + '\n' + targetStr);
    fs.writeFileSync('src/app.jsx', appJsx);
    console.log('Patched src/app.jsx with missing helper functions getPositionGroup and getPlayerBaseStat!');
  } else {
    console.log('src/app.jsx already has getPositionGroup');
  }
}
