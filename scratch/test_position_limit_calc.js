global.window = {};
require('../src/data/mockData.js');
const PLAYERS = global.window.INITIAL_PLAYERS;

const POSITION_LIMIT_ADDITIONS = {
  CF: {
    '決定力': 355, 'キック力': 355, '冷静さ': 355,
    'ショートパス': 331, 'ロングパス': 311, 'キック精度': 311,
    '突破力': 343, 'キープ力': 343, 'ボールタッチ': 355,
    'タックル': 319, 'パスカット': 319, 'マーク': 319,
    'ジャンプ': 343, 'コンタクト': 355, 'スタミナ': 343,
    '走力': 343, '敏捷性': 343
  },
  WING_SIDE: { // LW, RW, LM, RM
    '決定力': 343, 'キック力': 331, '冷静さ': 343,
    'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 355, 'キープ力': 355, 'ボールタッチ': 343,
    'タックル': 311, 'パスカット': 319, 'マーク': 319,
    'ジャンプ': 331, 'コンタクト': 331, 'スタミナ': 343,
    '走力': 355, '敏捷性': 355
  },
  AM: {
    '決定力': 331, 'キック力': 331, '冷静さ': 343,
    'ショートパス': 355, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 343, 'キープ力': 343, 'ボールタッチ': 343,
    'タックル': 343, 'パスカット': 331, 'マーク': 331,
    'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355,
    '走力': 331, '敏捷性': 343
  },
  DM: {
    '決定力': 331, 'キック力': 331, '冷静さ': 343,
    'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355,
    '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331,
    'タックル': 355, 'パスカット': 343, 'マーク': 343,
    'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355,
    '走力': 331, '敏捷性': 331
  },
  FB: { // LFB, RFB
    '決定力': 319, 'キック力': 319, '冷静さ': 319,
    'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331,
    'タックル': 355, 'パスカット': 355, 'マーク': 355,
    'ジャンプ': 331, 'コンタクト': 343, 'スタミナ': 355,
    '走力': 355, '敏捷性': 355
  },
  CB: {
    '決定力': 319, 'キック力': 319, '冷静さ': 319,
    'ショートパス': 343, 'ロングパス': 343, 'キック精度': 343,
    '突破力': 331, 'キープ力': 331, 'ボールタッチ': 331,
    'タックル': 355, 'パスカット': 355, 'マーク': 355,
    'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343,
    '走力': 343, '敏捷性': 343
  },
  GK: {
    '決定力': 307, 'キック力': 307, '冷静さ': 307,
    'ショートパス': 355, 'ロングパス': 355, 'キック精度': 355,
    '突破力': 307, 'キープ力': 307, 'ボールタッチ': 307,
    'セービング': 355, '反応速度': 355, '1VS1': 355,
    'ジャンプ': 355, 'コンタクト': 355, 'スタミナ': 343,
    '走力': 331, '敏捷性': 331
  }
};

function getGroup(pos) {
  if (!pos) return 'CF';
  const p = pos.toUpperCase();
  if (p === 'CF' || p === 'ST' || p === 'FW') return 'CF';
  if (['LW', 'RW', 'LM', 'RM', 'LWF', 'RWF', 'LMF', 'RMF', 'WG'].includes(p)) return 'WING_SIDE';
  if (['AM', 'OM', 'AMF', 'OMF', 'CAM'].includes(p)) return 'AM';
  if (['DM', 'CM', 'DMF', 'CMF', 'DH', 'CH'].includes(p)) return 'DM';
  if (['LFB', 'RFB', 'LB', 'RB', 'LSB', 'RSB', 'SB', 'WB'].includes(p)) return 'FB';
  if (['CB', 'DF'].includes(p)) return 'CB';
  if (['GK'].includes(p)) return 'GK';
  return 'CF';
}

console.log('Testing sample players across positions:');
const samplePositions = ['CF', 'LW', 'RW', 'LM', 'RM', 'AM', 'DM', 'LFB', 'RFB', 'CB', 'GK'];

samplePositions.forEach(pos => {
  const p = PLAYERS.find(player => player.mainPosition === pos) || PLAYERS[0];
  const group = getGroup(p.mainPosition);
  console.log(`\nPlayer: ${p.name} (${p.rarity || '☆5'}, Pos: ${p.mainPosition} -> Group: ${group})`);
  const fin = p.detailStats?.shoot?.finishing || 500;
  console.log(`  決定力: 能力 ${fin} + 補正 ${POSITION_LIMIT_ADDITIONS[group]['決定力']} = 限界値 ${fin + POSITION_LIMIT_ADDITIONS[group]['決定力']}`);
});
