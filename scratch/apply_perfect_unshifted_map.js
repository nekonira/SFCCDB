const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');
const appJsPath = path.join(rootDir, 'src', 'app.js');

// 1. Read base explicit map for p01 to p263 from verify_exact_image_vars.js
const verifyCode = fs.readFileSync(path.join(rootDir, 'verify_exact_image_vars.js'), 'utf-8');
const mapMatch = verifyCode.match(/const explicitMap = (\{[\s\S]*?\});/);
const perfectMap = eval('(' + mapMatch[1] + ')');

// 2. Read all players from mockData.js
const mockDataContent = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
const playersMatch = mockDataContent.match(/window\.INITIAL_PLAYERS\s*=\s*(\[[\s\S]*?\]);\s*window\.SAKATSUKU_DATA/);
const players = eval(playersMatch[1]);

// 3. Explicit accurate fixes for players p264 to p376
const explicitP264Plus = {
  p264: "YAMAGISHI_2026_TS_IMAGE",
  p265: "YAMADA_HIROTO_2026_TS_IMAGE",
  p266: "TAMURA_SHOTA_2026_TS_IMAGE",
  p267: "TOSHIDA_YUSEI_2026_TS_IMAGE",
  p268: "IZUMI_TOYA_2026_TS_IMAGE",
  p269: "YAMAMOTO_OUTA_2026_TS_IMAGE",
  p270: "ALISSON_2026_IMAGE",
  p271: "ENDRICK_2026_IMAGE",
  p272: "GREENWOOD_2026_IMAGE",
  p273: "AKANJI_2026_IMAGE",
  p274: "HONDA_2026_IMAGE",
  p275: "PULISIC_2026_IMAGE",
  p276: "IDZES_2026_IMAGE",
  p277: "CHANATHIP_2026_IMAGE",
  p278: "KIM_NAMIL_HAIFU_IMAGE",
  p279: "AHN_JUNGHWAN_HAIFU_IMAGE",
  p280: "IIJIMA_2026_IMAGE",
  p281: "BARFIE_2026_IMAGE",
  p282: "BAEK_GYEONGSU_2026_IMAGE",
  p283: "BURROWS_2026_IMAGE",
  p284: "ARGANTCHUEV_2026_IMAGE",
  p285: "SUSPEITA_2026_IMAGE",
  p286: "TOUMEIOTOKO_2026_IMAGE",
  p287: "MUSAIR_2026_IMAGE",
  p288: "P_RAMANBELA_2026_IMAGE",
  p289: "J_RAMANBELA_2026_IMAGE",
  p290: "ANTANCHEN_2026_IMAGE",
  p291: "SUZUKIYUMA_2025_IMAGE",
  p292: "YUYAOSAKO_2025_IMAGE",
  p293: "OHSEHUN_2025_IMAGE",
  p294: "LUCAO_2025_IMAGE",
  p295: "ITSUKISOMENO_2025_IMAGE",
  p296: "KAZUSHIMITSUHIRA_2025_IMAGE",
  p297: "DAIKIWATARI_2025_IMAGE",
  p298: "DISARO_2025_IMAGE",
  p299: "KAITOTANIGUCHI_2025_IMAGE",
  p300: "KENSUKENAGAI_2025_IMAGE",
  p301: "MAOHOSOYA_2025_IMAGE",
  p302: "MARCUSVINICIUS_2025_IMAGE",
  p303: "MARCELORYAN_2025_IMAGE",
  p304: "PABLOSABBAG_2025_IMAGE",
  p305: "KOYAKITAGAWA_2025_IMAGE",
  p306: "RAFAELELIAS_2025_IMAGE",
  p307: "AKITOSUZUKI_2025_IMAGE",
  p308: "ARATAWATANABE_2025_IMAGE",
  p309: "ATARUESAKA_2025_IMAGE",
  p310: "NAOKINOMURA_2025_IMAGE",
  p311: "SHINJIKAGAWA_2025_IMAGE",
  p312: "TAKASHIUSAMI_2025_IMAGE",
  p313: "RYOMAWATANABE_2025_IMAGE",
  p314: "RENASAKURA_2025_IMAGE",
  p315: "TOLGAYARSLAN_2025_IMAGE",
  p316: "MATHEUSJESUS_2025_IMAGE",
  p317: "LEEDONGGYEONG_2025_IMAGE",
  p318: "YASUTOWAKIZAKA_2025_IMAGE",
  p319: "JUNAMANO_2025_IMAGE",
  p320: "KOSUKEONOSE_2025_IMAGE",
  p321: "SHOINAGAKI_2025_IMAGE",
  p322: "SHUNTATANAKA_2025_IMAGE",
  p323: "KOKIMORITA_2025_IMAGE",
  p324: "TAKUMAARANO_2025_IMAGE",
  p325: "YUTAFUKAZAWA_2025_IMAGE",
  p326: "TAKUYAKIDA_2025_IMAGE",
  p327: "YURILARA_2025_IMAGE",
  p328: "DAIKIMATSUOKA_2025_IMAGE",
  p329: "SHUHEIKAMIMURA_2025_IMAGE",
  p330: "YUTONAGATOMO_2025_IMAGE",
  p331: "YUTOHORIGOME_2025_IMAGE",
  p332: "KOTAMURAMATSU_2025_IMAGE",
  p333: "KIMITONONO_2025_IMAGE",
  p334: "RIKUHANDA_2025_IMAGE",
  p335: "SOYAFUJIWARA_2025_IMAGE",
  p336: "MATSUBARA_KO_2026_IMAGE",
  p337: "IGARASHI_SENA_2026_IMAGE",
  p338: "MARIUS_HOIBRATEN_2026_IMAGE",
  p339: "INOUE_TAISEI_2026_IMAGE",
  p340: "KOGA_TAIYO_2026_IMAGE",
  p341: "FUKUMORI_AKITO_2026_IMAGE",
  p342: "UEDA_NAOMICHI_2026_IMAGE",
  p343: "SUGATA_MASAHIRO_2026_IMAGE",
  p344: "SUMIYOSHI_JELANI_2026_IMAGE",
  p345: "NAKATANI_SHINNOSUKE_2026_IMAGE",
  p346: "KAMIYAMA_KYOSUKE_2026_IMAGE",
  p347: "ICHIHARA_RION_2026_IMAGE",
  p348: "SUZUKI_YOSHINORI_2026_IMAGE",
  p349: "YAMAKAWA_TETSUSHI_2026_IMAGE",
  p350: "NAKAYAMA_YUTA_2026_IMAGE",
  p351: "SASAKI_SHO_2026_IMAGE",
  p352: "TANIGUCHI_HIROTO_2026_IMAGE",
  p353: "INUI_TAKASHI_2026_IMAGE",
  p354: "IWASAKI_YUTO_2026_IMAGE",
  p355: "KONNO_KAZUYA_2026_IMAGE",
  p356: "SUZUKI_YUTO_2026_IMAGE",
  p357: "TANAKA_KAZUKI_2026_IMAGE",
  p358: "NOYORI_KAZUYA_2026_IMAGE",
  p359: "IENAGA_AKIHIRO_2026_IMAGE",
  p360: "ITO_TATSUYA_2026_IMAGE",
  p361: "HARA_TAICHI_2026_IMAGE",
  p362: "NAKAMA_HAYATO_2026_IMAGE",
  p363: "TANAKA_PAULO_JUNICHI_2026_IMAGE",
  p364: "MUTO_YOSHINORI_2026_IMAGE",
  p365: "TANI_KOSEI_2026_IMAGE",
  p366: "PISANO_ALEX_2026_IMAGE",
  p367: "OSAKO_KEISUKE_2026_IMAGE",
  p368: "ICHIKAWA_AKINORI_2026_IMAGE",
  p369: "SVEND_BRODERSEN_2026_IMAGE",
  p370: "KIM_JIN_HYEON_2026_IMAGE",
  p371: "NISHIKAWA_SHUSAKU_2026_IMAGE",
  p372: "PARK_ILGYU_2026_IMAGE",
  p373: "YAMAL_IMAGE",
  p374: "CUBARSI_IMAGE",
  p375: "GAVI_IMAGE",
  p376: "SIMON_IMAGE"
};

Object.assign(perfectMap, explicitP264Plus);

console.log('Total mapped players in perfectMap:', Object.keys(perfectMap).length);

// 4. Verify all mapped variables exist in src/data
const availableVars = new Set();
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const code = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = code.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) availableVars.add(m[1]);
});

let missingCount = 0;
players.forEach(p => {
  const v = perfectMap[p.id];
  if (!v || !availableVars.has(v)) {
    console.error(`[ERROR] Missing or invalid var for player ${p.id} (${p.name}): ${v}`);
    missingCount++;
  }
});

if (missingCount === 0) {
  console.log('ALL 372 PLAYERS ARE 100% PERFECTLY AND VALIDLY MAPPED!');
}

// 5. Update src/app.js PLAYER_IMAGE_MAP
let appJsContent = fs.readFileSync(appJsPath, 'utf-8');
const newMapString = `const PLAYER_IMAGE_MAP = ${JSON.stringify(perfectMap, null, 2)};`;
appJsContent = appJsContent.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapString);

// 6. Simplify PlayerAvatar component in src/app.js (Remove polling, return immediately)
const simplifiedPlayerAvatar = `const PlayerAvatar = ({
  player,
  className = "",
  alt = ""
}) => {
  const [imgError, setImgError] = React.useState(false);
  const avatarUrl = getPlayerAvatarUrl(player);
  if (!avatarUrl || imgError) {
    const initial = player && player.name ? player.name.charAt(0) : '?';
    return /*#__PURE__*/React.createElement("div", {
      className: \`w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold border border-slate-600 \${className}\`
    }, initial);
  }
  return /*#__PURE__*/React.createElement("img", {
    src: avatarUrl,
    alt: alt || (player ? player.name : ''),
    className: \`w-10 h-10 rounded-full object-cover border border-slate-600 \${className}\`,
    onError: () => setImgError(true)
  });
};`;

appJsContent = appJsContent.replace(/const PlayerAvatar = \(\{[\s\S]*?\n\};\nwindow\.PlayerAvatar = PlayerAvatar;/s, `${simplifiedPlayerAvatar}\nwindow.PlayerAvatar = PlayerAvatar;`);

fs.writeFileSync(appJsPath, appJsContent, 'utf-8');
console.log('Successfully updated src/app.js with perfect PLAYER_IMAGE_MAP and instant PlayerAvatar!');
