const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const imageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js'));

console.log(`Linking ${imageFiles.length} player image files in index.html...`);

const scriptTags = imageFiles.map(f => `  <script src="./src/data/${f}"></script>`).join('\n');

const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サカつく2026 データベース & チームビルダー</title>


  <!-- Local Libraries -->
  <script src="./src/lib/react.min.js"></script>
  <script src="./src/lib/react-dom.min.js"></script>
  <script src="./src/lib/tailwind.js"></script>

  <style>
    body { background-color: #070a10; color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }
    .glass-panel { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .glass-card { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(8px); }
  </style>
</head>
<body class="bg-[#070a10] text-slate-100 min-h-screen">
  <div id="root"></div>

  <!-- 1. Player Photos (145 Image Files) -->
${scriptTags}

  <!-- 2. Full Player Database -->
  <script src="./src/data/mockData.js"></script>

  <!-- 3. Pure Transpiled React Application -->
  <script src="./src/app.js"></script>

  <!-- 4. React App Mount Script -->
  <script src="./src/main.js"></script>
</body>
</html>
`;

const indexPath = path.join(__dirname, 'index.html');
fs.writeFileSync(indexPath, htmlContent, 'utf-8');
console.log(`SUCCESS! Generated index.html linking all ${imageFiles.length} player photos!`);
