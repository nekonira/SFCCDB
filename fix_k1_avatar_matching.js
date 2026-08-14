const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let code = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Updating K1 BEST11 2025 Image Matching in getPlayerAvatarUrl ---');

// Replace the K1 BEST11 avatar matching section (lines 513-546)
const oldK1Section = `  if ((player.name && (player.name.includes('サバグ') || player.name.includes('Sabbag'))) || player.id === 'p124') {
    return window.SABBAG_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ソン・ミンギュ') || player.name.includes('ミンギュ') || player.name.includes('Song'))) || player.id === 'p125') {
    return window.SONG_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ドンギョン') || player.name.includes('Dong-Gyeong') || player.name.includes('Dong Gyeong'))) || player.id === 'p126') {
    return window.LEE_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('サンユン') || player.name.includes('Sang-Yoon') || player.name.includes('Sang Yoon'))) || player.id === 'p127') {
    return window.KANG_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ジンギュ') || player.name.includes('Jin-Gyu') || player.name.includes('Jin Gyu'))) || player.id === 'p128') {
    return window.KIM_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ジンソプ') || player.name.includes('Jin-Seob') || player.name.includes('Jin Seob'))) || player.id === 'p129') {
    return window.PARK_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ジョンホ') || player.name.includes('Jeong-Ho') || player.name.includes('Jeong Ho'))) || player.id === 'p130') {
    return window.HONG_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ミョンジェ') || player.name.includes('Myung-Jae') || player.name.includes('Myung Jae'))) || player.id === 'p131') {
    return window.LEE_MYUNG_JAE_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ムンファン') || player.name.includes('Moon-Hwan') || player.name.includes('Moon Hwan'))) || player.id === 'p132') {
    return window.KIM_MOON_HWAN_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ボムグン') || player.name.includes('Bum-Keun') || player.name.includes('Bum Keun'))) || player.id === 'p133') {
    return window.SONG_BUM_KEUN_IMAGE || player.avatarUrl || '';
  }
  if ((player.name && (player.name.includes('ヤザン') || player.name.includes('Yazan') || player.name.includes('Al-Arab'))) || player.id === 'p134') {
    return window.YAZAN_IMAGE || player.avatarUrl || '';
  }`;

const newK1Section = `  if (player.id === 'p138' || (player.name && (player.name.includes('サバグ') || player.name.includes('Sabbag')))) {
    return window.SABBAG_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p139' || (player.name && (player.name.includes('ソン・ミンギュ') || player.name.includes('ミンギュ') || player.name.includes('Song')))) {
    return window.SONG_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p140' || (player.name && (player.name.includes('ドンギョン') || player.name.includes('Dong-Gyeong') || player.name.includes('Dong Gyeong')))) {
    return window.LEE_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p141' || (player.name && (player.name.includes('サンユン') || player.name.includes('Sang-Yoon') || player.name.includes('Sang Yoon')))) {
    return window.KANG_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p142' || (player.name && (player.name.includes('ジンギュ') || player.name.includes('Jin-Gyu') || player.name.includes('Jin Gyu')))) {
    return window.KIM_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p143' || (player.name && (player.name.includes('パク・ジン') || player.name.includes('ジンソク') || player.name.includes('ジンソプ') || player.name.includes('Jin-Seob') || player.name.includes('Jin-Seok')))) {
    return window.PARK_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p144' || (player.name && (player.name.includes('ジョンホ') || player.name.includes('Jeong-Ho') || player.name.includes('Jeong Ho')))) {
    return window.HONG_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p145' || (player.name && (player.name.includes('ミョンジェ') || player.name.includes('Myung-Jae') || player.name.includes('Myung Jae')))) {
    return window.LEE_MYUNG_JAE_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p146' || (player.name && (player.name.includes('ムンファン') || player.name.includes('Moon-Hwan') || player.name.includes('Moon Hwan')))) {
    return window.KIM_MOON_HWAN_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p147' || (player.name && (player.name.includes('ボムグン') || player.name.includes('Bum-Keun') || player.name.includes('Bum Keun')))) {
    return window.SONG_BUM_KEUN_IMAGE || player.avatarUrl || '';
  }
  if (player.id === 'p148' || (player.name && (player.name.includes('ヤザン') || player.name.includes('Yazan') || player.name.includes('Al-Arab')))) {
    return window.YAZAN_IMAGE || player.avatarUrl || '';
  }`;

if (code.includes(oldK1Section)) {
  code = code.replace(oldK1Section, newK1Section);
  fs.writeFileSync(appJsxPath, code, 'utf-8');
  console.log('Successfully updated getPlayerAvatarUrl for K1 BEST11 2025 players in src/app.jsx!');
} else {
  console.error('Could not find oldK1Section string in src/app.jsx!');
}
