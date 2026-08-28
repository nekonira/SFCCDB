const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
const dataDir = path.join(rootDir, 'src', 'data');

const allImageFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('Image.js')).sort();
const imageScriptTags = allImageFiles.map(f => `  <script src="./src/data/${f}"></script>`).join('\n');

const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>サカつく2026 データベース & チームビルダー</title>
  
  <!-- React & React DOM -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Custom Loading Styles -->
  <style>
    @keyframes app-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes app-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .app-loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #070a10;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .app-loading-spinner {
      width: 56px;
      height: 56px;
      border: 4px solid rgba(56, 189, 248, 0.15);
      border-top-color: #38bdf8;
      border-radius: 50%;
      animation: app-spin 0.8s linear infinite;
      margin-bottom: 24px;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.25);
    }
    .app-loading-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #38bdf8;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
      animation: app-pulse 2s infinite ease-in-out;
    }
    .app-loading-subtext {
      font-size: 0.9rem;
      color: #94a3b8;
    }
  </style>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7254824656295291"
     crossorigin="anonymous"></script>
</head>
<body class="bg-[#070a10] text-slate-100 min-h-screen">
  <div id="root">
    <div class="app-loading-container">
      <div class="app-loading-spinner"></div>
      <div class="app-loading-title">サカつく2026 データベース</div>
      <div class="app-loading-subtext">選手データ・画像を読み込み中... しばらくお待ちください</div>
    </div>
  </div>

  <!-- 1. All Image Data Files (${allImageFiles.length} Image Files) -->
${imageScriptTags}

  <!-- 2. Application Core Data & React Bundle -->
  <script src="./src/data/mockData.js"></script>
  <script src="./src/app.js"></script>
  <script src="./src/main.js"></script>
</body>
</html>
`;

fs.writeFileSync(indexPath, htmlContent, 'utf-8');
console.log(`Successfully rebuilt index.html in UTF-8 with ${allImageFiles.length} synchronous image scripts!`);
