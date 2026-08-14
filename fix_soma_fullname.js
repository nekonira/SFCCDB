const fs = require('fs');

const p206CheckOld = "if (player.id === 'p206' || (player.name && player.name.includes('2026') && (player.name.includes('相馬') || player.name.includes('勇紀') || player.name.includes('Soma')))) {";
const p206CheckNew = "if (player.id === 'p206' || (player.name && player.name.includes('2026') && (player.name.includes('相馬勇紀') || player.name.includes('相馬') || player.name.includes('Yuki Soma') || player.name.includes('Soma')))) {";

let appJs = fs.readFileSync('src/app.js', 'utf-8');
appJs = appJs.replace(p206CheckOld, p206CheckNew);
fs.writeFileSync('src/app.js', appJs, 'utf-8');

let appJsx = fs.readFileSync('src/app.jsx', 'utf-8');
appJsx = appJsx.replace(p206CheckOld, p206CheckNew);
fs.writeFileSync('src/app.jsx', appJsx, 'utf-8');

console.log('Updated app.js and app.jsx with 相馬勇紀 full name check.');
