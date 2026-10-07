const fs = require('fs');
const path = require('path');

const specialCardsPath = path.join(__dirname, 'src', 'data', 'specialCardsData.js');
let scCode = fs.readFileSync(specialCardsPath, 'utf-8');

const newDesc = '発動エリア：前左右・中左右　/　発動条件：ドリブル中　/　突破力・キープ力UP　/　成功時にショートパス発生確率UP';

let scCount = 0;
scCode = scCode.replace(/(name:\s*['"]テクニカルドリブル['"][\s]*,[\s]*rank:\s*['"]銅['"][\s]*,[\s]*description:\s*['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
  scCount++;
  return p1 + newDesc + p3;
});

fs.writeFileSync(specialCardsPath, scCode, 'utf-8');
console.log(`Updated ${scCount} occurrence(s) in specialCardsData.js`);
