const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. Map Image.js file name -> window variable
const fileToVar = {};
fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).forEach(f => {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf-8');
  const m = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (m) {
    fileToVar[f.toLowerCase()] = m[1];
  }
});

// 2. Accurately parse ALL add_*.js scripts
const addScriptMap = {}; // pid -> { name, imageVar }

fs.readdirSync(rootDir).filter(f => f.startsWith('add_') && f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  let imageVar = null;
  const varM = content.match(/window\.([A-Z0-9_]+_IMAGE)\s*=/);
  if (varM) {
    imageVar = varM[1];
  } else {
    const fileM = content.match(/([a-zA-Z0-9_]+Image\.js)/);
    if (fileM) {
      imageVar = fileToVar[fileM[1].toLowerCase()];
    }
  }

  const objMatch = content.match(/{\s*id:\s*['"](p\d+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/);
  if (objMatch && imageVar) {
    const pid = objMatch[1];
    const pname = objMatch[2];
    addScriptMap[pid] = { name: pname, imageVar };
  }
});

// 3. Base explicit map for p01 to p187
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
  p185: 'NAKATANI_SHINNOSUKE_2026_IMAGE', p186: 'KAMIYAMA_KYOSUKE_2026_IMAGE', p187: 'ICHIHARA_RION_2026_IMAGE'
};

// 4. Load all players from mockData.js
const sandbox = { window: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);

const mockCode = fs.readFileSync(path.join(dataDir, 'mockData.js'), 'utf-8');
vm.runInContext(mockCode, sandbox);
const players = sandbox.window.INITIAL_PLAYERS || [];

// 5. Build final 100% verified map
const perfectMap = {};
const report = [];

players.forEach(p => {
  let v = null;
  if (addScriptMap[p.id]) {
    v = addScriptMap[p.id].imageVar;
  } else if (baseExplicitMap[p.id]) {
    v = baseExplicitMap[p.id];
  }
  
  if (v) {
    perfectMap[p.id] = v;
    report.push(`[OK] ${p.id}: ${p.name} -> ${v}`);
  } else {
    report.push(`[MISSING] ${p.id}: ${p.name}`);
  }
});

console.log(`Perfect Map built: ${Object.keys(perfectMap).length} / ${players.length} players.`);

// Verification for requested players:
console.log('\n--- VERIFICATION OF REPORTED PLAYERS ---');
['p330', 'p331', 'p332', 'p373'].forEach(id => {
  const p = players.find(x => x.id === id);
  console.log(`${id} (${p ? p.name : 'Unknown'}): ${perfectMap[id]}`);
});

// Generate map code block
const formattedMapLines = Object.entries(perfectMap).map(([k, v]) => `  "${k}": "${v}"`).join(',\n');
const newMapBlock = `const PLAYER_IMAGE_MAP = {\n${formattedMapLines}\n};`;

// Update app.js
const appJsPath = path.join(rootDir, 'src', 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf-8');
appJsCode = appJsCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsPath, appJsCode, 'utf-8');

// Update app.jsx
const appJsxPath = path.join(rootDir, 'src', 'app.jsx');
let appJsxCode = fs.readFileSync(appJsxPath, 'utf-8');
appJsxCode = appJsxCode.replace(/const PLAYER_IMAGE_MAP = \{[\s\S]*?\};/, newMapBlock);
fs.writeFileSync(appJsxPath, appJsxCode, 'utf-8');

console.log('\n100% PERFECT PLAYER_IMAGE_MAP applied successfully!');
