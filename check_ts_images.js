const fs = require('fs');
const path = require('path');
const vm = require('vm');

const tsFiles = [
  { id: 'p264', file: 'yamagishi2026TSImage.js', varName: 'YAMAGISHI_2026_TS_IMAGE' },
  { id: 'p265', file: 'yamadaHiroto2026TSImage.js', varName: 'YAMADA_HIROTO_2026_TS_IMAGE' },
  { id: 'p266', file: 'tamuraShota2026TSImage.js', varName: 'TAMURA_SHOTA_2026_TS_IMAGE' },
  { id: 'p267', file: 'toshidaYusei2026TSImage.js', varName: 'TOSHIDA_YUSEI_2026_TS_IMAGE' },
  { id: 'p268', file: 'izumiToya2026TSImage.js', varName: 'IZUMI_TOYA_2026_TS_IMAGE' },
  { id: 'p269', file: 'yamamotoOuta2026TSImage.js', varName: 'YAMAMOTO_OUTA_2026_TS_IMAGE' }
];

const indexHtml = fs.readFileSync('index.html', 'utf-8');

tsFiles.forEach(item => {
  const filePath = path.join(__dirname, 'src', 'data', item.file);
  const exists = fs.existsSync(filePath);
  let hasVar = false;
  let len = 0;
  if (exists) {
    const code = fs.readFileSync(filePath, 'utf-8');
    hasVar = code.includes(item.varName);
    len = code.length;
  }
  const inIndex = indexHtml.includes(item.file);
  console.log(`${item.id} (${item.file}): fileExists=${exists}, hasVar=${hasVar}, size=${len}, inIndexHtml=${inIndex}`);
});
