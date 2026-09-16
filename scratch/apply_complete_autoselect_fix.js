const fs = require('fs');

const completeHeader = `
const POSITION_LIMIT_ADDITIONS = {
  CF: { '決定力': 355, 'キック力': 355, '冷静さ': 355, 'ショートパス': 331, 'ロングパス': 311, 'キック精度': 311, 'パス精度': 311, '突破力': 343, 'キープ力': 343, 'キープ': 343, 'ボールタッチ': 355, 'タックル': 319, 'パスカット': 319, 'マーク': 319, 'ジャンプ': 343, 'コンタクト': 355, 'スタミナ': 343, '走力': 343, '敏捷性': 343 },
  WING_SIDE: { '決定力': 343, 'キック力': 331, '冷静さ': 343, 'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343, 'パス精度': 343, '突破力': 355, 'キープ力': 355, 'キープ': 355, 'ボールタッチ': 343, 'タックル': 311, 'パスカット': 319, 'マーク': 319, 'ジャンプ': 331, 'コンタクト': 331, 'スタミナ': 343, '走力': 355, '敏捷性': 355 },
  AM: { '決定力': 331, 'キック力': 331, '冷静さ': 343, 'ショートパス': 355, 'ロングパス': 343, 'キック精度': 343, 'パス精度': 343, '突破力': 343, 'キープ力': 343, 'キープ': 343, 'ボールタッチ': 343, 'タックル': 343, 'パスカット': 331, 'マーク': 331, 'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355, '走力': 331, '敏捷性': 343 },
  DM: { '決定力': 331, 'キック力': 331, '冷静さ': 343, 'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355, 'パス精度': 355, '突破力': 331, 'キープ力': 331, 'キープ': 331, 'ボールタッチ': 331, 'タックル': 355, 'パスカット': 343, 'マーク': 343, 'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355, '走力': 331, '敏捷性': 331 },
  FB: { '決定力': 319, 'キック力': 319, '冷静さ': 319, 'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343, 'パス精度': 343, '突破力': 331, 'キープ力': 331, 'キープ': 331, 'ボールタッチ': 331, 'タックル': 355, 'パスカット': 355, 'マーク': 355, 'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355, '走力': 355, '敏捷性': 355 },
  CB: { '決定力': 319, 'キック力': 319, '冷静さ': 319, 'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343, 'パス精度': 343, '突破力': 331, 'キープ力': 331, 'キープ': 331, 'ボールタッチ': 331, 'タックル': 355, 'パスカット': 355, 'マーク': 355, 'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343, '走力': 343, '敏捷性': 343 },
  GK: { '決定力': 307, 'キック力': 307, '冷静さ': 307, 'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355, 'パス精度': 355, '突破力': 307, 'キープ力': 307, 'キープ': 307, 'ボールタッチ': 307, 'セービング': 355, '反応速度': 355, '1VS1': 355, 'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343, '走力': 331, '敏捷性': 331 }
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

const STAT_MAP = {
  '決定力': ['shoot', 'finishing'], 'キック力': ['shoot', 'power'], '冷静さ': ['shoot', 'composure'],
  'ショートパス': ['pass', 'shortPass'], 'ロングパス': ['pass', 'longPass'], 'キック精度': ['pass', 'accuracy'], 'パス精度': ['pass', 'accuracy'],
  '突破力': ['dribble', 'breakout'], 'キープ力': ['dribble', 'keeping'], 'キープ': ['dribble', 'keeping'], 'ボールタッチ': ['dribble', 'ballTouch'],
  'タックル': ['defense', 'tackle'], 'パスカット': ['defense', 'interception'], 'マーク': ['defense', 'marking'],
  'セービング': ['defense', 'save'], '反応速度': ['defense', 'interception'], '1VS1': ['defense', 'marking'],
  'ジャンプ': ['physical', 'jumping'], 'コンタクト': ['physical', 'contact'], 'スタミナ': ['physical', 'stamina'],
  '走力': ['speed', 'running'], '敏捷性': ['speed', 'agility']
};

function getPlayerBaseStat(player, stName) {
  if (!player || !player.detailStats) return 400;
  const path = STAT_MAP[stName];
  if (!path || !player.detailStats[path[0]]) return 400;
  return player.detailStats[path[0]][path[1]] || 400;
}
`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove duplicate definitions if we previously inserted getPositionGroup
  if (content.includes('const POSITION_LIMIT_ADDITIONS =')) {
    // Already has outer definition or internal definition
  }
  
  // Replace function normalizeStyle or function optimizeSpecialCardSlots by putting completeHeader right before function optimizeSpecialCardSlots
  const targetStr = 'function optimizeSpecialCardSlots';
  if (content.includes(targetStr)) {
    // Clean out previous partial insertions
    content = content.replace(/const STAT_MAP =[\s\S]*?function getPlayerBaseStat[\s\S]*?\n\}/g, '');
    content = content.replace(targetStr, completeHeader.trim() + '\n\n' + targetStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated:', filePath);
  }
}

processFile('src/app.js');
if (fs.existsSync('src/app.jsx')) {
  processFile('src/app.jsx');
}
