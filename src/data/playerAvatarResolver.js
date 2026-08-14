const getPlayerAvatarUrl = (player) => {
  if (!player) return '';
  if (player.id === 'p112' || player.name === 'リオネル・メッシ(配布)') return window.MESSI_HAIFU_IMAGE || player.avatarUrl || '';
  if (player.id === 'p113' || player.name === '相馬勇紀(J1 BEST11 2025)') return window.SOMA_IMAGE || player.avatarUrl || '';
  if (player.id === 'p114' || player.name === 'ラファエル・エリアス(J1 BEST11 2025)') return window.RAFAEL_ELIAS_IMAGE || player.avatarUrl || '';
  if (player.id === 'p115' || player.name === 'レオ・セアラ(J1 BEST11 2025)') return window.LEO_CEARA_IMAGE || player.avatarUrl || '';
  if (player.id === 'p117' || player.name === '小泉佳穂(J1 BEST11 2025)') return window.KOIZUMI_IMAGE || player.avatarUrl || '';
  if (player.id === 'p123' || player.name === '早川友基(J1 BEST11 2025)') return window.HAYAKAWA_BEST11_IMAGE || player.avatarUrl || '';
  if (player.id === 'p147' || player.name === 'ソン・ボムグン(K1 BEST11 2025)') return window.SONG_BUM_KEUN_IMAGE || player.avatarUrl || '';
  if (player.id === 'p259' || player.name === 'アーリング・ハーランド(配布)') return window.HAALAND_GIFT_2026_IMAGE || player.avatarUrl || '';
  if (player.id === 'p260' || player.name === 'ルベン・ディアス(配布)') return window.DIAS_GIFT_2026_IMAGE || player.avatarUrl || '';
  if (player.id === 'p261' || player.name === '平塚浪馬(配布)') return window.HIRATSUKA_GIFT_2026_IMAGE || player.avatarUrl || '';
  if (player.id === 'p262' || player.name === '河本龍将(パック)') return window.KAWAMOTO_PACK_2026_IMAGE || player.avatarUrl || '';
  if (player.id === 'p263' || player.name === 'レオ・セアラ(2026TS)') return window.LEO_CEARA_2026_IMAGE || player.avatarUrl || '';
  return player.avatarUrl || '';
};
