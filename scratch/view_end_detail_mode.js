const fs = require('fs');
const content = fs.readFileSync('src/app.jsx', 'utf8');
const idx = content.indexOf(`{/* モード 2: 18詳細項目 限界ゲージ */}`);
console.log(content.slice(idx, idx + 2500));
