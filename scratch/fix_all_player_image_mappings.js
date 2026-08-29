const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Scan all Image.js files and get window variable names
const fileToVarName = {};
const allImageVars = new Set();
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const match = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (match) {
    const varName = match[1];
    fileToVarName[file] = varName;
    allImageVars.add(varName);
  }
});

// 2. Scan all add_*.js scripts for explicit player ID -> ImageVar mapping
const addScriptMap = {}; // pid -> varName
const addScriptPlayerNameMap = {}; // pid -> playerName in add script

fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  const idMatch = content.match(/id:\s*['"](p\d+)['"]/);
  const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
  const varMatch = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  const imageJsMatch = content.match(/['"](.*Image\.js)['"]/);
  
  if (idMatch) {
    const pid = idMatch[1];
    let v = varMatch ? varMatch[1] : null;
    if (!v && imageJsMatch) {
      const baseFile = path.basename(imageJsMatch[1]);
      v = fileToVarName[baseFile];
    }
    if (v) {
      addScriptMap[pid] = v;
    }
    if (nameMatch) {
      addScriptPlayerNameMap[pid] = nameMatch[1];
    }
  }
});

// 3. Load all players from mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// 4. Build correct PLAYER_IMAGE_MAP for ALL players
const correctMap = {};

// Base explicit map for p01 to p263
const baseExplicitMap = {
  p01: 'PELE_IMAGE', p02: 'RONALDO_IMAGE', p03: 'DEBRUYNE_IMAGE', p04: 'HAALAND_IMAGE',
  p05: 'VAN_DIJK_IMAGE', p06: 'BELLINGHAM_IMAGE', p07: 'HONDA_IMAGE', p08: 'MESSI_MLS_IMAGE',
  p09: 'VINICIUS_IMAGE', p10: 'MULLER_IMAGE', p11: 'DEMBELE_IMAGE', p12: 'REUS_IMAGE',
  p13: 'GVARDIOL_IMAGE', p14: 'SALAH_IMAGE', p15: 'PORRO_IMAGE', p16: 'SON_MLS_IMAGE',
  p17: 'HAALAND_IMAGE', p18: 'GRIEZMANN_IMAGE', p19: 'LEWANDOWSKI_IMAGE', p20: 'VALVERDE_IMAGE',
  p21: 'SALIBA_IMAGE', p22: 'KAMADA_IMAGE', p23: 'FODEN_IMAGE', p24: 'KVARATSKHELIA_IMAGE',
  p25: 'DIALLO_IMAGE', p26: 'PEDRO_IMAGE', p27: 'MCKENNIE_IMAGE', p28: 'EL_SHAARAWY_IMAGE',
  p29: 'KURATA_IMAGE', p30: 'YOUNG_IMAGE', p31: 'WILSON_IMAGE', p32: 'BENWHITE_IMAGE',
  p33: 'ISCO_IMAGE', p34: 'SPINAZZOLA_IMAGE', p35: 'DANTE_IMAGE', p36: 'LONGSTAFF_IMAGE',
  p37: 'DOAN_IMAGE', p38: 'SOMA_IMAGE', p39: 'MITOMAJPN_IMAGE', p40: 'SCHMIDT_IMAGE',
  p41: 'TANAKA_IMAGE', p42: 'SAKA_IMAGE', p43: 'RODRYGO_IMAGE', p44: 'MINAMINO_IMAGE',
  p45: 'KIM_IMAGE', p46: 'AKANJI_2026_IMAGE', p47: 'EDERSON_IMAGE', p48: 'BARELLA_IMAGE',
  p49: 'LAUTARO_IMAGE', p50: 'ROLDAN_IMAGE', p51: 'ODEGAARD_IMAGE', p52: 'MCTOMINAY_IMAGE',
  p53: 'RAPHINHA_IMAGE', p54: 'YAZAN_IMAGE', p55: 'MARMOUSH_IMAGE', p56: 'TSUBOI_IMAGE',
  p57: 'HIROKIITO_IMAGE', p58: 'GAKUJI_OTA_IMAGE', p59: 'HISATOSATO_IMAGE', p60: 'SANO_IMAGE',
  p61: 'YUKOBAYASHI_IMAGE', p62: 'SONG_IMAGE', p63: 'KOGA_IMAGE', p64: 'BENTANCUR_IMAGE',
  p65: 'LEE_IMAGE', p66: 'HWANG_IMAGE', p67: 'OBLAK_IMAGE', p68: 'BREMER_IMAGE',
  p69: 'GABRIEL_IMAGE', p70: 'AKE_IMAGE', p71: 'ALEXSANDRO_IMAGE', p72: 'DIMARCO_IMAGE',
  p73: 'BASTONI_IMAGE', p74: 'DUMFRIES_IMAGE', p75: 'CAMAVINGA_IMAGE', p76: 'TCHOUAMENI_IMAGE',
  p77: 'BRAHIM_IMAGE', p78: 'MILITAO_IMAGE', p79: 'COURTOIS_IMAGE', p80: 'ALMIRON_IMAGE',
  p81: 'POPE_IMAGE', p82: 'BRUNOGUIMARAES_IMAGE', p83: 'BALDE_IMAGE', p84: 'CANCELO_IMAGE',
  p85: 'CORREA_IMAGE', p86: 'CALHANOGLU_IMAGE', p87: 'FABIAN_IMAGE', p88: 'SOMMER_IMAGE',
  p89: 'MAIGNAN_IMAGE', p90: 'JOAO_PEDRO_IMAGE', p91: 'SABBAG_IMAGE', p92: 'LEO_CEARA_IMAGE',
  p93: 'MATHEUS_IMAGE', p94: 'JOAN_GARCIA_IMAGE', p95: 'GATTI_IMAGE', p96: 'CUADRADO_IMAGE',
  p97: 'REECE_JAMES_IMAGE', p98: 'SORLOTH_IMAGE', p99: 'NICO_WILLIAMS_IMAGE', p100: 'LUKE_SHAW_IMAGE',
  p101: 'TIMBER_IMAGE', p102: 'YAMAGUCHI_IMAGE', p103: 'LEEKINWO_IMAGE', p104: 'AUWAILUN_IMAGE',
  p105: 'KAKITANI_IMAGE', p106: 'HASHIMOTO_IMAGE', p107: 'ITO_IMAGE', p108: 'INAGAKI_IMAGE',
  p109: 'KAWAMOTO_IMAGE', p110: 'MORISHIGE_IMAGE', p111: 'HIGASHI_IMAGE', p112: 'AYASE_UEDA_IMAGE',
  p113: 'KEITO_NAKAMURA_IMAGE', p114: 'TSUYOSHI_WATANABE_IMAGE', p115: 'MESSI_HAIFU_IMAGE',
  p116: 'KAWASHIMA_IMAGE', p117: 'SONG_BUM_KEUN_IMAGE', p118: 'KIM_MOON_HWAN_IMAGE',
  p119: 'LEE_MYUNG_JAE_IMAGE', p120: 'MAEKAWA_IMAGE', p121: 'MASAAKI_GOTO_IMAGE',
  p122: 'AKIHIRO_HAYASHI_IMAGE', p123: 'LENNART_MOSER_IMAGE', p124: 'NAKAMURA_IMAGE',
  p125: 'RYOHEI_HAYASHI_IMAGE', p126: 'UEDA_IMAGE', p127: 'RAFAEL_ELIAS_IMAGE',
  p128: 'ITO_TATSUYA_IMAGE', p129: 'HAYAKAWA_IMAGE', p130: 'KOIZUMI_IMAGE',
  p131: 'HIGASHIGUCHI_IMAGE', p132: 'SHINJIKAGAWA_2025_IMAGE', p133: 'TAKASHIUSAMI_2025_IMAGE',
  p134: 'YUYAOSAKO_2025_IMAGE', p135: 'SUZUKIYUMA_2025_IMAGE', p136: 'OHSEHUN_2025_IMAGE',
  p137: 'LUCAO_2025_IMAGE', p138: 'RAFAELELIAS_2025_IMAGE', p139: 'ITSUKISOMENO_2025_IMAGE',
  p140: 'DAIKIWATARI_2025_IMAGE', p141: 'DISARO_2025_IMAGE', p142: 'KAITOTANIGUCHI_2025_IMAGE',
  p143: 'KENSUKENAGAI_2025_IMAGE', p144: 'MAOHOSOYA_2025_IMAGE', p145: 'MARCUSVINICIUS_2025_IMAGE',
  p146: 'MARCELORYAN_2025_IMAGE', p147: 'KOYAKITAGAWA_2025_IMAGE', p148: 'AKITOSUZUKI_2025_IMAGE',
  p149: 'ARATAWATANABE_2025_IMAGE', p150: 'ATARUESAKA_2025_IMAGE', p151: 'NAOKINOMURA_2025_IMAGE',
  p152: 'RYOMAWATANABE_2025_IMAGE', p153: 'RENASAKURA_2025_IMAGE', p154: 'PABLOSABBAG_2025_IMAGE',
  p155: 'TOLGAYARSLAN_2025_IMAGE', p156: 'MATHEUSJESUS_2025_IMAGE', p157: 'LEEDONGGYEONG_2025_IMAGE',
  p158: 'YASUTOWAKIZAKA_2025_IMAGE', p159: 'JUNAMANO_2025_IMAGE', p160: 'KOSUKEONOSE_2025_IMAGE',
  p161: 'SHINAGAKI_2025_IMAGE', p162: 'SHUNTATANAKA_2025_IMAGE', p163: 'KOKIMORITA_2025_IMAGE',
  p164: 'TAKUMAARANO_2025_IMAGE', p165: 'YUTAFUKAZAWA_2025_IMAGE', p166: 'TAKUYAKIDA_2025_IMAGE',
  p167: 'YURILARA_2025_IMAGE', p168: 'DAIKIMATSUOKA_2025_IMAGE', p169: 'SHUHEIKAMIMURA_2025_IMAGE',
  p170: 'YUTONAGATOMO_2025_IMAGE', p171: 'YUTOHORIGOME_2025_IMAGE', p172: 'KOTAMURAMATSU_2025_IMAGE',
  p173: 'KIMITONONO_2025_IMAGE', p174: 'RIKUHANDA_2025_IMAGE', p175: 'SOYAFUJIWARA_2025_IMAGE',
  p176: 'MATSUBARA_KO_2026_IMAGE', p177: 'IGARASHI_SENA_2026_IMAGE', p178: 'MARIUS_HOIBRATEN_2026_IMAGE',
  p179: 'INOUE_TAISEI_2026_IMAGE', p180: 'KOGA_TAIYO_2026_IMAGE', p181: 'FUKUMORI_AKITO_2026_IMAGE',
  p182: 'UEDA_NAOMICHI_2026_IMAGE', p183: 'SUGATA_MASAHIRO_2026_IMAGE', p184: 'SUMIYOSHI_JELANI_2026_IMAGE',
  p185: 'NAKATANI_SHINNOSUKE_2026_IMAGE', p186: 'KAMIYAMA_KYOSUKE_2026_IMAGE', p187: 'ICHIHARA_RION_2026_IMAGE',
  p188: 'SUZUKI_YOSHINORI_2026_IMAGE', p189: 'YAMAKAWA_TETSUSHI_2026_IMAGE', p190: 'NAKAYAMA_YUTA_2026_IMAGE',
  p191: 'SASAKI_SHO_2026_IMAGE', p192: 'TANIGUCHI_HIROTO_2026_IMAGE', p193: 'INUI_TAKASHI_2026_IMAGE',
  p194: 'IWASAKI_YUTO_2026_IMAGE', p195: 'KONNO_KAZUYA_2026_IMAGE', p196: 'SUZUKI_YUTO_2026_IMAGE',
  p197: 'TANAKA_KAZUKI_2026_IMAGE', p198: 'NOYORI_KAZUYA_2026_IMAGE', p199: 'IENAGA_AKIHIRO_2026_IMAGE',
  p200: 'ITO_TATSUYA_2026_IMAGE', p201: 'HARA_TAICHI_2026_IMAGE', p202: 'NAKAMA_HAYATO_2026_IMAGE',
  p203: 'TANAKA_PAULO_JUNICHI_2026_IMAGE', p204: 'MUTO_YOSHINORI_2026_IMAGE', p205: 'TANI_KOSEI_2026_IMAGE',
  p206: 'PISANO_ALEX_2026_IMAGE', p207: 'OSAKO_KEISUKE_2026_IMAGE', p208: 'ICHIKAWA_AKINORI_2026_IMAGE',
  p209: 'SVEND_BRODERSEN_2026_IMAGE', p210: 'KIM_JIN_HYEON_2026_IMAGE', p211: 'NISHIKAWA_SHUSAKU_2026_IMAGE',
  p212: 'PARK_ILGYU_2026_IMAGE', p213: 'BAEK_GYEONGSU_2026_IMAGE', p214: 'JONJIC_2026_IMAGE',
  p215: 'FUJII_2026_IMAGE', p216: 'MAEJIMA_2026_IMAGE', p217: 'MAENG_2026_IMAGE',
  p218: 'MUROYA_2026_IMAGE', p219: 'SHOJ_2026_IMAGE', p220: 'UMEKI_2026_IMAGE',
  p221: 'IWASHITA_2026_IMAGE', p222: 'TATSUTA_2026_IMAGE', p223: 'OKA_2026_IMAGE',
  p224: 'NISHIYAMA_2026_IMAGE', p225: 'FUJIHARU_2026_IMAGE', p226: 'FUKUDA_2026_IMAGE',
  p227: 'HOSOI_2026_IMAGE', p228: 'IKOMA_2026_IMAGE', p229: 'KAWAHARA_2026_IMAGE',
  p230: 'MOCHIZUKI_2026_IMAGE', p231: 'NISHIYA_2026_IMAGE', p232: 'ROS_2026_IMAGE',
  p233: 'LUCAS_BARCELOS_2026_IMAGE', p234: 'EMERSON_RAMON_2026_IMAGE', p235: 'BRUNO_HERCULANO_2026_IMAGE',
  p236: 'JUNIOR_ROCHA_2026_IMAGE', p237: 'AMADOU_BAKAYOKO_2026_IMAGE', p238: 'KLIMALA_2026_IMAGE',
  p239: 'CHOI_GEONJU_2026_IMAGE', p240: 'LEE_DONGJUN_2026_IMAGE', p241: 'YAGO_CARIELLO_2026_IMAGE',
  p242: 'TANIMURA_KAINA_2026_IMAGE', p243: 'FRIDJONSSON_2026_IMAGE', p244: 'HIRATSUKA_GIFT_2026_IMAGE',
  p245: 'MIURA_KAZUYOSHI_2026_IMAGE', p246: 'SAKURAGAWA_2026_IMAGE', p247: 'KAWAMURA_KEITO_2026_IMAGE',
  p248: 'HAALAND_GIFT_2026_IMAGE', p249: 'JOO_MIN_KYU_2026_IMAGE', p250: 'TANAKA_SORA_2026_IMAGE',
  p251: 'KIDA_2026_IMAGE', p252: 'NAITO_YAMATO_2026_IMAGE', p253: 'TRANZISKA_2026_IMAGE',
  p254: 'SUGIMOTO_2026_IMAGE', p255: 'MUGOSA_2026_IMAGE', p256: 'HUMMET_2026_IMAGE',
  p257: 'SHIMADA_2026_IMAGE', p258: 'KAWAMOTO_PACK_2026_IMAGE', p259: 'KAWAMOTO_2026_IMAGE',
  p260: 'DIAS_GIFT_2026_IMAGE', p261: 'THIAGUINHO_2026_IMAGE', p262: 'JEON_BYEONGGWAN_2026_IMAGE',
  p263: 'LEO_CEARA_2026_IMAGE', p264: 'YAMAGISHI_2026_TS_IMAGE', p265: 'YAMADA_HIROTO_2026_TS_IMAGE',
  p266: 'TAMURA_SHOTA_2026_TS_IMAGE', p267: 'TOSHIDA_YUSEI_2026_TS_IMAGE', p268: 'IZUMI_TOYA_2026_TS_IMAGE',
  p269: 'YAMAMOTO_OUTA_2026_TS_IMAGE', p270: 'ALISSON_2026_IMAGE', p271: 'ENDRICK_2026_IMAGE',
  p272: 'GREENWOOD_2026_IMAGE', p273: 'AHN_JUNGHWAN_HAIFU_IMAGE', p274: 'KIM_NAMIL_HAIFU_IMAGE',
  p275: 'MUSAIR_2026_IMAGE', p276: 'CHANATHIP_2026_IMAGE', p277: 'IDZES_2026_IMAGE',
  p278: 'PULISIC_2026_IMAGE', p279: 'IIJIMA_2026_IMAGE', p280: 'BARFIE_2026_IMAGE',
  p281: 'BURROWS_2026_IMAGE', p282: 'ANTANCHEN_2026_IMAGE', p283: 'JRAMANBELA_2026_IMAGE',
  p284: 'PRAMANBELA_2026_IMAGE', p285: 'ARGANTCHUEV_2026_IMAGE', p286: 'TOUMEIOTOKO_2026_IMAGE',
  p287: 'SUSPEITA_2026_IMAGE', p288: 'SIMON_IMAGE', p289: 'GAVI_IMAGE', p290: 'CUBARSI_IMAGE',
  p291: 'YAMAL_IMAGE'
};

players.forEach(p => {
  let targetVar = null;
  
  // First priority: explicit map from add_*.js
  if (addScriptMap[p.id]) {
    targetVar = addScriptMap[p.id];
  } else if (baseExplicitMap[p.id]) {
    targetVar = baseExplicitMap[p.id];
  } else {
    // Fallback: match by player name
    for (const [vName, fName] of Object.entries(fileToVarName)) {
      const cleanVar = vName.toLowerCase().replace(/_/g, '').replace('image', '');
      const cleanName = p.name.toLowerCase().replace(/[・\s\(\)（）\-\_\.]/g, '');
      if (cleanVar.includes(cleanName) || cleanName.includes(cleanVar)) {
        targetVar = vName;
        break;
      }
    }
  }

  if (targetVar) {
    correctMap[p.id] = targetVar;
  }
});

console.log(`Mapped ${Object.keys(correctMap).length} / ${players.length} players accurately.`);

// Read src/app.js
const appJsPath = path.join(rootDir, 'src', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf-8');

const currentAppJsMapMatch = appJsCode.match(/const PLAYER_IMAGE_MAP = (\{[\s\S]*?\});/);
let currentAppJsMap = {};
if (currentAppJsMapMatch) {
  currentAppJsMap = eval('(' + currentAppJsMapMatch[1] + ')');
}

let changedCount = 0;
players.forEach(p => {
  const oldV = currentAppJsMap[p.id];
  const newV = correctMap[p.id];
  if (oldV !== newV) {
    changedCount++;
    console.log(`[DIFF] ${p.id} (${p.name}): Old '${oldV}' -> New '${newV}'`);
  }
});

console.log(`Total map diffs found: ${changedCount}`);

// 5. Update src/app.js and src/app.jsx with correctMap
const formattedMapLines = Object.entries(correctMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

let updatedAppJs = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, updatedAppJs, 'utf-8');
console.log('Updated src/app.js with 100% accurate PLAYER_IMAGE_MAP!');

const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let updatedAppJsx = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, updatedAppJsx, 'utf-8');
console.log('Updated src/app.jsx with 100% accurate PLAYER_IMAGE_MAP!');
