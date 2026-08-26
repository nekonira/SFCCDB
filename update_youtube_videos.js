const fs = require('fs');
const path = require('path');

console.log('=== UPDATING YOUTUBE LATEST VIDEOS LIST ===');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsxCode = fs.readFileSync(appJsxPath, 'utf-8');
let jsCode = fs.readFileSync(appJsPath, 'utf-8');

const latestVideoObj = `  {
    id: "EFmaOGfDggw",
    title: "【完全網羅】最新アップデート情報を総まとめ Ver.2.2【サカつく2026】アクセサリ機能実装、新フォメコン追加、スカウト&継承緩和、スペインガチャ、限定特練カード、日本代表など",
    thumbnail: "https://i.ytimg.com/vi/EFmaOGfDggw/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=EFmaOGfDggw"
  },`;

if (!jsxCode.includes('EFmaOGfDggw')) {
  jsxCode = jsxCode.replace('const YOUTUBE_VIDEOS = [', 'const YOUTUBE_VIDEOS = [\n' + latestVideoObj);
  fs.writeFileSync(appJsxPath, jsxCode, 'utf-8');
  console.log('1. Updated YOUTUBE_VIDEOS in app.jsx with latest video (EFmaOGfDggw).');
}

if (!jsCode.includes('EFmaOGfDggw')) {
  jsCode = jsCode.replace('const YOUTUBE_VIDEOS = [', 'const YOUTUBE_VIDEOS = [\n' + latestVideoObj);
  fs.writeFileSync(appJsPath, jsCode, 'utf-8');
  console.log('2. Updated YOUTUBE_VIDEOS in app.js with latest video (EFmaOGfDggw).');
}

console.log('=== YOUTUBE PLAYLIST LATEST VIDEO UPDATED SUCCESSFULLY! ===');
